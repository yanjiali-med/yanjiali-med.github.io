// 医疗问答模块 / Medical Q&A page — 含分类浏览、关键词搜索、历史记录、引用格式
import { askMedicalQuestion, getUsage, searchEntries, getEntriesByCategory } from "../utils/medicalApi.js";
import { suggestedQuestions, qaTopics, categoryMeta } from "../data/medicalKnowledge.js";
import { escapeHtml } from "../utils/dom.js";

// 历史记录（隐私：仅存于本浏览器 localStorage，可一键清空）
const HISTORY_KEY = "mqa_history";
function readHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}
function writeHistory(arr) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0, 30))); } catch {}
}

// 引用格式生成
function formatCitation(source, idx) {
  return `[${idx}] ${source.name}. [EB/OL]. ${source.url}`;
}

export function renderMedicalQA(root) {
  root.innerHTML = `
  <div class="page">
    <section class="section mqa" style="padding-top:var(--space-6)">
      <div class="container">
        <div class="mqa__header" data-reveal>
          <span class="badge">🤖 循证医学问答 · 覆盖 22 大临床科室 · 肝胆外科重点强化</span>
          <h1 class="section__title" style="margin:var(--space-3) 0">医疗问答系统</h1>
          <p class="section__subtitle">由 ${"闫佳俐"}（内蒙古医科大学临床医学在读）整理维护。系统覆盖内科、外科、妇产科、儿科等 20 余个临床领域，<strong>重点强化肝胆外科</strong>（肝脏、胆道、胰腺疾病的诊断标准、手术技术、术后护理与并发症防治），基于 WHO、中华医学会、AASLD/EASL、NCCN 等权威指南作答，每条回答标注医学来源与引用格式。回答仅供参考，<strong>不构成诊疗建议</strong>。</p>
        </div>

        <div class="mqa__panel">
          <!-- 聊天主区 -->
          <div class="mqa__chat" data-reveal>
            <div class="mqa__chat-header">
              <span class="avatar" aria-hidden="true">🩺</span>
              <div>
                <h3>循证医学助手</h3>
                <p><span class="mqa__status-dot"></span> 在线 · 隐私本地处理 · 每分钟限 5 次</p>
              </div>
            </div>

            <div class="mqa__messages" id="messages" aria-live="polite" aria-label="问答对话区"></div>

            <div class="mqa__input-area">
              <form class="mqa__input-wrap" id="qaForm">
                <textarea class="mqa__input" id="qaInput" placeholder="输入您的健康问题，如：高血压如何管理？" rows="1" maxlength="500" aria-label="问题输入"></textarea>
                <button class="mqa__send" id="qaSend" type="submit">发送</button>
              </form>
              <div class="mqa__rate-info">
                <span id="rateInfo">加载中…</span>
                <span class="muted">🔒 不存储问题内容 · 仅本地限流与历史</span>
              </div>
            </div>
          </div>

          <!-- 侧边栏 -->
          <aside class="mqa__side">
            <div class="mqa__side-block" data-reveal data-reveal-delay="1">
              <h4>💡 推荐问题</h4>
              <div class="mqa__suggest" id="suggest"></div>
            </div>
            <div class="mqa__side-block" data-reveal data-reveal-delay="2">
              <h4>🔍 关键词搜索</h4>
              <input class="mqa__search" id="kbSearch" type="search" placeholder="如：胆囊、胰腺、血压、近视…" aria-label="知识库关键词搜索" maxlength="30" />
              <div class="mqa__kb-list" id="searchResults" hidden></div>
            </div>
            <div class="mqa__side-block" data-reveal data-reveal-delay="2">
              <h4>🗂️ 分类浏览 <span class="muted" style="font-size:var(--fs-xs);font-weight:400">（共 ${qaTopics.length} 科室）</span></h4>
              <div class="mqa__topics" id="catChips">
                ${qaTopics.map((t) => {
                  const meta = categoryMeta[t] || {};
                  return `<button class="mqa__topic${meta.featured ? " mqa__topic--hl" : ""}" type="button" data-cat="${t}" title="${meta.desc || t}">${meta.icon || "🏷️"} ${t}${meta.featured ? " ⭐" : ""}</button>`;
                }).join("")}
              </div>
              <div class="mqa__kb-list" id="catEntries" hidden></div>
            </div>
            <div class="mqa__side-block" data-reveal data-reveal-delay="3">
              <h4>🗂️ 历史问答</h4>
              <div id="history"></div>
              <button class="mqa__clear-btn" id="clearHistory" type="button" style="display:none">清空历史</button>
            </div>
            <div class="mqa__side-block" data-reveal data-reveal-delay="4">
              <h4>⚠️ 服务边界</h4>
              <ul style="margin:0;padding-left:var(--space-5);font-size:var(--fs-sm);color:var(--color-text-secondary);line-height:var(--lh-normal)">
                <li>覆盖 22 大临床科室常见疾病科普</li>
                <li>不提供具体用药剂量处方</li>
                <li>不解读个人检查报告</li>
                <li>紧急情况请立即拨打 120</li>
              </ul>
            </div>
          </aside>
        </div>

        <!-- 免责声明 -->
        <div class="mqa__disclaimer" data-reveal>
          <div class="callout callout--warn">
            <span class="callout__icon" aria-hidden="true">⚠️</span>
            <div>
              <p class="callout__title">重要免责声明</p>
              <p>本医疗问答模块提供的所有信息均为基于权威公开医学文献、指南与研究成果整理的<strong>健康科普内容</strong>，旨在帮助您了解常见健康知识，<strong>不构成医疗诊断、治疗建议或处方</strong>，亦不能替代执业医师面对面的专业诊疗。系统回答与 ${"闫佳俐"} 个人学习背景相互独立。任何健康问题请以正规医疗机构就诊评估为准；如出现胸痛、呼吸困难、意识改变、严重出血等紧急情况，请<strong>立即拨打 120</strong>或前往就近急诊，切勿因本模块信息延误救治。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>`;

  const messagesEl = root.querySelector("#messages");
  const form = root.querySelector("#qaForm");
  const input = root.querySelector("#qaInput");
  const sendBtn = root.querySelector("#qaSend");
  const rateInfo = root.querySelector("#rateInfo");
  const suggestEl = root.querySelector("#suggest");
  const historyEl = root.querySelector("#history");
  const clearBtn = root.querySelector("#clearHistory");
  const kbSearch = root.querySelector("#kbSearch");
  const searchResults = root.querySelector("#searchResults");
  const catChips = root.querySelector("#catChips");
  const catEntries = root.querySelector("#catEntries");

  suggestEl.innerHTML = suggestedQuestions
    .map((q) => `<button class="mqa__suggest-btn" type="button" data-q="${escapeHtml(q)}">${q}</button>`)
    .join("");

  function addWelcome() {
    addBotMessage(
      `<p>您好！我是基于权威医学指南的循证健康科普助手 👋</p>
       <p>本系统覆盖 <strong>22 大临床科室</strong>（内科、外科、妇产科、儿科、皮肤科、眼科、耳鼻喉科、口腔科、骨科、心血管科、呼吸科、消化科、内分泌科、肾内科、血液科、肿瘤科、传染病科、神经科、精神科、急诊科等），并<strong>重点强化肝胆外科</strong>——肝脏疾病（肝炎/肝硬化/肝癌/肝脓肿）、胆道疾病（胆囊炎/胆石症/胆管炎/胆道肿瘤）、胰腺疾病（胰腺炎/胰腺肿瘤）的诊断、手术、术后护理与并发症防治。每条回答均标注权威来源与引用格式。</p>
       <p>请直接输入问题，点击右侧推荐问题，或使用<strong>关键词搜索 / 分类浏览</strong>开始。</p>`,
      [], null
    );
  }

  function scrollBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "mqa__msg mqa__msg--user";
    div.innerHTML = `<div class="mqa__msg-avatar" aria-hidden="true">🧑</div><div class="mqa__msg-bubble">${escapeHtml(text)}</div>`;
    messagesEl.append(div);
    scrollBottom();
  }

  function addBotMessage(html, sources, category, opts = {}) {
    const div = document.createElement("div");
    div.className = "mqa__msg mqa__msg--bot";
    // 紧急情况使用醒目红色边框
    if (opts.isEmergency) div.classList.add("mqa__msg--emergency");
    // 孕产期边界响应：紫色边框（区别于紧急红色）
    if (opts.isPregnancyBoundary) div.classList.add("mqa__msg--boundary");
    // 实时检索响应：青色边框（区别于本地 KB 命中）
    if (opts.isRealtime) div.classList.add("mqa__msg--realtime");
    const catBadge = category ? `<span class="mqa__category">${category}</span>` : "";
    // 候选条目按钮（澄清 / fallback 时展示，点击直接进入该问题）
    const candidatesBlock = opts.candidates && opts.candidates.length
      ? `<div class="mqa__candidates">
           ${opts.candidates.map((e) => `<button class="mqa__kb-item" type="button" data-q="${escapeHtml(e.question)}">
             <span class="mqa__kb-cat">${escapeHtml(e.category)}</span>${escapeHtml(e.question)}
           </button>`).join("")}
         </div>`
      : "";
    // 意图标签（增强可解释性）
    const intentBadge = opts.intent && opts.intent.type
      ? `<span class="mqa__intent" title="${escapeHtml(opts.intent.reason || "")}">意图：${escapeHtml(intentLabel(opts.intent.type))}</span>`
      : "";
    const sourcesBlock = sources && sources.length
      ? `<div class="mqa__sources">
           <div class="mqa__sources-title">📚 权威来源</div>
           ${sources.map((s, i) => `<div class="mqa__source"><span>${i + 1}.</span><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a></div>`).join("")}
           <div class="mqa__citation"><strong>引用格式：</strong><code>${sources.map((s, i) => formatCitation(s, i + 1)).join("  ")}</code></div>
         </div>`
      : "";
    const disclaimer = opts.isEmergency
      ? `<p class="muted" style="font-size:var(--fs-xs);margin-top:var(--space-2);margin-bottom:0;border-top:1px dashed var(--color-border-strong);padding-top:var(--space-2);color:var(--color-warn-700)">⚠️ 紧急情况请立即拨打 120，本系统信息不得延误救治。</p>`
      : `<p class="muted" style="font-size:var(--fs-xs);margin-top:var(--space-2);margin-bottom:0;border-top:1px dashed var(--color-border-strong);padding-top:var(--space-2)">⚠️ 仅供参考，不构成诊疗建议。紧急情况请拨打 120。</p>`;

    // 反馈组件：5 星评分 + 修正建议输入（紧急情况不展示）
    const feedbackBlock = opts.isEmergency ? "" : `
      <div class="mqa__feedback" data-q="${escapeHtml(opts.question || "")}">
        <div class="mqa__feedback-row">
          <span class="mqa__feedback-label">这条回答对您有帮助吗？</span>
          <div class="mqa__stars" role="radiogroup" aria-label="评分">
            ${[1, 2, 3, 4, 5].map((n) => `<span class="mqa__star" data-v="${n}" role="radio" aria-label="${n} 星" tabindex="0">☆</span>`).join("")}
          </div>
        </div>
        <div class="mqa__feedback-text" hidden>
          <textarea class="mqa__feedback-input" rows="2" placeholder="可补充：希望增加哪些内容 / 哪里不准确（选填，最多 200 字）" maxlength="200"></textarea>
          <button class="mqa__feedback-submit" type="button">提交反馈</button>
        </div>
        <div class="mqa__feedback-thanks" hidden>✓ 感谢您的反馈，已记录用于改进回答质量。</div>
      </div>`;

    div.innerHTML = `<div class="mqa__msg-avatar" aria-hidden="true">🩺</div><div class="mqa__msg-bubble">${catBadge}${intentBadge}${html}${candidatesBlock}${sourcesBlock}${disclaimer}${feedbackBlock}</div>`;
    messagesEl.append(div);

    // 候选按钮点击 → 直接发起该问题
    if (opts.candidates && opts.candidates.length) {
      div.querySelectorAll(".mqa__kb-item").forEach((btn) => {
        btn.addEventListener("click", () => handleAsk(btn.dataset.q));
      });
    }

    // 反馈交互：悬停/点击星星 + 提交反馈
    if (!opts.isEmergency && opts.question) {
      bindFeedback(div, opts.question);
    }

    scrollBottom();
  }

  // 反馈交互绑定：星星悬停 + 评分 + 提交
  function bindFeedback(msgEl, question) {
    const stars = msgEl.querySelectorAll(".mqa__star");
    const textWrap = msgEl.querySelector(".mqa__feedback-text");
    const input = msgEl.querySelector(".mqa__feedback-input");
    const submit = msgEl.querySelector(".mqa__feedback-submit");
    const thanks = msgEl.querySelector(".mqa__feedback-thanks");
    let selected = 0;

    function paint(n) {
      stars.forEach((s, i) => { s.textContent = i < n ? "★" : "☆"; s.classList.toggle("is-on", i < n); });
    }
    stars.forEach((s, i) => {
      s.addEventListener("mouseenter", () => paint(i + 1));
      s.addEventListener("mouseleave", () => paint(selected));
      s.addEventListener("click", () => {
        selected = i + 1;
        paint(selected);
        if (textWrap.hidden) textWrap.hidden = false;
      });
      s.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); s.click(); }
      });
    });
    submit?.addEventListener("click", () => {
      if (selected === 0) { submit.textContent = "请先选评分"; setTimeout(() => submit.textContent = "提交反馈", 1500); return; }
      const comment = input?.value?.trim() || "";
      // 调用 realtimeQA 的 saveFeedback
      import("../utils/realtimeQA.js").then(({ saveFeedback }) => {
        saveFeedback({ question, rating: selected, comment });
        textWrap.hidden = true;
        thanks.hidden = false;
        msgEl.querySelectorAll(".mqa__star").forEach((s) => s.style.pointerEvents = "none");
      });
    });
  }

  // 意图类型 → 中文标签
  function intentLabel(type) {
    const map = { disease_info: "疾病咨询", symptom_check: "症状自查", medication: "用药咨询", emergency: "紧急情况", pregnancy: "孕产期边界", general: "通用" };
    return map[type] || "通用";
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "mqa__msg mqa__msg--bot";
    div.id = "typing";
    div.innerHTML = `<div class="mqa__msg-avatar" aria-hidden="true">🩺</div><div class="mqa__typing"><span></span><span></span><span></span></div>`;
    messagesEl.append(div);
    scrollBottom();
  }
  function hideTyping() { messagesEl.querySelector("#typing")?.remove(); }

  function updateRate(usage) {
    const u = usage || getUsage();
    rateInfo.textContent = `本分钟剩余 ${u.remaining}/${u.limit} 次提问`;
    rateInfo.style.color = u.remaining <= 1 ? "var(--color-warn-600)" : "";
  }

  // 历史渲染
  function renderHistory() {
    const arr = readHistory();
    clearBtn.style.display = arr.length ? "" : "none";
    if (!arr.length) {
      historyEl.innerHTML = `<p class="muted" style="font-size:var(--fs-xs);margin:0">暂无历史记录（仅存于本浏览器）</p>`;
      return;
    }
    historyEl.innerHTML = arr
      .map((h, i) => `<button class="mqa__history-item" type="button" data-q="${escapeHtml(h.q)}">
        <span class="mqa__history-cat">${h.category}</span>
        <span>${escapeHtml(h.q)}</span>
        <span class="muted" style="font-size:var(--fs-xs)">${h.time}</span>
      </button>`)
      .join("");
  }
  function pushHistory(q, category) {
    const arr = readHistory();
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    arr.unshift({ q, category, time });
    writeHistory(arr);
    renderHistory();
  }

  let busy = false;
  async function handleAsk(question) {
    if (busy) return;
    const q = (question || "").trim();
    if (!q) return;
    addUserMessage(q);
    input.value = "";
    autoResize();
    busy = true;
    sendBtn.disabled = true;
    input.disabled = true;
    showTyping();

    const res = await askMedicalQuestion(q);
    hideTyping();
    busy = false;
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
    updateRate(res.usage);

    if (!res.ok) {
      addBotMessage(`<p><strong>提示：</strong>${escapeHtml(res.message)}</p>`, [], null);
    } else {
      const d = res.data;
      addBotMessage(d.answer, d.sources, d.category, {
        question: d.question || currentQ,
        isEmergency: d.isEmergency,
        isPregnancyBoundary: d.isPregnancyBoundary,
        isClarify: d.isClarify,
        isFallback: d.isFallback,
        isRealtime: d.isRealtime,
        candidates: d.candidates,
        intent: d.intent,
      });
      pushHistory(q, d.category || "通用");
    }
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); handleAsk(input.value); });
  suggestEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".mqa__suggest-btn");
    if (btn) handleAsk(btn.dataset.q);
  });
  historyEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".mqa__history-item");
    if (btn) { input.value = btn.dataset.q; autoResize(); input.focus(); }
  });
  clearBtn.addEventListener("click", () => { writeHistory([]); renderHistory(); });

  // ===== 知识库：关键词搜索 + 分类浏览 =====
  function renderEntryList(container, entries, emptyTip) {
    if (!entries.length) {
      container.innerHTML = `<p class="muted" style="font-size:var(--fs-xs);margin:var(--space-2) 0 0">${emptyTip}</p>`;
    } else {
      container.innerHTML = entries
        .map((e) => `<button class="mqa__kb-item" type="button" data-q="${escapeHtml(e.question)}">
          <span class="mqa__kb-cat">${escapeHtml(e.category)}</span>${escapeHtml(e.question)}
        </button>`)
        .join("");
    }
    container.hidden = false;
  }

  let searchTimer = null;
  kbSearch.addEventListener("input", () => {
    clearTimeout(searchTimer);
    const q = kbSearch.value.trim();
    if (!q) { searchResults.hidden = true; searchResults.innerHTML = ""; return; }
    searchTimer = setTimeout(() => {
      renderEntryList(searchResults, searchEntries(q, 8), "未找到相关条目，请尝试其他关键词。");
    }, 200);
  });

  let activeCat = null;
  catChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".mqa__topic");
    if (!chip) return;
    const cat = chip.dataset.cat;
    if (activeCat === cat) { // 再次点击收起
      activeCat = null;
      catEntries.hidden = true;
      catEntries.innerHTML = "";
      chip.classList.remove("is-active");
      return;
    }
    catChips.querySelectorAll(".mqa__topic.is-active").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeCat = cat;
    renderEntryList(catEntries, getEntriesByCategory(cat), "该分类条目整理中，敬请期待。");
  });

  catEntries.addEventListener("click", (e) => {
    const btn = e.target.closest(".mqa__kb-item");
    if (btn) handleAsk(btn.dataset.q);
  });
  searchResults.addEventListener("click", (e) => {
    const btn = e.target.closest(".mqa__kb-item");
    if (btn) handleAsk(btn.dataset.q);
  });

  function autoResize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }
  input.addEventListener("input", autoResize);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(input.value); }
  });

  addWelcome();
  updateRate();
  renderHistory();

  return function cleanup() { busy = false; };
}
