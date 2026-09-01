// 医疗问答 API 模拟 / Medical Q&A API Simulator
// 功能：
// 1. 基于关键词匹配在循证医学知识库中检索相关条目
// 2. 模拟网络延迟与"模型思考"过程
// 3. 集成请求限流机制防止滥用
// 4. 隐私保护：不存储用户问题内容，仅本地记录请求时间戳

import { medicalKB, fallbackResponse } from "../data/medicalKnowledge.js";
import { tryConsume, getUsage } from "./rateLimiter.js";

// 简体中文分词：按非汉字/字母字符切分，并保留 2 字以上词
function tokenize(text) {
  const cleaned = text.toLowerCase().replace(/[，。？！、,.?!；:()\[\]{}""'']/g, " ");
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  // 同时加入连续中文片段
  const cnChunks = (text.match(/[\u4e00-\u9fa5]{2,}/g) || []);
  return Array.from(new Set([...tokens, ...cnChunks]));
}

// 计算查询与知识条目的匹配分数
function scoreEntry(entry, query) {
  const queryTokens = tokenize(query);
  let score = 0;
  for (const kw of entry.keywords) {
    const kwLower = kw.toLowerCase();
    // 全词匹配权重高
    if (queryTokens.some((t) => t === kwLower)) score += 3;
    // 部分包含
    else if (queryTokens.some((t) => t.includes(kwLower) || kwLower.includes(t))) score += 1.5;
    // 原始查询直接包含关键词
    if (query.toLowerCase().includes(kwLower)) score += 2;
  }
  return score;
}

// 检索最匹配条目
export function searchKnowledge(query) {
  const scored = medicalKB
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  return scored[0].entry;
}

// 模拟异步问答请求
export async function askMedicalQuestion(query) {
  // 1. 限流检查
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
      message: "请输入更完整的问题（至少 2 个字符）。",
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

  // 3. 模拟模型"思考"延迟（隐私保护：仅本地无网络外发）
  const delay = 900 + Math.random() * 700;
  await new Promise((r) => setTimeout(r, delay));

  // 4. 检索知识库
  const entry = searchKnowledge(trimmed);

  if (!entry) {
    return {
      ok: true,
      data: {
        question: trimmed,
        answer: fallbackResponse.answer,
        sources: fallbackResponse.sources,
        category: "通用",
        isFallback: true,
      },
      usage: consume.usage,
    };
  }

  return {
    ok: true,
    data: {
      question: trimmed,
      answer: entry.answer,
      sources: entry.sources,
      category: entry.category,
      isFallback: false,
    },
    usage: consume.usage,
  };
}

export { getUsage };

// ===== 知识库浏览辅助（供分类浏览 / 关键词搜索 UI 使用） =====

// 按科室分类获取条目
export function getEntriesByCategory(category) {
  return medicalKB.filter((e) => e.category === category);
}

// 简单关键词过滤搜索（匹配问题、关键词标签与分类名）
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
