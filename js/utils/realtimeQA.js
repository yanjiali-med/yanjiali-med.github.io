// 实时问答增强模块 / Realtime QA Enhancement
// 当本地知识库低置信度时，调用开放 API（Wikipedia REST）做实时信息补充
// 隐私保护：所有查询仅本地浏览器发起，不上传到自有服务器
// 反馈学习：用户评分与修正建议存 localStorage，下次相似问题时优先展示

const FEEDBACK_KEY = "mqa_feedback";
const QUERY_LOG_KEY = "mqa_query_log";

// ===== 问题分析（轻量级 NLU）=====
// 提取实体（疾病名/症状词）+ 关键术语，用于构造搜索 query
export function analyzeQuestion(query) {
  const cleaned = (query || "").trim();
  // 移除问句功能词
  const stopWords = ["怎么办", "怎么处理", "怎么回事", "是什么", "是什么原因", "为什么", "是不是", "严重吗", "需要治吗", "要看医生吗", "请问", "我想知道", "能吃吗", "可以吃吗", "吗", "呢", "啊", "呀"];
  let entity = cleaned;
  for (const sw of stopWords) {
    entity = entity.replace(new RegExp(sw, "g"), "");
  }
  entity = entity.replace(/[？?，,。.、；;：:]/g, "").trim();
  // 提取关键术语候选（连续中文片段，≥2 字）
  const chunks = (entity.match(/[\u4e00-\u9fa5]{2,}/g) || []);
  // 取最长的 chunk 作为主实体
  const mainEntity = chunks.sort((a, b) => b.length - a.length)[0] || entity;
  return {
    raw: cleaned,
    mainEntity,
    keywords: chunks,
    searchQuery: mainEntity, // Wikipedia 搜索词
  };
}

// ===== 多源实时检索：Wikipedia REST API（CORS 开放，免费）=====
// 文档：https://en.wikipedia.org/api/rest_v1/
// 中文摘要端点：https://zh.wikipedia.org/api/rest_v1/page/summary/{title}

const WIKI_API = "https://zh.wikipedia.org/w/api.php";
const WIKI_REST = "https://zh.wikipedia.org/api/rest_v1/page/summary";

// 步骤 1：搜索 Wikipedia 标题
async function searchWikiTitle(query) {
  const url = `${WIKI_API}?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&format=json&origin=*`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`Wikipedia search HTTP ${res.status}`);
  const data = await res.json();
  const hit = data?.query?.search?.[0];
  return hit ? { title: hit.title, snippet: hit.snippet } : null;
}

// 步骤 2：取摘要
async function fetchWikiSummary(title) {
  const url = `${WIKI_REST}/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`Wikipedia summary HTTP ${res.status}`);
  const data = await res.json();
  return {
    title: data.title,
    extract: data.extract,
    url: data.content_urls?.desktop?.page,
  };
}

// 主入口：综合检索
export async function fetchRealtimeInfo(query, timeoutMs = 4000) {
  const analysis = analyzeQuestion(query);
  if (!analysis.searchQuery) return { ok: false, error: "no_entity", analysis };

  try {
    // 超时控制
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);

    const titleHit = await searchWikiTitle(analysis.searchQuery);
    if (!titleHit) {
      clearTimeout(timer);
      return { ok: false, error: "no_result", analysis };
    }

    const summary = await fetchWikiSummary(titleHit.title);
    clearTimeout(timer);

    if (!summary.extract) return { ok: false, error: "no_extract", analysis };

    return {
      ok: true,
      analysis,
      source: "wikipedia",
      title: summary.title,
      extract: summary.extract,
      url: summary.url,
    };
  } catch (err) {
    return { ok: false, error: err.name === "AbortError" ? "timeout" : "fetch_error", message: err.message, analysis };
  }
}

// ===== 回答生成：合成结构化回复 =====
export function buildRealtimeAnswer(query, realtimeResult) {
  if (!realtimeResult.ok) return null;

  const { title, extract, url, analysis } = realtimeResult;
  const plain = extract.replace(/\n/g, " ").trim();

  return {
    answer: `<p>🔍 <strong>本地知识库未直接命中，已为您实时检索开放百科资料</strong>（来源：中文维基百科）：</p>
      <p><strong>${title}</strong>：${plain}</p>
      <p>📌 <strong>重要说明</strong>：以上内容来自开放百科，<strong>仅作背景知识参考，并非循证医学指南</strong>，可能与最新临床进展存在滞后。涉及具体诊疗、用药、个人健康决策时，请<strong>以执业医师面诊评估为准</strong>。</p>
      <p>💡 建议您也可使用右侧<strong>关键词搜索</strong>或<strong>分类浏览</strong>查看本站循证条目，或在下方反馈您希望补充的内容。</p>`,
    sources: [{ name: `维基百科：${title}`, url: url || "https://zh.wikipedia.org/" }],
    category: "实时检索",
    isRealtime: true,
    realtimeQuery: analysis.searchQuery,
  };
}

// ===== 反馈学习：本地持久化 =====
// 反馈结构：{ query, rating(1-5), comment, answer, ts }
// 学习方式：相似 query（含相同主实体）下次出现时优先展示历史反馈

export function saveFeedback(feedback) {
  try {
    const arr = readFeedback();
    arr.unshift({ ...feedback, ts: Date.now() });
    // 仅保留最近 50 条，避免 localStorage 膨胀
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(arr.slice(0, 50)));
    return true;
  } catch { return false; }
}

export function readFeedback() {
  try { return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]"); } catch { return []; }
}

// 查找相似问题的历史反馈（基于主实体匹配）
export function findRelatedFeedback(query) {
  const { mainEntity } = analyzeQuestion(query);
  if (!mainEntity) return [];
  const arr = readFeedback();
  return arr.filter((f) => {
    if (!f.query) return false;
    const fEntity = analyzeQuestion(f.query).mainEntity;
    return fEntity && (fEntity.includes(mainEntity) || mainEntity.includes(fEntity));
  }).slice(0, 3);
}

// 查询日志（轻量统计：哪些 query 高频出现，便于后续优化知识库）
export function logQuery(query, hitType) {
  try {
    const arr = JSON.parse(localStorage.getItem(QUERY_LOG_KEY) || "[]");
    arr.unshift({ q: query, type: hitType, ts: Date.now() });
    localStorage.setItem(QUERY_LOG_KEY, JSON.stringify(arr.slice(0, 100)));
  } catch {}
}

export function readQueryLog() {
  try { return JSON.parse(localStorage.getItem(QUERY_LOG_KEY) || "[]"); } catch { return []; }
}

// 查询日志统计：返回 Top-N 高频未命中 query（供维护者扩充知识库参考）
export function getTopUnmatchedQueries(topN = 10) {
  const arr = readQueryLog();
  const unmatched = arr.filter((e) => e.type === "fallback" || e.type === "realtime");
  const counter = {};
  for (const e of unmatched) {
    const key = e.q.slice(0, 20);
    counter[key] = (counter[key] || 0) + 1;
  }
  return Object.entries(counter)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([q, count]) => ({ q, count }));
}
