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

// ===== 多源 A：PubMed E-utilities（文献摘要，作为延伸阅读） =====
// 文档：https://www.ncbi.nlm.nih.gov/books/NBK25499/
// CORS 允许 ✅，无需 API key（限 3 次/秒/IP），返回 JSON

const PUBMED_EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

// 步骤 1：ESearch 获取 PMID 列表
async function searchPubMed(term, limit = 3) {
  const url = `${PUBMED_EUTILS}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=${limit}&tool=yanjiali-med-site&email=contact@example.com`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`PubMed ESearch HTTP ${res.status}`);
  const data = await res.json();
  return data?.esearchresult?.idlist || [];
}

// 步骤 2：ESummary 获取文献标题与摘要链接
async function fetchPubMedSummary(pmids) {
  if (!pmids.length) return [];
  const url = `${PUBMED_EUTILS}/esummary.fcgi?db=pubmed&id=${pmids.join(",")}&retmode=json&tool=yanjiali-med-site`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`PubMed ESummary HTTP ${res.status}`);
  const data = await res.json();
  return pmids.map((id) => {
    const doc = data?.result?.[id];
    if (!doc) return null;
    return {
      pmid: id,
      title: doc.title || "",
      authors: (doc.authors || []).map((a) => a.name).join(", "),
      journal: doc.fulljournalname || doc.source || "",
      pubdate: doc.pubdate || "",
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    };
  }).filter(Boolean);
}

// PubMed 主入口
export async function fetchPubMedArticles(query, limit = 3, timeoutMs = 2500) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const pmids = await searchPubMed(query, limit);
    if (!pmids.length) { clearTimeout(timer); return { ok: false, error: "no_result" }; }
    const articles = await fetchPubMedSummary(pmids);
    clearTimeout(timer);
    if (!articles.length) return { ok: false, error: "no_summary" };
    return { ok: true, source: "pubmed", articles, query };
  } catch (err) {
    return { ok: false, error: err.name === "AbortError" ? "timeout" : "fetch_error", message: err.message };
  }
}

// ===== 多源 B：OpenFDA（药品不良反应 + 药品说明书） =====
// 文档：https://open.fda.gov/apis/
// CORS 允许 ✅，无需 API key（限 1000 次/天/IP）
const OPENFDA_BASE = "https://api.fda.gov";

// 拉取某药品的不良反应 Top-N（聚合统计）
export async function fetchOpenFDADrugInfo(drugName, timeoutMs = 2500) {
  if (!drugName) return { ok: false, error: "no_drug" };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);

    // 1. 不良反应 Top 5（按 MedDRA 术语聚合）
    const eventUrl = `${OPENFDA_BASE}/drug/event.json?search=patient.drug.openfda.generic_name:${encodeURIComponent(drugName)}&count=patient.reaction.reactionmeddrapt.exact&limit=5`;
    const eventRes = await fetch(eventUrl);
    let reactions = [];
    if (eventRes.ok) {
      const eventData = await eventRes.json();
      reactions = (eventData?.results || []).map((r) => ({ term: r.term, count: r.count }));
    }

    // 2. 药品说明书（用途、警告）
    const labelUrl = `${OPENFDA_BASE}/drug/label.json?search=openfda.generic_name:${encodeURIComponent(drugName)}&limit=1`;
    const labelRes = await fetch(labelUrl);
    let label = null;
    if (labelRes.ok) {
      const labelData = await labelRes.json();
      const r = labelData?.results?.[0];
      if (r) {
        label = {
          purpose: r.purpose?.[0] || r.indications_and_usage?.[0]?.slice(0, 200) || "",
          warnings: r.warnings_and_cautions?.[0]?.slice(0, 300) || "",
          brandNames: r.openfda?.brand_name?.slice(0, 3) || [],
        };
      }
    }

    clearTimeout(timer);
    if (!reactions.length && !label) return { ok: false, error: "no_result" };
    return { ok: true, source: "openfda", drugName, reactions, label };
  } catch (err) {
    return { ok: false, error: err.name === "AbortError" ? "timeout" : "fetch_error", message: err.message };
  }
}

// ===== 缓存：5 分钟减少重复请求（localStorage，仅缓存成功结果） =====
const CACHE_KEY = "mqa_realtime_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 分钟

function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}

function writeCache(obj) {
  try {
    const keys = Object.keys(obj);
    // 仅保留最近 30 条，避免 localStorage 膨胀
    const trimmed = keys.slice(-30).reduce((acc, k) => { acc[k] = obj[k]; return acc; }, {});
    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
  } catch {}
}

function cacheGet(key) {
  const c = readCache();
  const item = c[key];
  if (!item) return null;
  if (Date.now() - item.ts > CACHE_TTL) return null;
  return item.data;
}

function cacheSet(key, data) {
  const c = readCache();
  c[key] = { data, ts: Date.now() };
  writeCache(c);
}

