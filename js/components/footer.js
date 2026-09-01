// 页脚组件 / Footer component
import { profile } from "../data/profile.js";

export function renderFooter() {
  const year = new Date().getFullYear();
  const socials = profile.socials
    .map(
      (s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.name}" aria-label="${s.name}">
      <span style="font-weight:700;font-size:.8rem">${s.icon}</span></a>`
    )
    .join("");

  const linksHtml = [
    { href: "#/", label: "首页" },
    { href: "#/medical-qa", label: "医疗问答" },
    { href: "#/portfolio", label: "项目与科研" },
    { href: "#/contact", label: "联系方式" },
  ]
    .map((l) => `<li><a href="${l.href}" data-route="${l.href}">${l.label}</a></li>`)
    .join("");

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__about">
          <h4>${profile.name} · ${profile.title}</h4>
          <p>${profile.tagline}</p>
          <div class="footer__social">${socials}</div>
        </div>
        <div>
          <h4>快速导航</h4>
          <ul class="footer__links">${linksHtml}</ul>
        </div>
        <div>
          <h4>联系信息</h4>
          <ul class="footer__links">
            ${profile.emails.map((e) => `<li><a href="mailto:${e.value}">${e.value}</a></li>`).join("")}
            <li>${profile.phone}</li>
            <li>${profile.location}</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${year} ${profile.name} · 本站内容仅供专业展示与健康科普</span>
        <span class="footer__disclaimer" style="max-width:48ch">
          <span aria-hidden="true">⚠️</span>
          <span>医疗问答模块回答基于权威来源的科普信息，不构成诊疗建议，紧急情况请拨打 120 或就近就医。</span>
        </span>
      </div>
    </div>`;
  return footer;
}
