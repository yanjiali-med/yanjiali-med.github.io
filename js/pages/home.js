// 首页 / Home page — 以医疗问答系统为核心（≥60%），个人简介精简（≤20%）
import { profile } from "../data/profile.js";
import { medicalKB } from "../data/medicalKnowledge.js";

// 医学术语悬停提示
function applyTerms(html, terms) {
  let out = html;
  const keys = Object.keys(terms).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const re = new RegExp(`(?<![\\w>)])${escapeRegExp(key)}(?![\\w<])`, "g");
    out = out.replace(re, `<span data-term="${terms[key]}" tabindex="0">${key}</span>`);
  }
  return out;
}
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// 医疗问答系统展示数据
const qaFeatures = [
  { icon: "🔎", title: "循证检索", text: "基于关键词匹配在权威医学知识库中检索最相关条目。" },
  { icon: "📚", title: "来源引用", text: "每条回答标注 WHO、中华医学会、AHA 等权威来源链接与引用格式。" },
  { icon: "🏷️", title: "分类标签", text: "覆盖 22 大临床科室分类（内科、外科、妇产、儿科、五官、骨科等），肝胆外科重点强化，支持关键词搜索与分类浏览。" },
  { icon: "🕐", title: "历史记录", text: "本地保存本次会话问答历史，便于回顾（隐私：仅存于本浏览器）。" },
  { icon: "🛡️", title: "限流防护", text: "每分钟限 5 次提问，防止滥用并保障服务稳定公平。" },
  { icon: "⚠️", title: "边界清晰", text: "固定免责声明区，明确科普与诊疗的边界，紧急情况提示拨打 120。" },
];

const qaArchitecture = [
  { layer: "表现层", tech: "原生 ES Modules + 语义化 HTML", icon: "🖥️" },
  { layer: "样式层", tech: "CSS 自定义属性设计系统（医疗蓝主题）", icon: "🎨" },
  { layer: "检索层", tech: "中文分词 + 关键词加权匹配算法", icon: "🧮" },
  { layer: "知识层", tech: `${medicalKB.length} 条循证问答条目 · 22 大临床科室（肝胆外科深度覆盖）`, icon: "📖" },
  { layer: "安全层", tech: "滑动窗口限流 + 本地隐私处理", icon: "🔐" },
  { layer: "合规层", tech: "免责声明 + 来源标注 + 季度审查", icon: "📜" },
];

const qaSteps = [
  { n: 1, title: "输入问题", text: "在问答区输入健康问题，或点击推荐问题。" },
  { n: 2, title: "检索匹配", text: "系统对问题分词并在知识库中加权匹配最相关条目。" },
  { n: 3, title: "生成回答", text: "返回基于权威指南整理的循证回答，支持图文混排。" },
  { n: 4, title: "标注来源", text: "附权威来源链接与引用格式，并提示仅供参考。" },
];

const qaAdvantages = [
  { title: "有据可依", text: "区别于通用搜索，每条结论均可追溯到权威医学指南或文献。" },
  { title: "权威可信", text: "来源覆盖 WHO、CDC、AHA、ESC、中华医学会等权威机构。" },
  { title: "边界清晰", text: "明确区分个人学习背景与系统科普，不替代执业医师诊疗。" },
  { title: "隐私优先", text: "问答内容本地处理，不上传用户数据，符合个人信息保护要求。" },
];

