// 请求限流器 / Rate Limiter
// 防止滥用：基于 sessionStorage 的滑动窗口限流，保护服务并提醒用户合理使用。
// 隐私保护：所有记录仅存于浏览器本地，不上传任何用户数据。

const STORAGE_KEY = "mqa_requests";
const WINDOW_MS = 60 * 1000;        // 1 分钟滑动窗口
const MAX_REQUESTS = 5;             // 每分钟最多 5 次提问（防滥用）

function read() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(arr) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    /* 隐私模式下忽略 */
  }
}

export function getUsage() {
  const now = Date.now();
  const arr = read().filter((t) => now - t < WINDOW_MS);
  write(arr);
  return {
    used: arr.length,
    remaining: Math.max(0, MAX_REQUESTS - arr.length),
    limit: MAX_REQUESTS,
    windowMs: WINDOW_MS,
    resetIn: arr.length ? Math.max(0, WINDOW_MS - (now - arr[0])) : 0,
  };
}

export function tryConsume() {
  const usage = getUsage();
  if (usage.remaining <= 0) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil(usage.resetIn / 1000),
      usage,
    };
  }
  const arr = read().filter((t) => Date.now() - t < WINDOW_MS);
  arr.push(Date.now());
  write(arr);
  return { allowed: true, usage: getUsage() };
}
