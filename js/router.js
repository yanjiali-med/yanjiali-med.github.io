// 哈希路由 / Hash-based router
import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { initScrollReveal, animateSkillBars, scrollTop, escapeHtml } from "./utils/dom.js";

import { renderHome } from "./pages/home.js";
import { renderPortfolio } from "./pages/portfolio.js";
import { renderContact } from "./pages/contact.js";
import { renderMedicalQA } from "./pages/medicalQA.js";

const routes = [
  { path: "/", render: renderHome, title: "首页 | 闫佳俐 · 循证医疗问答系统" },
  { path: "/medical-qa", render: renderMedicalQA, title: "医疗问答 | 闫佳俐" },
  { path: "/portfolio", render: renderPortfolio, title: "项目与科研 | 闫佳俐" },
  { path: "/contact", render: renderContact, title: "联系方式 | 闫佳俐" },
];

function parseHash() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return hash;
}

function matchRoute(path) {
  return routes.find((r) => r.path === path) || routes[0];
}

function renderShell(path) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const nav = renderNavbar(path);
  const main = document.createElement("main");
  main.id = "main";
  const children = [nav];
  // 面包屑导航：仅非首页显示，3 次点击内可达核心功能
  if (path !== "/") {
    const crumb = document.createElement("nav");
    crumb.className = "breadcrumb";
    crumb.setAttribute("aria-label", "面包屑导航");
    const route = matchRoute(path);
    crumb.innerHTML = `
      <div class="container breadcrumb__inner">
        <a href="#/" data-route="#/">首页</a>
        <span aria-hidden="true" class="breadcrumb__sep">›</span>
        <span class="breadcrumb__current" aria-current="page">${route.title.split(" |")[0]}</span>
        ${path !== "/medical-qa" ? `<a class="breadcrumb__qa" href="#/medical-qa" data-route="#/medical-qa">🩺 医疗问答</a>` : ""}
      </div>`;
    children.push(crumb);
  }
  children.push(main, renderFooter());
  app.append(...children);
  return main;
}

export function navigate(path) {
  const route = matchRoute(path);
  document.title = route.title;

  const main = renderShell(path);
  const page = route.render(main);
  // render 可能返回 cleanup 函数（供路由切换时调用）
  const cleanup = typeof page === "function" ? page : null;

  scrollTop();
  initScrollReveal(main);
  animateSkillBars(main);

  // 绑定内部 [data-route] 链接交给路由处理（hash 已自动触发 hashchange）
  return cleanup;
}

let currentCleanup = null;

function onHashChange() {
  if (typeof currentCleanup === "function") {
    try { currentCleanup(); } catch {}
    currentCleanup = null;
  }
  currentCleanup = navigate(parseHash());
}

export function initRouter() {
  window.addEventListener("hashchange", onHashChange);
  // 初始加载
  if (!window.location.hash) window.location.hash = "#/";
  else onHashChange();
}