export function renderHome(root) {
  const terms = profile.terms;
  const overviewHtml = profile.overview.map((p) => `<p>${p}</p>`).join("");
  const statsHtml = profile.stats
    .map((s) => `<div class="hero__stat"><strong>${s.value}</strong><span>${s.label}</span></div>`)
    .join("");

  // 实际应用案例（肝胆外科重点 + 全科室广度，取自真实知识库）
  const caseList = [medicalKB.find((e) => e.id === "gallstones"), medicalKB.find((e) => e.id === "liver-cancer")];
  const casesHtml = caseList.map((c, i) => `
    <article class="case-card" data-reveal data-reveal-delay="${i + 1}">
      <span class="badge">${c.category}</span>
      <h4 class="case-card__q">Q：${c.question}</h4>
      <div class="case-card__a">${c.answer}</div>
      <div class="case-card__src"><strong>来源：</strong>${c.sources.slice(0, 2).map((s) => s.name).join("、")} 等</div>
    </article>`).join("");

  const featuresHtml = qaFeatures.map((f, i) => `
    <article class="feature-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
      <div class="feature-card__icon">${f.icon}</div>
      <h4>${f.title}</h4>
      <p>${f.text}</p>
    </article>`).join("");

  const archHtml = qaArchitecture.map((a, i) => `
    <div class="arch-item" data-reveal data-reveal-delay="${(i % 3) + 1}">
      <span class="arch-item__icon">${a.icon}</span>
      <div><strong>${a.layer}</strong><span>${a.tech}</span></div>
    </div>`).join("");

  const stepsHtml = qaSteps.map((s, i) => `
    <div class="step-item" data-reveal data-reveal-delay="${i + 1}">
      <span class="step-item__n">${s.n}</span>
      <h4>${s.title}</h4>
      <p>${s.text}</p>
    </div>`).join("");

  const advHtml = qaAdvantages.map((a, i) => `
    <div class="adv-item" data-reveal data-reveal-delay="${(i % 2) + 1}">
      <strong>${a.title}</strong><p>${a.text}</p>
    </div>`).join("");

  root.innerHTML = `
  <div class="page">

    <!-- HERO：医疗问答系统价值主张 -->
    <header class="hero hero--qa">
      <div class="hero__inner">
        <div class="hero__content">
          <span class="hero__eyebrow">🩺 循证医疗问答系统 · 有据可依的健康咨询</span>
          <h1 class="hero__title">让权威医学知识<br /><span class="accent">人人可及、有据可查</span></h1>
          <p class="hero__subtitle">${profile.tagline}</p>
          <div class="hero__actions">
            <a class="btn btn--accent btn--lg" href="#/medical-qa" data-route="#/medical-qa">立即体验问答系统</a>
            <a class="btn btn--ghost btn--lg" href="#qa-system" style="color:#fff;border-color:rgba(255,255,255,.4)">了解系统架构</a>
          </div>
          <div class="hero__stats">${statsHtml}</div>
          <p class="hero__credit">由 ${profile.name} · ${profile.school} ${profile.major} 设计与维护</p>
        </div>
        <div class="hero__avatar">
          <img src="${profile.heroPortrait}" alt="闫佳俐医学生专业形象" loading="eager" width="380" height="475" />
        </div>
      </div>
    </header>

    <!-- ===== 医疗问答系统展示（核心 ≥60%，首要模块） ===== -->
    <section class="section qa-showcase" id="qa-system">
      <div class="container">
        <div class="section__header" data-reveal>
          <span class="section__eyebrow">Medical Q&A System</span>
          <h2 class="section__title">医疗问答系统</h2>
          <p class="section__subtitle">覆盖 <strong>22 大临床科室</strong>的循证问答系统（内科、外科、妇产科、儿科、骨科等），<strong>重点强化肝胆外科</strong>——肝脏、胆道、胰腺疾病的诊断标准、手术技术、术后护理与并发症防治；每条回答标注权威来源，明确区分个人学习背景与系统输出。</p>
        </div>

        <!-- 核心功能 -->
        <h3 class="qa-sub" data-reveal>✨ 核心功能</h3>
        <div class="feature-grid">${featuresHtml}</div>

        <!-- 技术架构 -->
        <h3 class="qa-sub" data-reveal>🛠️ 技术架构</h3>
        <div class="arch-grid">${archHtml}</div>

        <!-- 使用流程 -->
        <h3 class="qa-sub" data-reveal>🧭 使用流程</h3>
        <div class="step-grid">${stepsHtml}</div>

        <!-- 实际应用案例 -->
        <h3 class="qa-sub" data-reveal>📝 实际应用案例</h3>
        <div class="case-grid">${casesHtml}</div>

        <!-- 系统优势 -->
        <h3 class="qa-sub" data-reveal>🏆 系统优势（对比通用搜索）</h3>
        <div class="adv-grid">${advHtml}</div>

        <div class="text-center" style="margin-top:var(--space-7)" data-reveal>
          <a class="btn btn--accent btn--lg" href="#/medical-qa" data-route="#/medical-qa">进入医疗问答系统 →</a>
        </div>
      </div>
    </section>

    <!-- 个人简介（精简 ≤20%） -->
    <section class="section section--tight about" id="about">
      <div class="container">
        <div class="about__grid">
          <div class="about__image" data-reveal>
            <img src="${profile.aboutImage}" alt="闫佳俐学习医学资料的场景" loading="lazy" />
          </div>
          <div data-reveal data-reveal-delay="2">
            <span class="section__eyebrow">About Me</span>
            <h2 class="section__title">${profile.name} · ${profile.title}</h2>
            <div class="about__lead">${applyTerms(overviewHtml, terms)}</div>
            <div class="key-facts">
              <span class="key-fact"><span class="muted">学校</span><strong>${profile.school}</strong></span>
              <span class="key-fact"><span class="muted">专业</span><strong>${profile.major}</strong></span>
            </div>
            <div class="about__actions" style="margin-top:var(--space-5);display:flex;gap:var(--space-4);flex-wrap:wrap">
              <a class="btn btn--primary" href="#/portfolio" data-route="#/portfolio">项目与科研 →</a>
              <a class="btn btn--ghost" href="#/contact" data-route="#/contact">联系我</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目与科研速览（精简） -->
    <section class="section section--tight" style="background:var(--color-surface-alt)">
      <div class="container">
        <div class="section__header" data-reveal>
          <span class="section__eyebrow">Projects &amp; Research</span>
          <h2 class="section__title">项目与科研速览</h2>
        </div>
        <p class="text-center muted" style="margin-bottom:var(--space-6)">中风120/BE-FAST 科普项目、益生菌研究、临床数据收集等，详见<a href="#/portfolio" data-route="#/portfolio">项目与科研页</a>。</p>
        <div class="text-center">
          <a class="btn btn--primary" href="#/portfolio" data-route="#/portfolio">查看全部项目与科研</a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-band">
      <div class="container" data-reveal>
        <h2>有健康疑问？让循证医学给您靠谱答案</h2>
        <p>医疗问答系统基于权威医学指南与研究成果，回答均标注可靠来源。紧急情况请拨打 120。</p>
        <div class="cta-band__actions">
          <a class="btn btn--accent btn--lg" href="#/medical-qa" data-route="#/medical-qa">开始咨询</a>
          <a class="btn btn--ghost btn--lg" href="#/contact" data-route="#/contact" style="color:#fff;border-color:rgba(255,255,255,.4)">联系我</a>
        </div>
      </div>
    </section>
  </div>`;
}
