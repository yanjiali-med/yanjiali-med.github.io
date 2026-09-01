// 医疗问答 API 模拟 / Medical Q&A API Simulator
// 功能：
// 1. 意图识别：区分疾病咨询 / 症状自查 / 用药咨询 / 紧急情况
// 2. 多阶段检索：关键词 + 问题文本 + 模糊匹配，返回 Top-3 候选
// 3. 低置信度澄清：返回多个候选让用户选择，而非直接 fallback
// 4. 紧急症状识别：胸痛 / 呼吸困难 / 意识改变 / 严重出血等 → 立即提示 120
// 5. 智能化 fallback：从原问题提取关键词，主动推荐相关条目
// 6. 限流与隐私保护：不存储问题内容，仅本地时间戳

import { medicalKB, fallbackResponse } from "../data/medicalKnowledge.js";
import { tryConsume, getUsage } from "./rateLimiter.js";
import { fetchRealtimeInfo, buildRealtimeAnswer, logQuery, findRelatedFeedback, fetchRealtimeInfoMulti, buildMultiSourceAnswer } from "./realtimeQA.js";

// ===== 分词 =====
// 按非汉字/字母字符切分，保留 2 字以上词，并保留连续中文片段
function tokenize(text) {
  const cleaned = text.toLowerCase().replace(/[，。？！、,.?!；:()\[\]{}""'']/g, " ");
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  const cnChunks = (text.match(/[\u4e00-\u9fa5]{2,}/g) || []);
  return Array.from(new Set([...tokens, ...cnChunks]));
}

// ===== 意图识别 =====
// 返回 { type, reason }，type ∈ disease_info | symptom_check | medication | emergency | general
const EMERGENCY_PATTERNS = [
  { kw: ["胸痛", "胸闷痛", "心绞痛", "chest pain"], reason: "胸痛可能为急性心肌梗死等危重情况" },
  { kw: ["呼吸困难", "喘不上气", "气促", "憋气", "呼吸停止"], reason: "呼吸困难可能危及生命" },
  { kw: ["意识改变", "意识丧失", "昏迷", "晕厥", "叫不醒", "昏睡"], reason: "意识障碍需立即评估" },
  { kw: ["大出血", "严重出血", "大量出血", "止血不止", "喷射出血"], reason: "严重出血需立即止血就医" },
  { kw: ["抽搐", "癫痫发作", "惊厥", "全身抽"], reason: "抽搐发作需紧急处理" },
  { kw: ["卒中", "中风", "偏瘫", "口角歪斜", "言语不清", "BE-FAST"], reason: "卒中时间窗内可溶栓/取栓" },
  { kw: ["窒息", "异物卡喉", "气道梗阻"], reason: "气道梗阻可数分钟致命" },
  { kw: ["过敏休克", "过敏性休克", "喉头水肿"], reason: "严重过敏反应需肾上腺素" },
  { kw: ["服毒", "自杀", "吃药自杀", "吞服"], reason: "立即中毒救治" },
  { kw: ["心跳骤停", "心脏骤停", "猝死"], reason: "立即 CPR 并呼叫 120" },
];

const SYMPTOM_HINTS = ["怎么办", "怎么处理", "怎么回事", "是什么原因", "为什么", "是不是", "严重吗", "需要治吗", "要看医生吗"];
const MEDICATION_HINTS = ["药", "吃", "服用", "剂量", "用量", "怎么用", "能吃", "可以吃", "副作用", "禁忌"];

// 孕产期相关咨询关键词（单关键词命中即判定，组合关键词作补充）
const PREGNANCY_HINTS = [
  "怀孕", "孕妇", "孕期", "怀孕期", "妊娠", "产妇", "哺乳期", "坐月子", "待产",
  "产检", "羊水", "宫缩", "见红", "破水", "备孕", "孕吐", "胎儿", "孕早期", "孕中期",
  "孕晚期", "预产期", "剖腹产", "剖宫产", "顺产", "引产", "流产", "保胎",
];
const PREGNANCY_COMBO_PARTNER = ["老婆", "妻子", "媳妇", "夫人"];
const PREGNANCY_COMBO_ACTION = ["快生", "要生", "生了", "怀孕", "孕期"];

