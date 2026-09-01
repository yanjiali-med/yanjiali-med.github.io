// 项目作品集 / Portfolio page
import { projects, projectTypes } from "../data/projects.js";

export function renderPortfolio(root) {
  root.innerHTML = `
  <div class="page">
    <section class="section" style="padding-top:var(--space-7)">
      <div class="container">
        <div class="section__header" data-reveal>
          <span class="section__eyebrow">Projects &amp; Research</span>
          <h1 class="section__title">项目作品与科研经历</h1>
          <p class="section__subtitle">科研项目、学术论文与数字健康实践（合并板块），每个项目均标注个人职责与成果。</p>
        </div>

        <div class="portfolio__filters" id="filters" role="tablist" aria-label="项目类型筛选">
          ${projectTypes
            .map(
              (t, i) =>
                `<button class="filter-btn ${i === 0 ? "is-active" : ""}" data-filter="${t.key}" role="tab">${t.label}</button>`
            )
            .join("")}
        </div>

        <div class="portfolio__grid" id="grid"></div>
      </div>
    </section>
  </div>`;

  const grid = root.querySelector("#grid");

  function renderCards(filter = "all") {
    const list = filter === "all" ? projects : projects.filter((p) => p.type === filter);
    grid.innerHTML = list
      .map(
        (p, i) => `
      <article class="card project-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
        <div class="project-card__media">
          <span class="badge project-card__type">${p.typeLabel}</span>
          <img src="${p.image}" alt="${p.title} 项目示意图" loading="lazy" />
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${p.title}</h3>
          <p class="project-card__desc">${p.description}</p>
          <p class="muted" style="font-size:var(--fs-sm);margin-bottom:var(--space-3)"><strong>个人职责：</strong>${p.role}</p>
          <p style="font-size:var(--fs-sm);color:var(--color-accent-700);margin-bottom:var(--space-4)"><strong>成果：</strong>${p.outcome}</p>
          <div class="project-card__stack">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
          <div class="project-card__links">
            ${p.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.icon} ${l.label}</a>`).join("")}
          </div>
        </div>
      </article>`
      )
      .join("");

    // 重新触发滚动揭示
    requestAnimationFrame(() => {
      grid.querySelectorAll("[data-reveal]").forEach((n) => {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        io.observe(n);
      });
    });

    if (!list.length) {
      grid.innerHTML = `<p class="muted text-center" style="grid-column:1/-1;padding:var(--space-7)">暂无该类型项目。</p>`;
    }
  }

  renderCards();

  // 筛选交互
  const filters = root.querySelector("#filters");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderCards(btn.dataset.filter);
  });
}
