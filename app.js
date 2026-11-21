/* ==========================================================================
   APP.JS - XỬ LÝ TƯƠNG TÁC, PHÁT ÂM, FLASHCARD, AI CHẤM NÓI & GIẤY Ô VUÔNG
   ========================================================================== */

let state = {
  topicIndex: 0,
  section: "vocab",         // 'vocab' | 'grammar' | 'skills'
  skillTab: "listening",    // 'listening' | 'speaking' | 'reading' | 'writing'
  writingSubTab: "wongoji", // 'wongoji' | 'structures' | 'practice'
  vocabIndex: 0,
  isFlipped: false,
  oxAnswers: {},
  aiMessages: []
};

/* --------------------------------------------------------------------------
   1. TIỆN ÍCH FONT CHỮ, ESCAPE HTML & HIỆU ỨNG CLICK SINH ĐỘNG
   -------------------------------------------------------------------------- */
function escapeHtmlAttr(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function autoFontKo(text) {
  if (!text) return "";
  return String(text).replace(
    /([\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]+)/g,
    '<span class="ko" lang="ko">$1</span>'
  );
}

// Hiệu ứng hạt lấp lánh (#387CD3 & #F98BC8) + bắt sự kiện nút đọc phát âm
document.addEventListener("click", (e) => {
  // Xử lý nút phát âm an toàn qua data-speak
  const speakBtn = e.target.closest("[data-speak]");
  if (speakBtn) {
    e.stopPropagation();
    const textToSpeak = speakBtn.getAttribute("data-speak");
    const rate = parseFloat(speakBtn.getAttribute("data-rate") || "0.95");
    speakKorean(textToSpeak, rate);
  }

  // Hiệu ứng click
  const layer = document.getElementById("click-fx-layer");
  if (!layer) return;
  const shapes = ["✦", "♥", "✿", "★", "♪"];
  const colors = ["#387CD3", "#F98BC8"];

  for (let i = 0; i < 6; i++) {
    const p = document.createElement("span");
    p.className = "click-particle";
    p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    p.style.left = `${e.clientX}px`;
    p.style.top = `${e.clientY}px`;
    p.style.color = colors[i % 2];
    p.style.fontSize = `${12 + Math.random() * 10}px`;

    const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
    const dist = 34 + Math.random() * 32;
    p.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--ty", `${Math.sin(angle) * dist - 12}px`);
    p.style.setProperty("--rot", `${(Math.random() - 0.5) * 140}deg`);

    layer.appendChild(p);
    setTimeout(() => p.remove(), 760);
  }
});

/* --------------------------------------------------------------------------
   2. PHÁT ÂM TIẾNG HÀN (WEB SPEECH API)
   -------------------------------------------------------------------------- */
function speakKorean(text, rate = 0.95) {
  if (!("speechSynthesis" in window)) {
    alert("Trình duyệt chưa hỗ trợ đọc giọng nói tự động. Hãy dùng Chrome hoặc Edge nhé!");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const koVoice = voices.find((v) => v.lang.includes("ko"));
  if (koVoice) utter.voice = koVoice;

  window.speechSynthesis.speak(utter);
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

/* --------------------------------------------------------------------------
   3. THANH ĐIỀU HƯỚNG THỤT RA THỤT VÀO
   -------------------------------------------------------------------------- */
function setupSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const mainWrapper = document.getElementById("main-wrapper");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const closeBtn = document.getElementById("sidebar-close-btn");

  const toggleMenu = () => {
    const isMobile = window.innerWidth <= 860;
    if (isMobile) {
      sidebar.classList.toggle("mobile-open");
    } else {
      sidebar.classList.toggle("collapsed");
      mainWrapper.classList.toggle("expanded");
    }
  };

  if (toggleBtn) toggleBtn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
}

function renderSidebar() {
  const nav = document.getElementById("topic-nav");
  if (!nav) return;
  let lastBook = "";

  nav.innerHTML = KOREAN_CURRICULUM.map((topic, idx) => {
    const isCurrentTopic = idx === state.topicIndex;
    const bookBadge = topic.book !== lastBook
      ? `<div class="book-divider">${topic.book}</div>`
      : "";
    lastBook = topic.book;

    return `
      ${bookBadge}
      <div class="topic-group ${isCurrentTopic ? "active-topic open" : ""}" id="topic-group-${idx}">
        <button class="topic-header-btn pop-click" onclick="toggleTopicAccordion(${idx})">
          <span>${topic.code}: ${topic.titleVi} (<span class="ko" lang="ko">${topic.titleKo}</span>)</span>
          <span>▾</span>
        </button>
        <div class="topic-sublist">
          <button class="nav-part-btn pop-click ${isCurrentTopic && state.section === "vocab" ? "active" : ""}"
                  onclick="selectLesson(${idx}, 'vocab')">
            <img src="images/icon-vocab.png" alt="" class="nav-part-icon" onerror="this.style.display='none'" />
            <span>1. Từ vựng theo cụm</span>
          </button>
          <button class="nav-part-btn pop-click ${isCurrentTopic && state.section === "grammar" ? "active" : ""}"
                  onclick="selectLesson(${idx}, 'grammar')">
            <img src="images/icon-grammar.png" alt="" class="nav-part-icon" onerror="this.style.display='none'" />
            <span>2. Ngữ pháp &amp; Dịch câu</span>
          </button>
          <button class="nav-part-btn pop-click ${isCurrentTopic && state.section === "skills" ? "active" : ""}"
                  onclick="selectLesson(${idx}, 'skills')">
            <img src="images/icon-skills.png" alt="" class="nav-part-icon" onerror="this.style.display='none'" />
            <span>3. Bốn kỹ năng (Nghe-Nói-Đọc-Viết)</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function toggleTopicAccordion(idx) {
  const el = document.getElementById(`topic-group-${idx}`);
  if (el) el.classList.toggle("open");
}

function selectLesson(topicIdx, sectionName) {
  const topicChanged = state.topicIndex !== topicIdx;
  state.topicIndex = topicIdx;
  state.section = sectionName;

  if (topicChanged) {
    state.vocabIndex = 0;
    state.isFlipped = false;
    state.oxAnswers = {};
    const promptData = KOREAN_CURRICULUM[topicIdx].skills.speaking.aiPrompt;
    state.aiMessages = [
      { sender: "ai", ko: promptData.aiOpeningKo, vi: promptData.aiOpeningVi }
    ];
  }

  if (window.innerWidth <= 860) {
    document.getElementById("sidebar").classList.remove("mobile-open");
  }

  renderSidebar();
  renderMainLesson();
}

/* --------------------------------------------------------------------------
   4. RENDER MÀN HÌNH BÀI HỌC CHÍNH
   -------------------------------------------------------------------------- */
function renderMainLesson() {
  const topic = KOREAN_CURRICULUM[state.topicIndex];
  const breadcrumb = document.getElementById("current-breadcrumb");
  const container = document.getElementById("lesson-container");
  if (!topic || !container) return;

  const sectionNames = {
    vocab: "Phần 1: Từ vựng theo cụm (Flashcard)",
    grammar: "Phần 2: Ngữ pháp & Luyện dịch câu",
    skills: "Phần 3: Bốn kỹ năng (Nghe - Nói - Đọc - Viết)"
  };

  if (breadcrumb) {
    breadcrumb.innerHTML = `${topic.code}: ${topic.titleVi} (<span class="ko" lang="ko">${topic.titleKo}</span>) • <span class="highlight-pink">${sectionNames[state.section]}</span>`;
  }

  if (state.section === "vocab") {
    renderVocabSection(topic, container);
  } else if (state.section === "grammar") {
    renderGrammarSection(topic, container);
  } else {
    renderSkillsSection(topic, container);
  }
}

/* ==========================================================================
   PHẦN 1: TỪ VỰNG THEO CỤM (FLASHCARD KHÔNG ẢNH + PHÁT ÂM)
   ========================================================================== */
function renderVocabSection(topic, container) {
  const list = topic.vocabChunks;
  const card = list[state.vocabIndex];

  container.innerHTML = `
    <div class="section-topbar">
      <h2 class="section-heading">Từ vựng theo cụm - ${topic.code} (<span class="ko" lang="ko">${topic.titleKo}</span>)</h2>
      <span class="highlight-pink">Bấm vào thẻ để lật mặt sau!</span>
    </div>

    <div class="flashcard-stage">
      <div class="flashcard-wrapper ${state.isFlipped ? "flipped" : ""}" onclick="flipFlashcard()">
        <div class="flashcard-inner">
          <!-- MẶT TRƯỚC -->
          <div class="flashcard-face flashcard-front">
            <span class="card-level-pill">${topic.book} • Cụm từ #${state.vocabIndex + 1}</span>

            <div class="vocab-chunk-ko ko" lang="ko">${card.ko}</div>

            <div class="audio-controls">
              <button class="btn btn-primary pop-click" data-speak="${escapeHtmlAttr(card.ko)}" data-rate="0.95">
                🔊 Nghe phát âm chuẩn
              </button>
              <button class="btn btn-pink-outline pop-click" data-speak="${escapeHtmlAttr(card.ko)}" data-rate="0.65">
                🐢 Nghe chậm
              </button>
            </div>
          </div>

          <!-- MẶT SAU -->
          <div class="flashcard-face flashcard-back">
            <div class="vocab-meaning-vi">${card.vi}</div>

            <div class="vocab-breakdown">
              <b>Phân tích cấu tạo cụm:</b><br/>
              ${autoFontKo(card.breakdown)}
            </div>

            <div class="vocab-example-box">
              <div class="ko" lang="ko" style="font-size:1.25rem; font-weight:700;">${card.exampleKo}</div>
              <div style="font-size:0.92rem; margin:4px 0 8px;">${card.exampleVi}</div>
              <button class="btn btn-sm btn-primary pop-click" data-speak="${escapeHtmlAttr(card.exampleKo)}" data-rate="0.92">
                🔊 Nghe câu ví dụ
              </button>
            </div>

            <div style="font-size:0.86rem; color:#F98BC8; font-weight:700;">
              ${autoFontKo(card.importantNote)}
            </div>
          </div>
        </div>
      </div>

      <div class="flashcard-nav">
        <button class="btn pop-click" onclick="changeFlashcard(-1)">← Thẻ trước</button>
        <span class="card-counter">Thẻ ${state.vocabIndex + 1} / ${list.length}</span>
        <button class="btn pop-click" onclick="changeFlashcard(1)">Thẻ tiếp theo →</button>
      </div>
    </div>

    <div class="vocab-grid">
      ${list.map((item, i) => `
        <div class="vocab-mini-card pop-click ${i === state.vocabIndex ? "active-card" : ""}"
             onclick="jumpToFlashcard(${i})">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span class="ko" lang="ko" style="font-size:1.35rem; font-weight:700;">${item.ko}</span>
            <button class="btn btn-sm btn-pink-outline" data-speak="${escapeHtmlAttr(item.ko)}" data-rate="0.95">🔊</button>
          </div>
          <div style="font-weight:700; color:#F98BC8;">${item.vi}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function flipFlashcard() {
  state.isFlipped = !state.isFlipped;
  const el = document.querySelector(".flashcard-wrapper");
  if (el) el.classList.toggle("flipped", state.isFlipped);
}

function changeFlashcard(delta) {
  const len = KOREAN_CURRICULUM[state.topicIndex].vocabChunks.length;
  state.vocabIndex = (state.vocabIndex + delta + len) % len;
  state.isFlipped = false;
  renderMainLesson();
}

function jumpToFlashcard(idx) {
  state.vocabIndex = idx;
  state.isFlipped = false;
  renderMainLesson();
}

/* ==========================================================================
   PHẦN 2: NGỮ PHÁP THEO CHỦ ĐỀ + LUYỆN DỊCH CÂU
   ========================================================================== */
function renderGrammarSection(topic, container) {
  container.innerHTML = `
    <div class="section-topbar">
      <h2 class="section-heading">Ngữ pháp trọng tâm - ${topic.code} (<span class="ko" lang="ko">${topic.titleKo}</span>)</h2>
      <span class="highlight-pink">Màu hồng là quy tắc chia &amp; biến âm cần lưu ý!</span>
    </div>

    <div class="grammar-list">
      ${topic.grammar.map((g) => `
        <article class="grammar-card">
          <div class="grammar-title-row">
            <span class="grammar-pattern">${autoFontKo(g.pattern)}</span>
            <span class="grammar-meaning-tag">${g.meaning}</span>
          </div>
          <p class="grammar-desc">${autoFontKo(g.explanation)}</p>

          <div class="grammar-caution">
            <span class="grammar-caution-label">★ Phần cần lưu ý:</span>
            <span>${autoFontKo(g.caution)}</span>
          </div>

          <div>
            <b style="display:block; margin-bottom:8px;">Ví dụ minh họa:</b>
            ${g.examples.map((ex) => `
              <div class="example-item">
                <div>
                  <div class="ko" lang="ko" style="font-size:1.25rem; font-weight:700;">${ex.ko}</div>
                  <div style="font-size:0.92rem;">${ex.vi}</div>
                </div>
                <button class="btn btn-sm btn-primary pop-click" data-speak="${escapeHtmlAttr(ex.ko)}" data-rate="0.92">🔊 Nghe</button>
              </div>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>

    <section class="practice-box">
      <h3 class="practice-box-title">✎ Luyện tập ngữ pháp: Dịch câu sang tiếng Hàn</h3>
      ${topic.translationExercises.map((ex, idx) => `
        <div class="translate-item">
          <div><b>Câu ${idx + 1}:</b> ${ex.vi}</div>
          <div style="font-size:0.86rem; color:#F98BC8; font-weight:700; margin-top:3px;">
            Gợi ý từ vựng: ${autoFontKo(ex.hint)}
          </div>
          <input type="text" id="trans-input-${idx}" class="ko-input" placeholder="Nhập câu tiếng Hàn của bạn tại đây..." />
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm pop-click" onclick="checkTranslation(${idx})">Kiểm tra đáp án</button>
            <button class="btn btn-pink-outline btn-sm pop-click" data-speak="${escapeHtmlAttr(ex.answerKo)}" data-rate="0.9">🔊 Nghe câu mẫu</button>
          </div>
          <div id="trans-feedback-${idx}"></div>
        </div>
      `).join("")}
    </section>
  `;
}

function checkTranslation(idx) {
  const ex = KOREAN_CURRICULUM[state.topicIndex].translationExercises[idx];
  const userVal = document.getElementById(`trans-input-${idx}`).value.trim();
  const fb = document.getElementById(`trans-feedback-${idx}`);

  const normalize = (s) => s.replace(/[.?!,\s]+/g, "");
  if (!userVal) {
    fb.innerHTML = `<div class="feedback-msg feedback-warn">Bạn hãy nhập câu tiếng Hàn trước khi kiểm tra nhé!</div>`;
    return;
  }

  if (normalize(userVal) === normalize(ex.answerKo)) {
    fb.innerHTML = `
      <div class="feedback-msg feedback-ok">
        🎉 Chính xác tuyệt đối! Đáp án chuẩn: <span class="ko" lang="ko">${ex.answerKo}</span><br/>
        <span style="font-size:0.88rem;">${autoFontKo(ex.note)}</span>
      </div>`;
  } else {
    fb.innerHTML = `
      <div class="feedback-msg feedback-warn">
        💡 Hãy đối chiếu với đáp án chuẩn nhé:<br/>
        • Câu của bạn: <span class="ko" lang="ko">${userVal}</span><br/>
        • Đáp án gợi ý: <span class="ko" lang="ko" style="color:#387CD3;">${ex.answerKo}</span><br/>
        • Lưu ý: ${autoFontKo(ex.note)}
      </div>`;
  }
}

/* ==========================================================================
   PHẦN 3: BỐN KỸ NĂNG (NGHE - NÓI - ĐỌC - VIẾT)
   ========================================================================== */
function renderSkillsSection(topic, container) {
  container.innerHTML = `
    <div class="skills-tabs">
      <button class="skill-tab-btn pop-click ${state.skillTab === "listening" ? "active" : ""}" onclick="switchSkillTab('listening')">🎧 Nghe (<span class="ko" lang="ko">듣기</span>)</button>
      <button class="skill-tab-btn pop-click ${state.skillTab === "speaking" ? "active" : ""}" onclick="switchSkillTab('speaking')">🎙️ Nói (<span class="ko" lang="ko">말하기</span>)</button>
      <button class="skill-tab-btn pop-click ${state.skillTab === "reading" ? "active" : ""}" onclick="switchSkillTab('reading')">📖 Đọc (<span class="ko" lang="ko">읽기</span>)</button>
      <button class="skill-tab-btn pop-click ${state.skillTab === "writing" ? "active" : ""}" onclick="switchSkillTab('writing')">✍️ Viết (<span class="ko" lang="ko">쓰기</span>)</button>
    </div>

    <div id="skill-panel-body" class="skill-panel"></div>
  `;

  const panel = document.getElementById("skill-panel-body");
  if (state.skillTab === "listening") renderListeningSkill(topic.skills.listening, panel);
  if (state.skillTab === "speaking") renderSpeakingSkill(topic.skills.speaking, panel);
  if (state.skillTab === "reading") renderReadingSkill(topic.skills.reading, panel);
  if (state.skillTab === "writing") renderWritingSkill(topic.skills.writing, panel);
}

function switchSkillTab(tab) {
  state.skillTab = tab;
  renderMainLesson();
}

/* --- 3.1 KỸ NĂNG NGHE --- */
function renderListeningSkill(listenData, panel) {
  let blankCounter = 0;

  const sentenceHtml = listenData.dictation.segments.map((seg) => {
    if (typeof seg === "string") {
      return `<span class="ko" lang="ko" style="font-size:1.3rem;">${seg}</span>`;
    }
    const idx = blankCounter++;
    return `<input type="text" id="listen-blank-${idx}" class="blank-input" placeholder="${seg.hint}" />`;
  }).join("");

  panel.innerHTML = `
    <h3 class="section-heading" style="margin-bottom:14px;">${listenData.dictation.title}</h3>
    <div class="audio-player-bar">
      <button class="btn btn-primary pop-click" data-speak="${escapeHtmlAttr(listenData.dictation.audioScript)}" data-rate="0.9">▶ Nghe bài 1</button>
      <button class="btn btn-pink-outline pop-click" data-speak="${escapeHtmlAttr(listenData.dictation.audioScript)}" data-rate="0.68">🐢 Nghe chậm</button>
      <button class="btn btn-sm pop-click" onclick="toggleScript('script-1')">Hiện/Ẩn lời thoại</button>
    </div>
    <div id="script-1" class="note-box" style="display:none;">
      <div class="note-box-title">Lời thoại bài nghe:</div>
      <p class="ko" lang="ko" style="font-size:1.2rem;">${listenData.dictation.audioScript}</p>
    </div>

    <div style="padding:16px; border:2px solid var(--blue-mid); border-radius:14px; margin-bottom:12px; line-height:2.2;">
      ${sentenceHtml}
    </div>
    <button class="btn btn-pink pop-click" onclick="checkListeningBlanks()">Chấm điểm điền từ</button>
    <div id="listen-blank-result" style="margin-bottom:26px;"></div>

    <hr style="border:none; border-top:2.5px dashed var(--pink); margin:22px 0;" />

    <h3 class="section-heading" style="margin-bottom:14px;">${listenData.comprehension.title}</h3>
    <div class="audio-player-bar">
      <button class="btn btn-primary pop-click" data-speak="${escapeHtmlAttr(listenData.comprehension.audioScript)}" data-rate="0.9">▶ Nghe hội thoại bài 2</button>
      <button class="btn btn-pink-outline pop-click" data-speak="${escapeHtmlAttr(listenData.comprehension.audioScript)}" data-rate="0.68">🐢 Nghe chậm</button>
      <button class="btn btn-sm pop-click" onclick="toggleScript('script-2')">Hiện/Ẩn lời thoại</button>
    </div>
    <div id="script-2" class="note-box" style="display:none;">
      <div class="note-box-title">Lời thoại hội thoại:</div>
      <p class="ko" lang="ko" style="font-size:1.2rem;">${listenData.comprehension.audioScript}</p>
    </div>

    <div style="font-weight:700; font-size:1.05rem; margin-bottom:8px;">
      Câu hỏi: <span class="highlight-pink">${listenData.comprehension.question}</span>
    </div>
    <div class="mcq-options">
      ${listenData.comprehension.options.map((opt, i) => `
        <label class="mcq-option-label pop-click">
          <input type="radio" name="listen-mcq" value="${i}" />
          <span>${autoFontKo(opt)}</span>
        </label>
      `).join("")}
    </div>
    <button class="btn btn-primary pop-click" style="margin-top:12px;" onclick="checkListeningMcq()">Kiểm tra đáp án</button>
    <div id="listen-mcq-result"></div>
  `;
}

function toggleScript(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

function checkListeningBlanks() {
  const blanks = KOREAN_CURRICULUM[state.topicIndex].skills.listening.dictation.segments.filter((s) => typeof s === "object");
  let correctCount = 0;
  blanks.forEach((b, i) => {
    const val = document.getElementById(`listen-blank-${i}`).value.trim().replace(/\s+/g, "");
    const ans = b.blank.replace(/\s+/g, "");
    if (val === ans) correctCount++;
  });
  const res = document.getElementById("listen-blank-result");
  const allRight = correctCount === blanks.length;
  res.innerHTML = `
    <div class="feedback-msg ${allRight ? "feedback-ok" : "feedback-warn"}">
      Bạn điền đúng <b>${correctCount}/${blanks.length}</b> chỗ trống!
      ${!allRight ? `Đáp án chuẩn lần lượt là: <span class="ko" lang="ko">${blanks.map((b) => b.blank).join(" / ")}</span>` : "Tuyệt vời!"}
    </div>
  `;
}

function checkListeningMcq() {
  const comp = KOREAN_CURRICULUM[state.topicIndex].skills.listening.comprehension;
  const chosen = document.querySelector('input[name="listen-mcq"]:checked');
  const res = document.getElementById("listen-mcq-result");
  if (!chosen) {
    res.innerHTML = `<div class="feedback-msg feedback-warn">Bạn hãy chọn một đáp án A, B, C hoặc D nhé!</div>`;
    return;
  }
  const isRight = Number(chosen.value) === comp.correctIndex;
  res.innerHTML = `
    <div class="feedback-msg ${isRight ? "feedback-ok" : "feedback-warn"}">
      ${isRight ? "🎉 Chính xác!" : "💡 Chưa chính xác rồi!"} ${autoFontKo(comp.explanation)}
    </div>
  `;
}

/* --- 3.2 KỸ NĂNG NÓI (SHADOWING + AI TUTOR CHẤM CHỮA) --- */
function renderSpeakingSkill(speakData, panel) {
  if (state.aiMessages.length === 0) {
    state.aiMessages = [
      { sender: "ai", ko: speakData.aiPrompt.aiOpeningKo, vi: speakData.aiPrompt.aiOpeningVi }
    ];
  }

  panel.innerHTML = `
    <div class="speaking-grid">
      <div>
        <h3 class="section-heading" style="margin-bottom:10px;">1. Luyện nói đuổi theo giọng mẫu (Shadowing)</h3>
        <div class="note-box">
          <div class="note-box-title">Cách luyện tập:</div>
          <p>Bấm nghe câu mẫu, chú ý ngữ điệu và nối âm, sau đó bấm <b>"🎙️ Bấm để nói"</b> để hệ thống nhận diện phát âm của bạn!</p>
        </div>

        ${speakData.shadowing.map((item, idx) => `
          <div class="translate-item">
            <div class="ko" lang="ko" style="font-size:1.35rem; font-weight:700;">${item.ko}</div>
            <div style="font-size:0.92rem; margin:3px 0;">${item.vi}</div>
            <div style="font-size:0.86rem; color:#F98BC8; font-weight:700; margin-bottom:10px;">
              ★ Lưu ý phát âm: ${autoFontKo(item.tip)}
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-primary pop-click" data-speak="${escapeHtmlAttr(item.ko)}" data-rate="0.92">🔊 Nghe mẫu</button>
              <button class="btn btn-sm btn-pink pop-click" onclick="startShadowingMic(${idx})">🎙️ Bấm để nói</button>
            </div>
            <div id="shadow-res-${idx}"></div>
          </div>
        `).join("")}
      </div>

      <div class="ai-tutor-card">
        <div class="ai-header">
          <div class="ai-avatar">
            <img src="images/mascot-avatar.png" alt="AI Tutor" style="width:100%;height:100%;border-radius:50%;object-fit:cover;"
                 onerror="this.style.display='none'; this.parentElement.textContent='AI';" />
          </div>
          <div>
            <h3 style="color:#F98BC8; font-size:1.2rem;">2. Gia sư AI chấm chữa &amp; Luyện hội thoại</h3>
            <p style="font-size:0.9rem;">Cấu trúc yêu cầu: <b>${autoFontKo(speakData.aiPrompt.structure)}</b> (${speakData.aiPrompt.meaning})</p>
            <p style="font-size:0.85rem; color:#F98BC8; font-weight:700;">Câu mẫu gợi ý: ${autoFontKo(speakData.aiPrompt.sampleAnswer)}</p>
          </div>
        </div>

        <div id="ai-chat-log" class="ai-chat-log">
          ${state.aiMessages.map((m) => `
            <div class="chat-bubble ${m.sender === "ai" ? "chat-ai" : "chat-user"}">
              ${m.ko ? `<div class="ko" lang="ko" style="font-size:1.22rem; font-weight:700;">${m.ko}</div>` : ""}
              ${m.vi ? `<div style="font-size:0.9rem; margin-top:3px;">${autoFontKo(m.vi)}</div>` : ""}
              ${m.sender === "ai" && m.ko ? `<button class="btn btn-sm btn-primary" style="margin-top:6px;" data-speak="${escapeHtmlAttr(m.ko)}" data-rate="0.92">🔊 Nghe AI nói</button>` : ""}
            </div>
          `).join("")}
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <input type="text" id="ai-speak-input" class="ko-input" style="flex:1; margin:0;"
                 placeholder="Nói qua Micro hoặc gõ câu tiếng Hàn của bạn vào đây..." />
          <button class="btn btn-pink-outline pop-click" onclick="recordToAiInput()" title="Nhận diện giọng nói tiếng Hàn">🎙️ Nói</button>
          <button class="btn btn-pink pop-click" onclick="submitToAiTutor()">Gửi AI chấm chữa ➤</button>
        </div>
      </div>
    </div>
  `;
}

function getSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const rec = new SR();
  rec.lang = "ko-KR";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  return rec;
}

function startShadowingMic(idx) {
  const target = KOREAN_CURRICULUM[state.topicIndex].skills.speaking.shadowing[idx].ko;
  const resEl = document.getElementById(`shadow-res-${idx}`);
  const rec = getSpeechRecognition();

  if (!rec) {
    resEl.innerHTML = `<div class="feedback-msg feedback-warn">Trình duyệt chưa hỗ trợ thu âm trực tiếp. Bạn hãy dùng Google Chrome / Edge nhé!</div>`;
    return;
  }

  resEl.innerHTML = `<div class="feedback-msg feedback-ok">🎙️ Đang nghe bạn đọc... Hãy đọc to câu mẫu nhé!</div>`;
  rec.start();

  rec.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    const cleanTarget = target.replace(/[?.!,\s]/g, "");
    const cleanSpoken = spoken.replace(/[?.!,\s]/g, "");
    let matchChars = 0;
    for (const ch of cleanSpoken) {
      if (cleanTarget.includes(ch)) matchChars++;
    }
    const score = Math.min(100, Math.round((matchChars / Math.max(cleanTarget.length, 1)) * 100));

    resEl.innerHTML = `
      <div class="feedback-msg ${score >= 75 ? "feedback-ok" : "feedback-warn"}">
        • Bạn đã đọc: <span class="ko" lang="ko">${spoken}</span><br/>
        • Độ khớp phát âm: <b>${score}%</b> ${score >= 75 ? "🎉 Phát âm rất rõ ràng!" : "💡 Thử đọc chậm và tròn âm hơn một chút nhé!"}
      </div>
    `;
  };

  rec.onerror = () => {
    resEl.innerHTML = `<div class="feedback-msg feedback-warn">Không thu được giọng nói. Kiểm tra quyền Micro của trình duyệt nhé!</div>`;
  };
}

function recordToAiInput() {
  const rec = getSpeechRecognition();
  const input = document.getElementById("ai-speak-input");
  if (!rec) {
    alert("Trình duyệt chưa hỗ trợ thu âm trực tiếp. Bạn có thể gõ câu tiếng Hàn vào ô bên cạnh để AI chấm nhé!");
    return;
  }
  input.placeholder = "🎙️ Đang nghe bạn nói tiếng Hàn...";
  rec.start();
  rec.onresult = (e) => {
    input.value = e.results[0][0].transcript;
    input.placeholder = "Nói qua Micro hoặc gõ câu tiếng Hàn của bạn vào đây...";
  };
}

function evaluateKoreanSentence(sentence, topicId) {
  const notes = [];
  let score = 10;

  if (!/[\uAC00-\uD7AF]/.test(sentence)) {
    return {
      score: 3,
      feedbackVi: "Bạn hãy nhập câu bằng chữ cái tiếng Hàn (Hangul) để AI chấm chi tiết nhé!",
      replyKo: "한국어로 다시 말해 주세요!",
      replyVi: "Bạn hãy thử nói lại bằng tiếng Hàn nhé!"
    };
  }

  if (!/(입니다|아닙니다|습니다|ㅂ니다|아요|어요|해요|이에요|예요|게요|돼요|됩니다)[.?!]?$/.test(sentence.trim())) {
    score -= 2;
    notes.push("Đuôi câu chưa chia lịch sự (nên kết thúc bằng -아요/어요 hoặc -습니다/입니다).");
  }

  if (!sentence.includes(" ") && sentence.length > 7) {
    score -= 1;
    notes.push("Lưu ý quy tắc giãn cách từ (띄어쓰기) giữa các cụm từ.");
  }

  if (topicId === "q2-bai2" && !/(수 있|수 없|러 가|러 오|러 다)/.test(sentence)) {
    score -= 1;
    notes.push("Gợi ý áp dụng đúng ngữ pháp Quyển 2 Bài 2: '-(으)ㄹ 수 있다' hoặc '-(으)러 가다'.");
  } else if (topicId === "q2-bai11" && !/(는데|은데|인데|ㄹ게요|을게요)/.test(sentence)) {
    score -= 1;
    notes.push("Gợi ý áp dụng đúng ngữ pháp Quyển 2 Bài 11: '-(으)ㄴ/는데' hoặc '-(으)ㄹ게요'.");
  } else if (topicId === "q3-bai1" && !/(기 때문에|면서)/.test(sentence)) {
    score -= 1;
    notes.push("Gợi ý áp dụng đúng ngữ pháp Quyển 3 Bài 1: '-기 때문에' hoặc '-(으)면서'.");
  } else if (topicId === "q4-bai1" && !/(는 바람에|다 보면)/.test(sentence)) {
    score -= 1;
    notes.push("Gợi ý áp dụng đúng ngữ pháp Quyển 4 Bài 1: '-는 바람에' hoặc '-다 보면'.");
  }

  const feedbackVi = notes.length === 0
    ? `Điểm AI: ${score}/10 — Câu chuẩn ngữ pháp trung cấp, chia đuôi và tiểu từ rất tự nhiên!`
    : `Điểm AI: ${score}/10 — Cần lưu ý: ${notes.join(" ")}`;

  const followUps = {
    "q2-bai2": { ko: "와, 멋지네요! 그 취미는 누구와 같이 해요?", vi: "Oa, tuyệt quá! Sở thích đó bạn làm cùng với ai thế?" },
    "q2-bai11": { ko: "알겠어요! 그럼 도착하기 전에 문자 보내 줄래요?", vi: "Mình hiểu rồi! Vậy trước khi đến nơi nhắn tin cho mình nhé?" },
    "q3-bai1": { ko: "정말 열심히 생활하네요! 졸업 후에는 어떤 계획을 세웠어요?", vi: "Bạn sống chăm chỉ thật đấy! Sau khi tốt nghiệp bạn có kế hoạch gì chưa?" },
    "q4-bai1": { ko: "맞아요, 계획적인 소비가 중요하죠. 돈을 아끼는 나만의 비법이 있어요?", vi: "Đúng vậy, tiêu dùng có kế hoạch rất quan trọng. Bạn có bí quyết tiết kiệm riêng nào không?" }
  };
  const nextTurn = followUps[topicId] || { ko: "아주 잘했어요! 다음 문장도 만들어 볼까요?", vi: "Rất tốt! Thử đặt thêm một câu nữa nhé?" };

  return { score, feedbackVi, replyKo: nextTurn.ko, replyVi: nextTurn.vi };
}

function submitToAiTutor() {
  const input = document.getElementById("ai-speak-input");
  const text = input.value.trim();
  if (!text) return;

  const topicId = KOREAN_CURRICULUM[state.topicIndex].id;
  state.aiMessages.push({ sender: "user", ko: text });

  const result = evaluateKoreanSentence(text, topicId);
  state.aiMessages.push({
    sender: "ai",
    ko: result.replyKo,
    vi: `${result.feedbackVi} — AI hỏi tiếp: "${result.replyVi}"`
  });

  speakKorean(result.replyKo, 0.92);
  renderMainLesson();
}

/* --- 3.3 KỸ NĂNG ĐỌC (TÍCH O / X) --- */
function renderReadingSkill(readData, panel) {
  panel.innerHTML = `
    <h3 class="section-heading" style="margin-bottom:12px;">${readData.title}</h3>
    <div class="reading-passage ko" lang="ko">
      ${readData.passage}
    </div>

    <table class="ox-table">
      <thead>
        <tr>
          <th>Nội dung câu hỏi</th>
          <th class="ox-choice-cell">Đúng (O)</th>
          <th class="ox-choice-cell">Sai (X)</th>
        </tr>
      </thead>
      <tbody>
        ${readData.statements.map((st, idx) => {
          const picked = state.oxAnswers[idx];
          return `
            <tr>
              <td>${autoFontKo(st.text)}</td>
              <td class="ox-choice-cell">
                <button class="ox-btn pop-click ${picked === true ? "selected-o" : ""}" onclick="pickOx(${idx}, true)">O</button>
              </td>
              <td class="ox-choice-cell">
                <button class="ox-btn pop-click ${picked === false ? "selected-x" : ""}" onclick="pickOx(${idx}, false)">X</button>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>

    <button class="btn btn-primary pop-click" onclick="gradeReadingOx()">Chấm điểm bài đọc</button>
    <div id="reading-ox-result"></div>
  `;
}

function pickOx(idx, val) {
  state.oxAnswers[idx] = val;
  renderMainLesson();
}

function gradeReadingOx() {
  const statements = KOREAN_CURRICULUM[state.topicIndex].skills.reading.statements;
  const res = document.getElementById("reading-ox-result");
  let score = 0;

  const details = statements.map((st, idx) => {
    const picked = state.oxAnswers[idx];
    const ok = picked === st.isTrue;
    if (ok) score++;
    return `
      <div style="margin-top:6px;">
        • Câu ${idx + 1}: ${ok ? "✅ Đúng" : "❌ Sai"} (Đáp án: <b>${st.isTrue ? "O" : "X"}</b>) — ${autoFontKo(st.proof)}
      </div>
    `;
  }).join("");

  res.innerHTML = `
    <div class="feedback-msg ${score === statements.length ? "feedback-ok" : "feedback-warn"}">
      Kết quả đọc hiểu: <b>${score}/${statements.length}</b> câu đúng!
      ${details}
    </div>
  `;
}

/* --- 3.4 KỸ NĂNG VIẾT (GIẤY Ô VUÔNG CHUẨN + CẤU TRÚC HÔ ỨNG + VĂN VIẾT) --- */
function renderWritingSkill(writeData, panel) {
  panel.innerHTML = `
    <div class="writing-subtabs">
      <button class="btn btn-sm pop-click ${state.writingSubTab === "wongoji" ? "btn-pink" : ""}" onclick="switchWritingTab('wongoji')">
        1. Quy tắc giấy ô vuông (<span class="ko" lang="ko">원고지</span>)
      </button>
      <button class="btn btn-sm pop-click ${state.writingSubTab === "structures" ? "btn-pink" : ""}" onclick="switchWritingTab('structures')">
        2. Cấu trúc hô ứng &amp; Từ văn viết
      </button>
      <button class="btn btn-sm pop-click ${state.writingSubTab === "practice" ? "btn-pink" : ""}" onclick="switchWritingTab('practice')">
        3. Luyện viết trực tiếp trên ô vuông
      </button>
    </div>

    <div id="writing-sub-body"></div>
  `;

  const subBody = document.getElementById("writing-sub-body");

  if (state.writingSubTab === "wongoji") {
    subBody.innerHTML = `
      <h3 class="section-heading" style="margin-bottom:12px;">Cẩm nang trình bày giấy ô vuông Hàn Quốc (<span class="ko" lang="ko">원고지 작성법</span>)</h3>
      <div class="wongoji-rules-grid">
        ${WRITING_HANDBOOK.wongojiRules.map((r) => `
          <div class="rule-card ${r.important ? "important-rule" : ""}">
            <div style="font-weight:700; margin-bottom:6px; color:${r.important ? "#F98BC8" : "#387CD3"};">
              ${autoFontKo(r.title)}
            </div>
            <p style="font-size:0.93rem; line-height:1.55;">${autoFontKo(r.content)}</p>
          </div>
        `).join("")}
      </div>
    `;
  } else if (state.writingSubTab === "structures") {
    subBody.innerHTML = `
      <h3 class="section-heading" style="margin-bottom:8px;">Hệ thống cấu trúc hô ứng (<span class="ko" lang="ko">호응 표현</span>)</h3>
      ${WRITING_HANDBOOK.correlativeGroups.map((grp) => `
        <div class="structure-group-title">${grp.groupName}</div>
        <div class="grammar-list" style="margin-bottom:14px;">
          ${grp.items.map((c) => `
            <div class="rule-card important-rule">
              <div style="font-weight:700; font-size:1.2rem; color:#F98BC8;">${autoFontKo(c.pattern)}</div>
              <div style="font-weight:700; margin:4px 0;">Ý nghĩa: ${c.meaning}</div>
              <div class="ko" lang="ko" style="font-size:1.2rem;">${c.exampleKo}</div>
              <div style="font-size:0.9rem;">${c.exampleVi}</div>
            </div>
          `).join("")}
        </div>
      `).join("")}

      <h3 class="section-heading" style="margin:20px 0 12px;">Bảng đối chiếu Văn nói vs. Từ chỉ dùng trong Văn viết (<span class="ko" lang="ko">문어체</span>)</h3>
      <table class="ox-table">
        <thead>
          <tr>
            <th>Văn nói (<span class="ko" lang="ko">구어체</span>)</th>
            <th style="color:#F98BC8;">Văn viết chuẩn (<span class="ko" lang="ko">문어체</span> - Cần lưu ý)</th>
          </tr>
        </thead>
        <tbody>
          ${WRITING_HANDBOOK.writtenVsSpoken.map((row) => `
            <tr>
              <td>${autoFontKo(row.spoken)}</td>
              <td style="font-weight:700; color:#F98BC8;">${autoFontKo(row.written)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } else {
    subBody.innerHTML = `
      <div class="note-box">
        <div class="note-box-title">${autoFontKo(writeData.topicTitle)}</div>
        <p><b>Yêu cầu sử dụng:</b> <span class="highlight-pink">${writeData.requiredStructures.map(autoFontKo).join(" • ")}</span></p>
        <p style="margin-top:4px; font-size:0.88rem;">★ Hệ thống tự động áp dụng chuẩn <span class="ko" lang="ko">원고지</span>: lùi 1 ô đầu dòng, không bỏ ô trống sau dấu <b>(.)</b> và <b>(,)</b>, và giữ dấu câu ở cuối dòng trên thay vì rớt xuống đầu dòng mới.</p>
      </div>

      <textarea id="wongoji-input" class="wongoji-textarea" oninput="updateWongojiGrid()"
                placeholder="Gõ đoạn văn tiếng Hàn tại đây...">${writeData.sampleEssay}</textarea>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:10px;">
        <span id="wongoji-char-count" style="font-weight:700; color:#F98BC8;">Số ô đã dùng: 0 ô</span>
        <button class="btn btn-primary btn-sm pop-click" onclick="checkWritingStyle()">Kiểm tra văn viết &amp; cấu trúc</button>
      </div>
      <div id="writing-check-result"></div>

      <div id="wongoji-grid-preview" class="wongoji-paper" aria-label="Giấy ô vuông Hàn Quốc"></div>
    `;
    updateWongojiGrid();
  }
}

function switchWritingTab(sub) {
  state.writingSubTab = sub;
  renderMainLesson();
}

function updateWongojiGrid() {
  const textarea = document.getElementById("wongoji-input");
  const grid = document.getElementById("wongoji-grid-preview");
  const counter = document.getElementById("wongoji-char-count");
  if (!textarea || !grid) return;

  const rawText = textarea.value;
  const cols = window.innerWidth <= 860 ? 10 : 20;

  const cells = [{ char: "", type: "indent" }]; // Lùi 1 ô đầu dòng
  let lastNonSpaceChar = "";

  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i];

    // 1. Xuống dòng đoạn mới -> lấp đầy dòng hiện tại và lùi 1 ô ở dòng mới
    if (ch === "\n") {
      while (cells.length % cols !== 0) {
        cells.push({ char: "", type: "empty" });
      }
      cells.push({ char: "", type: "indent" });
      lastNonSpaceChar = "";
      continue;
    }

    // 2. Xử lý dấu cách (띄어쓰기)
    if (ch === " ") {
      // KHÔNG bỏ trống ô sau dấu chấm (.) và dấu phẩy (,)
      if (lastNonSpaceChar === "." || lastNonSpaceChar === ",") {
        continue;
      }
      // Dấu cách rơi vào ô đầu tiên của dòng mới thì bỏ qua
      if (cells.length % cols === 0) {
        continue;
      }
      cells.push({ char: " ", type: "space" });
      continue;
    }

    // 3. Quy tắc cấm đầu dòng: dấu câu KHÔNG BAO GIỜ rớt xuống ô đầu dòng mới
    const lineStartProhibited = [".", ",", "?", "!", ")", "]", "}", "”", "’"];
    if (lineStartProhibited.includes(ch) && cells.length % cols === 0 && cells.length > 0) {
      cells[cells.length - 1].char += ch;
      cells[cells.length - 1].merged = true;
      lastNonSpaceChar = ch;
      continue;
    }

    // 4. Dấu chấm (.) và dấu phẩy (,) đặt ở góc dưới bên trái ô vuông
    if (ch === "." || ch === ",") {
      cells.push({ char: ch, type: "punct-corner" });
      lastNonSpaceChar = ch;
      continue;
    }

    // 5. Dấu chấm hỏi (?) và chấm than (!) đặt giữa ô vuông
    if (ch === "?" || ch === "!") {
      cells.push({ char: ch, type: "punct-center" });
      lastNonSpaceChar = ch;
      continue;
    }

    // 6. Số có 2 chữ số viết ghép vào cùng 1 ô vuông
    if (/\d/.test(ch) && i + 1 < rawText.length && /\d/.test(rawText[i + 1]) && (i + 2 >= rawText.length || !/\d/.test(rawText[i + 2]))) {
      cells.push({ char: ch + rawText[i + 1], type: "char" });
      lastNonSpaceChar = rawText[i + 1];
      i++;
      continue;
    }

    // 7. Ký tự chữ thông thường
    cells.push({ char: ch, type: "char" });
    lastNonSpaceChar = ch;
  }

  counter.textContent = `Tổng số ô sử dụng trên 원고지: ${cells.length} ô`;

  const totalCells = Math.max(cols * 6, Math.ceil(cells.length / cols) * cols);
  let html = "";
  for (let i = 0; i < totalCells; i++) {
    const cell = cells[i] || { char: "", type: "empty" };
    const classes = ["wongoji-cell"];
    if (cell.type === "space") classes.push("space-cell");
    if (cell.type === "punct-corner") classes.push("punct-corner");
    if (cell.merged) classes.push("merged-punct");

    const displayChar = cell.type === "space" ? "␣" : cell.char;
    html += `<div class="${classes.join(" ")}">${displayChar}</div>`;
  }
  grid.innerHTML = html;
}

function checkWritingStyle() {
  const text = document.getElementById("wongoji-input").value.trim();
  const res = document.getElementById("writing-check-result");
  const warnings = [];

  if (/저는|저의|제가/.test(text)) {
    warnings.push("Phát hiện từ văn nói '저는/제가' — trong văn viết phải đổi thành '나는/내가'.");
  }
  if (/우리 나라/.test(text)) {
    warnings.push("Trong văn viết chuẩn, '우리나라' viết liền không có dấu cách.");
  }
  if (/아요|어요|해요|습니다|았어요|었어요/.test(text)) {
    warnings.push("Phát hiện đuôi văn nói (-아요/어요/습니다) — hãy đổi sang đuôi văn viết (-는다/ㄴ다/다/이다).");
  }
  if (!/(반면에|때문에|뿐만 아니라|그러므로|따라서|지라도|바람에|인해|불구하고|위해서는|다 보면)/.test(text)) {
    warnings.push("Bạn nên dùng ít nhất 1 cấu trúc hô ứng (ví dụ: 왜냐하면 ~기 때문이다, ~는 반면에, ~뿐만 아니라 ~도, 그러므로) để bài viết mạch lạc.");
  }

  res.innerHTML = warnings.length === 0
    ? `<div class="feedback-msg feedback-ok">🎉 Tuyệt vời! Bài viết chuẩn văn phong <span class="ko" lang="ko">문어체</span>, cấu trúc hô ứng và quy tắc <span class="ko" lang="ko">원고지</span>!</div>`
    :