function detectIntent(query) {
  const q = query.toLowerCase();
  // 紧急情况优先
  for (const p of EMERGENCY_PATTERNS) {
    if (p.kw.some((k) => q.includes(k.toLowerCase()))) {
      return { type: "emergency", reason: p.reason, hit: p.kw.find((k) => q.includes(k.toLowerCase())) };
    }
  }
  // 孕产期咨询：单关键词命中即触发
  const pregHit = PREGNANCY_HINTS.find((k) => q.includes(k));
  if (pregHit) {
    return { type: "pregnancy", reason: "孕产期相关咨询，超出本系统边界", hit: pregHit };
  }
  // 孕产期咨询：组合判断（"老婆/妻子"+"快生/怀孕"等）
  const hasPartner = PREGNANCY_COMBO_PARTNER.some((k) => q.includes(k));
  const hasAction = PREGNANCY_COMBO_ACTION.some((k) => q.includes(k));
  if (hasPartner && hasAction) {
    return { type: "pregnancy", reason: "孕产期相关咨询，超出本系统边界", hit: "组合匹配" };
  }
  // 用药咨询
  if (MEDICATION_HINTS.some((h) => q.includes(h))) {
    return { type: "medication", reason: "涉及用药咨询" };
  }
  // 症状自查
  if (SYMPTOM_HINTS.some((h) => q.includes(h))) {
    return { type: "symptom_check", reason: "症状自查类问题" };
  }
  return { type: "disease_info", reason: "疾病知识咨询" };
}

// ===== 评分 =====
// 单条目相对查询的匹配分：综合关键词、问题文本、模糊子串
function scoreEntry(entry, query) {
  const qLower = query.toLowerCase();
  const queryTokens = tokenize(query);
  let score = 0;
  let hitKws = [];

  // 1) 关键词匹配
  for (const kw of entry.keywords) {
    const kwLower = kw.toLowerCase();
    let kwHit = false;
    if (queryTokens.some((t) => t === kwLower)) { score += 3; kwHit = true; }
    else if (queryTokens.some((t) => t.includes(kwLower) || kwLower.includes(t))) { score += 1.5; kwHit = true; }
    if (qLower.includes(kwLower)) { score += 2; kwHit = true; }
    if (kwHit) hitKws.push(kw);
  }

  // 2) 问题文本匹配（之前未利用）
  const entryQLower = entry.question.toLowerCase();
  for (const t of queryTokens) {
    if (t.length >= 2 && entryQLower.includes(t)) score += 2;
  }

  // 3) 分类名匹配
  if (entry.category && qLower.includes(entry.category.toLowerCase())) score += 1;

  return { entry, score, hitKws };
}

// 检索 Top-N 候选（默认 3）
export function searchKnowledge(query, topN = 3) {
  const scored = medicalKB
    .map((entry) => scoreEntry(entry, query))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return [];
  return scored.slice(0, topN);
}

// 从原 query 提取候选关键词，供 fallback 推荐
function extractHintKeywords(query) {
  const tokens = tokenize(query).filter((t) => t.length >= 2);
  // 取与知识库关键词部分匹配的 tokens
  const hints = new Set();
  for (const t of tokens) {
    for (const entry of medicalKB) {
      for (const kw of entry.keywords) {
        if (kw.toLowerCase().includes(t) || t.includes(kw.toLowerCase())) {
          hints.add(kw);
          break;
        }
      }
    }
  }
  return Array.from(hints).slice(0, 5);
}

// 智能化 fallback：基于原 query 提取关键词，主动推荐候选条目
// 低置信度时先尝试实时检索（Wikipedia），失败再用本地 fallback 推荐
async function buildSmartFallbackAsync(query) {
  // 1. 智能意图识别 → 选源
  const intent = detectIntent(query);
  const intentType = intent.type; // emergency/medication/symptom_check/disease_info

  // 2. 多源并行实时检索（2.5s 超时，PubMed + Wikipedia + 按意图选 OpenFDA）
  try {
    const multiResult = await fetchRealtimeInfoMulti(query, intentType, 2500);
    if (multiResult.ok) {
      const answer = buildMultiSourceAnswer(query, multiResult);
      if (answer) {
        logQuery(query, "realtime_multi");
        return answer;
      }
    }
  } catch {
    // 多源失败 → 降级到本地推荐
  }

  // 3. 兼容旧路径：仅 Wikipedia 单源（备用，确保至少有一源尝试）
  try {
    const realtime = await fetchRealtimeInfo(query, 2500);
    if (realtime.ok) {
      const realtimeAnswer = buildRealtimeAnswer(query, realtime);
      if (realtimeAnswer) {
        logQuery(query, "realtime");
        return realtimeAnswer;
      }
    }
  } catch {
    // 实时检索失败 → 降级到本地推荐
  }

  // 4. 本地 fallback 推荐
  logQuery(query, "fallback");
  return buildLocalFallback(query);
}

