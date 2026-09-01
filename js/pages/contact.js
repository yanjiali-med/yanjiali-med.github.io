// 联系方式页 / Contact page
import { profile } from "../data/profile.js";
import { showToast, escapeHtml } from "../utils/dom.js";

export function renderContact(root) {
  const socialsHtml = profile.socials
    .map(
      (s) => `<a class="contact__social" href="${s.url}" target="_blank" rel="noopener noreferrer">
      <span style="font-weight:700">${s.icon}</span> ${s.name}</a>`
    )
    .join("");

  root.innerHTML = `
  <div class="page">
    <section class="section contact" style="padding-top:var(--space-7)">
      <div class="container">
        <div class="section__header" data-reveal>
          <span class="section__eyebrow">Get in Touch</span>
          <h1 class="section__title">联系我</h1>
          <p class="section__subtitle">无论是学术合作、健康咨询还是交流邀约，欢迎通过下方任一方式联系。我承诺在 <strong>24 小时内</strong>回复。</p>
        </div>

        <!-- ===== 联系方式（重点突出） ===== -->
        <div class="contact-hl" data-reveal style="margin-bottom:var(--space-7)">
          <div class="contact-hl__head">
            <h3>📮 联系方式</h3>
            <span class="muted">24 小时内回复</span>
          </div>
          <div class="contact-hl__grid">
            ${profile.emails.map((e) => `
            <a class="contact-hl__item" href="mailto:${e.value}">
              <span class="contact-hl__icon" aria-hidden="true">✉️</span>
              <span><span class="contact-hl__label">${e.label}</span><span class="contact-hl__value">${e.value}</span></span>
            </a>`).join("")}
            <div class="contact-hl__item">
              <span class="contact-hl__icon" aria-hidden="true">📱</span>
              <span><span class="contact-hl__label">电话</span><span class="contact-hl__value">${profile.phone}（完整号码请通过邮箱索取）</span></span>
            </div>
            <div class="contact-hl__item">
              <span class="contact-hl__icon" aria-hidden="true">📍</span>
              <span><span class="contact-hl__label">所在地</span><span class="contact-hl__value">${profile.location}</span></span>
            </div>
          </div>
        </div>

        <div class="contact__grid">
          <div class="contact__info" data-reveal>
            <h3>专业平台</h3>
            <div class="contact__socials">${socialsHtml}</div>
            <div class="callout callout--info" style="margin-top:var(--space-6)">
              <span class="callout__icon" aria-hidden="true">💡</span>
              <div>
                <p class="callout__title">健康咨询提示</p>
                <p>健康问题建议优先使用本站<a href="#/medical-qa" data-route="#/medical-qa">医疗问答系统</a>；紧急情况请立即拨打 120。</p>
              </div>
            </div>
          </div>

          <form class="contact__form" id="contactForm" novalidate data-reveal data-reveal-delay="2">
            <h3 style="margin:0">给我留言</h3>
            <div class="field">
              <label for="name">姓名 <span class="req">*</span></label>
              <input class="input" id="name" name="name" type="text" required minlength="2" autocomplete="name" placeholder="您的称呼" />
              <span class="field__error">请填写您的姓名（至少 2 字）</span>
            </div>
            <div class="field">
              <label for="email">邮箱 <span class="req">*</span></label>
              <input class="input" id="email" name="email" type="email" required autocomplete="email" placeholder="example@email.com" />
              <span class="field__error">请输入有效的邮箱地址</span>
            </div>
            <div class="field">
              <label for="subject">主题 <span class="req">*</span></label>
              <select class="select" id="subject" name="subject" required>
                <option value="">请选择…</option>
                <option>学习交流</option>
                <option>科研合作</option>
                <option>健康科普咨询</option>
                <option>项目加入</option>
                <option>其他</option>
              </select>
              <span class="field__error">请选择主题</span>
            </div>
            <div class="field">
              <label for="message">消息 <span class="req">*</span></label>
              <textarea class="textarea" id="message" name="message" required minlength="10" placeholder="请简要描述您的需求…（注意：请勿在此填写具体病历或隐私信息）"></textarea>
              <span class="field__error">请填写消息内容（至少 10 字）</span>
            </div>
            <label style="display:flex;gap:var(--space-3);align-items:flex-start;font-size:var(--fs-sm);color:var(--color-text-secondary)">
              <input type="checkbox" id="consent" required style="margin-top:4px" />
              <span>我同意按隐私政策处理本次提交的信息，且不在消息中包含他人隐私或敏感病历数据。</span>
            </label>
            <button class="btn btn--primary btn--lg btn--block" type="submit">发送消息</button>
            <p class="muted" style="font-size:var(--fs-xs);text-align:center">您的信息仅用于本次回复，不会分享给第三方。</p>
          </form>
        </div>
      </div>
    </section>
  </div>`;

  const form = root.querySelector("#contactForm");
  const fields = form.querySelectorAll(".field");

  function validateField(field) {
    const input = field.querySelector("input, textarea, select");
    const valid = input.checkValidity();
    field.classList.toggle("is-invalid", !valid);
    return valid;
  }
  fields.forEach((f) => {
    const input = f.querySelector("input, textarea, select");
    input.addEventListener("blur", () => validateField(f));
    input.addEventListener("input", () => f.classList.remove("is-invalid"));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    fields.forEach((f) => { if (!validateField(f)) allValid = false; });
    const consent = form.querySelector("#consent");
    if (!consent.checked) { showToast("请勾选隐私同意项", 3000); allValid = false; }
    if (!allValid) return;

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "发送中…";
    // 模拟提交（隐私保护：本地仅模拟，不外发）
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "发送消息";
      form.reset();
      showToast("感谢留言！我会在 24 小时内回复您。", 4000);
    }, 1200);
  });
}
