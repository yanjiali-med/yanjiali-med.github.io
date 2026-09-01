// DOM 与通用工具 / DOM & utility helpers

// 转义 HTML，防止注入（用于用户输入回显）
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 简单的 HTML 标记语言 -> 安全渲染（仅支持本站知识库受信内容）
// 这里采用白名单：知识库 answer 由开发者撰写，可直接 innerHTML。
// 用户输入一律走 escapeHtml。
export function trusted(html) {
  return html;
}

// 创建元素快捷方法
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

// 滚动揭示：IntersectionObserver 给元素加 .is-visible
export function initScrollReveal(scope = document) {
  const items = scope.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((n) => io.observe(n));
}

// 技能条进度动画（在视口内时填充）
export function animateSkillBars(scope = document) {
  const bars = scope.querySelectorAll(".skill-bar__fill");
  if (!bars.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const pct = e.target.getAttribute("data-pct");
          e.target.style.width = pct + "%";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

// Toast 轻提示
export function showToast(message, duration = 3000) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = el("div", { class: "toast", role: "status", "aria-live": "polite" });
    document.body.append(toast);
  }
  toast.innerHTML = `<span>✅</span><span>${escapeHtml(message)}</span>`;
  requestAnimationFrame(() => toast.classList.add("is-show"));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-show"), duration);
}

// 滚动到顶部（页面切换时）
export function scrollTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
}