// 综合实时检索：按意图选源 + 缓存 + 多源并行
export async function fetchRealtimeInfoMulti(query, intentType = "disease_info", timeoutMs = 2500) {
  const cacheKey = `${intentType}:${query}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { ok: true, ...cached, fromCache: true };

  // 按意图选源
  const tasks = [];
  // 主源：Wikipedia（所有意图都用，提供百科背景）
  tasks.push(fetchRealtimeInfo(query, timeoutMs).then((r) => ({ kind: "wiki", r })));
  // 备源 A：PubMed（疾病/症状咨询时拉延伸阅读文献）
  if (intentType === "disease_info" || intentType === "symptom_check") {
    tasks.push(fetchPubMedArticles(query, 3, timeoutMs).then((r) => ({ kind: "pubmed", r })));
  }
  // 备源 B：OpenFDA（用药咨询时拉药品不良反应与说明书）
  if (intentType === "medication") {
    // 从 query 提取药品名（粗略：取最长中文片段）
    const { mainEntity } = analyzeQuestion(query);
    if (mainEntity) {
      tasks.push(fetchOpenFDADrugInfo(mainEntity, timeoutMs).then((r) => ({ kind: "openfda", r })));
    }
  }

  // 并行执行，等待所有完成（部分失败不影响其他源）
  const results = await Promise.allSettled(tasks);
  const valid = [];
  for (const r of results) {
    if (r.status === "fulfilled" && r.value?.r?.ok) {
      valid.push(r.value);
    }
  }

  if (!valid.length) return { ok: false, error: "all_sources_failed" };

  // 整合多源结果
  const merged = {
    ok: true,
    query,
    intent: intentType,
    sources: {},
  };
  for (const { kind, r } of valid) {
    if (kind === "wiki") {
      merged.sources.wiki = { title: r.title, extract: r.extract, url: r.url };
      merged.analysis = r.analysis;
    } else if (kind === "pubmed") {
      merged.sources.pubmed = r.articles.map((a) => ({ title: a.title, url: a.url, journal: a.journal, pubdate: a.pubdate }));
    } else if (kind === "openfda") {
      merged.sources.openfda = { drugName: r.drugName, reactions: r.reactions, label: r.label };
    }
  }

  cacheSet(cacheKey, merged);
  return merged;
}

// 多源结果 → 合成回答（与 buildRealtimeAnswer 兼容，但更丰富）
export function buildMultiSourceAnswer(query, multiResult) {
  if (!multiResult.ok) return null;

  const { sources } = multiResult;
  const parts = [];

  parts.push(`<p>🔍 <strong>本地知识库未直接命中，已为您从多个权威医学源实时检索</strong>：</p>`);

  // 主源 Wikipedia 百科
  if (sources.wiki) {
    const plain = (sources.wiki.extract || "").replace(/\n/g, " ").trim();
    parts.push(`<p><strong>${sources.wiki.title}</strong>（来源：维基百科）：${plain}</p>`);
  }

  // 备源 OpenFDA（药品不良反应）
  if (sources.openfda) {
    const { drugName, reactions, label } = sources.openfda;
    parts.push(`<p><strong>💊 ${drugName} 药品信息</strong>（来源：美国 FDA）：</p>`);
    if (label?.purpose) parts.push(`<p><strong>用途</strong>：${label.purpose}</p>`);
    if (reactions?.length) {
      const reactList = reactions.map((r) => `${r.term}（${r.count} 报告）`).join("、");
      parts.push(`<p><strong>常见不良反应</strong>（按报告数排序）：${reactList}</p>`);
    }
    if (label?.warnings) parts.push(`<p><strong>⚠️ 警告</strong>：${label.warnings}</p>`);
  }

  // 备源 PubMed（延伸阅读）
  if (sources.pubmed?.length) {
    parts.push(`<p><strong>📚 延伸阅读</strong>（来源：PubMed 文献索引）：</p><ul>`);
    for (const a of sources.pubmed.slice(0, 3)) {
      parts.push(`<li><a href="${a.url}" target="_blank" rel="noopener noreferrer">${a.title}</a> <span class="muted">— ${a.journal} ${a.pubdate}</span></li>`);
    }
    parts.push(`</ul>`);
  }

  // 整合来源
  const sourcesArr = [];
  if (sources.wiki) sourcesArr.push({ name: `维基百科：${sources.wiki.title}`, url: sources.wiki.url || "https://zh.wikipedia.org/" });
  if (sources.openfda) sourcesArr.push({ name: `OpenFDA：${sources.openfda.drugName}`, url: "https://open.fda.gov/" });
  if (sources.pubmed?.length) sourcesArr.push({ name: "PubMed 文献检索", url: "https://pubmed.ncbi.nlm.nih.gov/" });

  parts.push(`<p>📌 <strong>重要说明</strong>：以上内容来自多个开放权威源，<strong>仅作背景知识参考，并非循证医学指南</strong>。涉及具体诊疗、用药决策时，请<strong>以执业医师面诊评估为准</strong>。</p>`);

  return {
    answer: parts.join(""),
    sources: sourcesArr,
    category: "实时检索",
    isRealtime: true,
    isMultiSource: true,
    realtimeQuery: query,
  };
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