// 原本地 fallback：从原 query 提取关键词，主动推荐相关条目
function buildLocalFallback(query) {
  const hints = extractHintKeywords(query);
  // 用关键词做一次宽松搜索，取最多 3 条作为"您可能想问"
  const candidates = [];
  const seen = new Set();
  for (const kw of hints) {
    const hits = searchKnowledge(kw, 3);
    for (const h of hits) {
      if (!seen.has(h.entry.id)) {
        seen.add(h.entry.id);
        candidates.push(h.entry);
      }
      if (candidates.length >= 3) break;
    }
    if (candidates.length >= 3) break;
  }

  // 智能居家建议：从症状库中按 hints 关键词匹配相关条目，提炼通用居家护理要点
  let homeTips = [];
  if (hints.length) {
    const symptomHits = medicalKB
      .filter((e) => e.category === "日常症状" && (e.homeCare || []).length)
      .map((e) => {
        let score = 0;
        for (const kw of hints) {
          if (e.keywords.some((k) => k.includes(kw) || kw.includes(k.toLowerCase()))) score++;
        }
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    if (symptomHits.length) {
      // 取最相关症状条目的前 3 条居家建议作为"通用参考"
      homeTips = symptomHits[0].e.homeCare.slice(0, 3);
    }
  }

  const tipsBlock = homeTips.length
    ? `<p><strong>💡 通用居家护理参考</strong>（来自相关症状条目，非针对您的具体情况）：</p>
       <ul>${homeTips.map((t) => `<li>${t}</li>`).join("")}</ul>
       <p>⚠️ 以上为通用建议，<strong>如症状持续或加重、伴任何警示征象请尽快就医</strong>。</p>`
    : "";

  return {
    answer: `<p>抱歉，您的问题在当前知识库中暂未找到直接匹配的循证条目。</p>
      ${tipsBlock}
      <p>本系统覆盖 22 大临床科室常见疾病的科普，可尝试：</p>
      <ul>
        <li>使用更具体的疾病名或症状关键词（如「胆囊结石」「高血压管理」）；</li>
        <li>在右侧<strong>分类浏览</strong>中按科室查找；</li>
        <li>在右侧<strong>关键词搜索</strong>输入关键词查看相关条目。</li>
      </ul>
      <p>以下是根据您输入提取的相关主题，供参考${candidates.length ? "（点击可直接查看）" : ""}：</p>`,
    sources: fallbackResponse.sources,
    category: "通用",
    isFallback: true,
    candidates, // UI 会渲染为可点击按钮
    hints,
  };
}

// 5 段式症状响应：关注确认 + 简介原因 + 居家护理 + 就医红线 + 免责声明
function buildSymptomResponse(entry, intent) {
  const homeCareList = (entry.homeCare || [])
    .map((c) => `<li>${c}</li>`).join("");
  const seeDoctorList = (entry.seeDoctor || [])
    .map((s) => `<li>${s}</li>`).join("");
  const severityLabel = entry.severity === "mild" ? "多为轻度、可居家观察"
    : entry.severity === "assess" ? "需结合具体表现评估"
    : entry.severity === "emergency" ? "需紧急评估"
    : "需评估";

  const answer = `
    <p>👋 <strong>关注到您的提问，"${entry.question.replace(/？\?$/, "")}"</strong> 是较常见的日常不适，${severityLabel}。下面为您梳理一些<strong>科普信息与居家护理思路</strong>，并说明哪些情况需要尽快就医。</p>
    ${entry.answer}
    <p><strong>🏠 可尝试的居家护理建议（非药物方法）：</strong></p>
    <ul>${homeCareList || "<li>调整作息与饮食，观察 1-2 周复诊情况</li>"}</ul>
    <p><strong>⚠️ 出现以下情况请尽快就医：</strong></p>
    <ul>${seeDoctorList || "<li>症状持续或加重</li><li>影响日常生活</li>"}</ul>
    <p><strong>📌 重要说明：</strong>以上内容基于公开权威医学资料整理，<strong>仅作健康科普，不构成医疗诊断或治疗建议</strong>。如您存在慢性疾病、正在用药或症状持续不缓解，请以执业医师面诊评估为准。</p>
  `;
  return {
    answer,
    sources: entry.sources || [],
    category: entry.category,
    isSymptom: true,
    intent,
  };
}

// 孕产期咨询边界响应：共情 + 边界声明 + 推荐产科 + 紧急信号提示 + 免责
function buildPregnancyResponse(intent) {
  return {
    answer: `<p>👋 <strong>感谢您的信任</strong>，您能关注到孕产期的饮食与生活细节，本身就是对家人和宝宝非常负责任的态度。</p>
      <p><strong>📌 边界说明：</strong>本系统覆盖的是常见疾病的循证科普，<strong>不提供孕期、哺乳期、备孕期的医疗、用药或饮食建议</strong>。孕期生理变化复杂，个体差异大（如妊娠糖尿病、子痫前期、过敏史、用药史等都会影响判断），任何网络信息都无法替代专业评估。</p>
      <p><strong>🩺 强烈建议您：</strong></p>
      <ul>
        <li>前往<strong>正规医院产科或妇产科</strong>面诊，由产科医师结合孕周、产检指标、个人病史给出针对性建议；</li>
        <li>如已有建档产检医院，可拨打<strong>产科咨询电话</strong>或直接询问主治医师；</li>
        <li>紧急情况下（见下方红线）请<strong>立即拨打 120</strong>或前往就近急诊。</li>
      </ul>
      <p><strong>⚠️ 孕期紧急信号（出现以下情况请立即就医）：</strong></p>
      <ul>
        <li>阴道流血、流液（疑似破水）</li>
        <li>持续剧烈腹痛、规律宫缩（未足月）</li>
        <li>胎动明显减少或消失</li>
        <li>头痛伴视物模糊、上腹痛、水肿加重（警惕子痫前期）</li>
        <li>持续呕吐无法进食饮水、高热</li>
      </ul>
      <p><strong>📌 重要说明：</strong>本回复仅作边界提示与就医引导，<strong>不构成任何医疗建议</strong>。请以执业产科医师面诊评估为准。</p>`,
    sources: [
      { name: "WHO：孕产妇健康", url: "https://www.who.int/zh/health-topics/maternal-health" },
      { name: "国家卫健委：母婴安全", url: "http://www.nhc.gov.cn/" },
    ],
    category: "孕产期",
    isPregnancyBoundary: true,
    intent,
  };
}

// 紧急情况响应
function buildEmergencyResponse(reason, hit) {
  return {
    answer: `<p><strong>⚠️ 检测到可能紧急的健康关键词："${hit}"</strong></p>
      <p>${reason}，此类情况可能危及生命，<strong>请立即拨打 120</strong>或前往就近急诊，切勿因本系统信息延误救治。</p>
      <ul>
        <li>心跳骤停：立即 CPR（胸外按压 + 人工通气），有 AED 配合 AED；</li>
        <li>窒息/异物卡喉：海姆立克手法（成人腹部冲击）；</li>
        <li>严重出血：直接压迫止血，必要时止血带；</li>
        <li>卒中：记发病时间，时间窗内可溶栓/取栓。</li>
      </ul>
      <p>稳定生命体征后，可参考本系统相关条目了解疾病知识，但<strong>所有处置须以现场急救人员与医师评估为准</strong>。</p>`,
    sources: [
      { name: "AHA 心肺复苏指南", url: "https://cpr.heart.org/" },
      { name: "国家急救中心 120", url: "tel:120" },
    ],
    category: "急诊",
    isEmergency: true,
  };
}

// 低置信度澄清：返回 Top-3 让用户选
function buildClarifyResponse(query, candidates) {
  return {
    answer: `<p>您的问题可能涉及以下主题，请选择最贴近您需求的一项，以获得更精准的回答：</p>`,
    sources: [],
    category: "澄清",
    isClarify: true,
    candidates, // UI 渲染为按钮
  };
}

// ===== 主入口 =====
export async function askMedicalQuestion(query) {
  // 1. 限流
  const consume = tryConsume();
  if (!consume.allowed) {
    return {
      ok: false,
      error: "rate_limited",
      message: `提问过于频繁，请约 ${consume.retryAfterSec} 秒后重试。该限流机制用于保障服务稳定与公平使用。`,
      usage: getUsage(),
    };
  }

  // 2. 输入校验
  const trimmed = (query || "").trim();
  if (trimmed.length < 2) {
    return {
      ok: false,
      error: "too_short",
      message: "请输入更完整的问题（至少 2 个字符）。例如：高血压如何管理？",
      usage: consume.usage,
    };
  }
  if (trimmed.length > 500) {
    return {
      ok: false,
      error: "too_long",
      message: "问题过长，请控制在 500 字以内。",
      usage: consume.usage,
    };
  }

  // 3. 模拟"思考"延迟（隐私：仅本地，缩短以提升体验）
  const delay = 300 + Math.random() * 300;
  await new Promise((r) => setTimeout(r, delay));

  // 4. 意图识别（紧急情况优先短路）
  const intent = detectIntent(trimmed);

  if (intent.type === "emergency") {
    return {
      ok: true,
      data: {
        question: trimmed,
        intent,
        ...buildEmergencyResponse(intent.reason, intent.hit),
      },
      usage: consume.usage,
    };
  }

  // 孕产期咨询：明确边界，直接返回就医引导，不进入 KB 检索
  if (intent.type === "pregnancy") {
    return {
      ok: true,
      data: {
        question: trimmed,
        ...buildPregnancyResponse(intent),
      },
      usage: consume.usage,
    };
  }

  // 5. 检索 Top-3 候选
  const scored = searchKnowledge(trimmed, 3);

  // 完全无匹配 → 智能化 fallback（先尝试实时检索，失败则本地推荐）
  if (scored.length === 0) {
    const fallbackResult = await buildSmartFallbackAsync(trimmed);
    return {
      ok: true,
      data: {
        question: trimmed,
        intent,
        ...fallbackResult,
      },
      usage: consume.usage,
    };
  }

  // 6. 置信度判定：最高分 ≥ 5 且明显高于第二名 → 直接回答；否则澄清
  const top = scored[0];
  const second = scored[1];
  const highConfidence = top.score >= 5 && (!second || top.score - second.score >= 2);

  if (highConfidence) {
    // 症状库条目 → 用 5 段式响应框架（关注确认 + 简介原因 + 居家护理 + 就医红线 + 免责）
    if (top.entry.category === "日常症状") {
      return {
        ok: true,
        data: {
          question: trimmed,
          ...buildSymptomResponse(top.entry, intent),
        },
        usage: consume.usage,
      };
    }
    return {
      ok: true,
      data: {
        question: trimmed,
        intent,
        answer: top.entry.answer,
        sources: top.entry.sources,
        category: top.entry.category,
        isFallback: false,
        confidence: top.score,
        hitKws: top.hitKws,
      },
      usage: consume.usage,
    };
  }

  // 低置信度 → 返回候选让用户选择
  return {
    ok: true,
    data: {
      question: trimmed,
      intent,
      ...buildClarifyResponse(
        trimmed,
        scored.map((s) => s.entry)
      ),
    },
    usage: consume.usage,
  };
}

export { getUsage };

// ===== 知识库浏览辅助（供分类浏览 / 关键词搜索 UI 使用） =====

export function getEntriesByCategory(category) {
  return medicalKB.filter((e) => e.category === category);
}

export function searchEntries(query, limit = 8) {
  const q = (query || "").trim().toLowerCase();
  if (q.length < 1) return [];
  const hits = medicalKB.filter((e) => {
    if (e.category.toLowerCase().includes(q)) return true;
    if (e.question.toLowerCase().includes(q)) return true;
    return e.keywords.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
  });
  return hits.slice(0, limit);
}
