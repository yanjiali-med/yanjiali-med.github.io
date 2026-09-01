// 导航栏组件 / Navbar component
import { el, escapeHtml } from "../utils/dom.js";

const links = [
  { href: "#/", label: "首页", icon: "🏠" },
  { href: "#/medical-qa", label: "医疗问答", icon: "🩺" },
  { href: "#/portfolio", label: "项目与科研", icon: "📊" },
  { href: "#/contact", label: "联系方式", icon: "✉️" },
];

export function renderNavbar(activePath) {
  const nav = el("nav", { class: "navbar", id: "navbar", "aria-label": "主导航" });
  const current = "#" + activePath;

  const linksHtml = links
    .map(
      (l) => `<a href="${l.href}" data-route="${l.href}" class="${l.href === current ? "is-active" : ""}">
        <span aria-hidden="true">${l.icon}</span>${l.label}</a>`
    )
    .join("");

  nav.innerHTML = `
    <div class="navbar__inner">
      <a class="brand" href="#/" data-route="#/" aria-label="返回首页">
        <span class="brand__mark" aria-hidden="true">🩺</span>
        <span>
          <span class="brand__name">闫佳俐</span><br />
          <span class="brand__role">内蒙古医科大学 · 临床医学在读</span>
        </span>
      </a>
      <ul class="nav-links" id="navLinks">${linksHtml}</ul>
      <div class="nav-cta">
        <a class="btn btn--primary" href="#/medical-qa" data-route="#/medical-qa">立即咨询</a>
        <button class="nav-toggle" id="navToggle" aria-label="切换菜单" aria-expanded="false">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    </div>`;

  // 移动端菜单切换
  const toggle = nav.querySelector("#navToggle");
  const list = nav.querySelector("#navLinks");
  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  // 点击链接后关闭菜单
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      list.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // 滚动时加阴影
  window.addEventListener(
    "scroll",
    () => nav.classList.toggle("is-scrolled", window.scrollY > 8),
    { passive: true }
  );

  return nav;
}
