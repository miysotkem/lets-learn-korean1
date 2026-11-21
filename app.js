document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 0. PHÁT ÂM TIẾNG HÀN
  // =========================================================================
  function speakKorean(text, rate = 1.0) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }
  window._speak = (txt) => speakKorean(txt, 0.95);

  // Trạng thái hiện tại
  let activeMainTab = "vocab";
  let vocabTopicIdx = 0;
  let vocabCardIdx = 0;
  let isFlipped = false;
  let vocabMode = "flashcard";

  let grammarSectionIdx = 0;

  let activeSkill = "listening";
  let listeningModeIdx = 0;
  let speakingMode = "shadowing";
  let writingMode = "practice";

  // =========================================================================
  // 1. THANH MENU Ở CẠNH TRÁI (TỰ ĐỘNG CẬP NHẬT THEO TAB ĐANG CHỌN)
  // =========================================================================
  function renderSidebar() {
    const heading = document.getElementById("sidebar-heading");
    const menu = document.getElementById("sidebar-menu");
    menu.innerHTML = "";

    if (activeMainTab === "vocab") {
      heading.textContent = "Chủ đề từ vựng";
      STUDY_DATA.vocabTopics.forEach((topic, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `wire-box side-btn ${idx === vocabTopicIdx ? "active" : ""}`;
        btn.textContent = topic.title;
        btn.addEventListener("click", () => {
          vocabTopicIdx = idx;
          vocabCardIdx = 0;
          isFlipped = false;
          renderSidebar();
          renderVocab();
        });
        menu.appendChild(btn);
      });
    } else if (activeMainTab === "grammar") {
      heading.textContent = "Mục ngữ pháp";
      STUDY_DATA.grammarSections.forEach((sec, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `wire-box side-btn ${idx === grammarSectionIdx ? "active" : ""}`;
        btn.textContent = sec.title;
        btn.addEventListener("click", () => {
          grammarSectionIdx = idx;
          renderSidebar();
          renderGrammar();
        });
        menu.appendChild(btn);
      });
    } else if (activeMainTab === "skills") {
      if (activeSkill === "listening") {
        heading.textContent = "Dạng bài nghe";
        STUDY_DATA.skills.listening.modes.forEach((m, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `wire-box side-btn ${idx === listeningModeIdx ? "active" : ""}`;
          btn.textContent = m.label;
          btn.addEventListener("click", () => {
            listeningModeIdx = idx;
            renderSidebar();
            renderListening();
          });
          menu.appendChild(btn);
        });
      } else if (activeSkill === "speaking") {
        heading.textContent = "Phương pháp nói";
        STUDY_DATA.skills.speaking.modes.forEach((m) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `wire-box side-btn ${m.id === speakingMode ? "active" : ""}`;
          btn.textContent = m.label;
          btn.addEventListener("click", () => {
            speakingMode = m.id;
            renderSidebar();
            renderSpeaking();
          });
          menu.appendChild(btn);
        });
      } else if (activeSkill === "reading") {
        heading.textContent = "Bài đọc";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "wire-box side-btn active";
        btn.textContent = "Tích Đúng / Sai (O/X)";
        menu.appendChild(btn);
      } else if (activeSkill === "writing") {
        heading.textContent = "Phần luyện viết";
        STUDY_DATA.skills.writing.modes.forEach((m) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `wire-box side-btn ${m.id === writingMode ? "active" : ""}`;
          btn.textContent = m.label;
          btn.addEventListener("click", () => {
            writingMode = m.id;
            renderSidebar();
            renderWriting();
          });
          menu.appendChild(btn);
        });
      }
    }
  }

  // =========================================================================
  // 2. CHUYỂN 3 TAB CHÍNH
  // =========================================================================
  document.querySelectorAll(".main-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".main-tab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      activeMainTab = btn.dataset.tab;
      document.getElementById(`tab-${activeMainTab}`).classList.add("active");
      renderSidebar();
    });
  });

  // =========================================================================
  // 3. TAB TỪ VỰNG (FLASHCARD + QUIZ)
  // =========================================================================
  function renderVocab() {
    const topic = STUDY_DATA.vocabTopics[vocabTopicIdx];
    const flashView = document.getElementById("vocab-flashcard-view");
    const quizView = document.getElementById("vocab-quiz-view");

    if (vocabMode === "flashcard") {
      flashView.classList.remove("hidden");
      quizView.classList.add("hidden");

      const card = topic.items[vocabCardIdx];
      document.getElementById("vocab-counter").textContent = `${vocabCardIdx + 1} / ${topic.items.length}`;
      document.getElementById("vocab-chunk").textContent = card.chunk;
      document.getElementById("vocab-meaning").textContent = card.meaning;
      document.getElementById("vocab-example-ko").textContent = card.exampleKo;
      document.getElementById("vocab-example-vi").textContent = card.exampleVi;
      document.getElementById("vocab-note").textContent = card.note;

      document.getElementById("card-front").classList.toggle("hidden", isFlipped);
      document.getElementById("card-back").classList.toggle("hidden", !isFlipped);

      const imgEl = document.getElementById("vocab-img");
      const phEl = document.getElementById("vocab-img-placeholder");
      if (card.pinterestImg) {
        imgEl.src = card.pinterestImg;
        imgEl.classList.remove("hidden");
        phEl.classList.add("hidden");
      } else {
        imgEl.classList.add("hidden");
        phEl.classList.remove("hidden");
      }
    } else {
      flashView.classList.add("hidden");
      quizView.classList.remove("hidden");
      const item = topic.items[vocabCardIdx];
      quizView.innerHTML = `
        <div class="wire-box prompt-box">
          <p style="margin:0 0 8px;">Nghĩa của cụm từ sau là gì?</p>
          <p class="ko big-word">${item.chunk}</p>
          <button type="button" class="wire-box mini-btn" onclick="window._speak('${item.chunk}')">🔊 Nghe phát âm</button>
        </div>
        <div class="stack-list">
          ${topic.items.map((opt, i) => `
            <div class="wire-box stack-card clickable" data-qidx="${i}">${opt.meaning}</div>
          `).join("")}
        </div>
      `;
      quizView.querySelectorAll(".stack-card").forEach((el) => {
        el.addEventListener("click", () => {
          const picked = Number(el.dataset.qidx);
          el.classList.add(picked === vocabCardIdx ? "correct" : "wrong");
        });
      });
    }
  }

  document.querySelectorAll("[data-vmode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-vmode]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      vocabMode = btn.dataset.vmode;
      renderVocab();
    });
  });

  document.getElementById("btn-flip-vocab").addEventListener("click", () => {
    isFlipped = !isFlipped;
    renderVocab();
  });
  document.getElementById("btn-speak-vocab").addEventListener("click", () => {
    speakKorean(STUDY_DATA.vocabTopics[vocabTopicIdx].items[vocabCardIdx].chunk, 0.95);
  });
  document.getElementById("btn-speak-example").addEventListener("click", () => {
    speakKorean(STUDY_DATA.vocabTopics[vocabTopicIdx].items[vocabCardIdx].exampleKo, 0.95);
  });
  document.getElementById("btn-prev-vocab").addEventListener("click", () => {
    const len = STUDY_DATA.vocabTopics[vocabTopicIdx].items.length;
    vocabCardIdx = (vocabCardIdx - 1 + len) % len;
    isFlipped = false;
    renderVocab();
  });
  document.getElementById("btn-next-vocab").addEventListener("click", () => {
    const len = STUDY_DATA.vocabTopics[vocabTopicIdx].items.length;
    vocabCardIdx = (vocabCardIdx + 1) % len;
    isFlipped = false;
    renderVocab();
  });
  document.getElementById("btn-apply-pinterest").addEventListener("click", () => {
    const url = document.getElementById("pinterest-url-input").value.trim();
    if (!url) return;
    STUDY_DATA.vocabTopics[vocabTopicIdx].items[vocabCardIdx].pinterestImg = url;
    document.getElementById("pinterest-url-input").value = "";
    renderVocab();
  });

  // =========================================================================
  // 4. TAB NGỮ PHÁP (GIỐNG ẢNH 3: CÁC THẺ XẾP DỌC + KHUNG VÍ DỤ LỒNG BÊN TRONG)
  // =========================================================================
  function renderGrammar() {
    const stack = document.getElementById("grammar-stack");
    const section = STUDY_DATA.grammarSections[grammarSectionIdx];
    stack.innerHTML = "";

    if (section.isPractice) {
      section.cloze.forEach((ex, i) => {
        const card = document.createElement("div");
        card.className = "wire-box stack-card";
        card.innerHTML = `
          <p class="ko" style="margin:0 0 10px;"><strong>Đục lỗ ${i + 1}:</strong> ${ex.question}</p>
          <div class="pinterest-bar">
            <input type="text" id="cloze-in-${i}" placeholder="Nhập từ còn thiếu..." />
            <button type="button" id="cloze-btn-${i}" class="wire-box mini-btn">Kiểm tra</button>
          </div>
          <p id="cloze-out-${i}" class="note" style="margin:8px 0 0;"></p>
        `;
        stack.appendChild(card);
        document.getElementById(`cloze-btn-${i}`).addEventListener("click", () => {
          const val = document.getElementById(`cloze-in-${i}`).value.trim();
          document.getElementById(`cloze-out-${i}`).textContent =
            val === ex.answer ? `Chính xác! ${ex.note}` : `Đáp án là "${ex.answer}". ${ex.note}`;
        });
      });

      section.translate.forEach((ex, i) => {
        const card = document.createElement("div");
        card.className = "wire-box stack-card";
        card.innerHTML = `
          <p style="margin:0 0 10px;"><strong>Dịch câu ${i + 1}:</strong> ${ex.vi}</p>
          <div class="pinterest-bar">
            <input type="text" id="trans-in-${i}" placeholder="Nhập câu tiếng Hàn..." />
            <button type="button" id="trans-btn-${i}" class="wire-box mini-btn">Đáp án</button>
          </div>
          <p id="trans-out-${i}" class="note" style="margin:8px 0 0;"></p>
        `;
        stack.appendChild(card);
        document.getElementById(`trans-btn-${i}`).addEventListener("click", () => {
          document.getElementById(`trans-out-${i}`).innerHTML =
            `Đáp án mẫu: <span class="ko">${ex.answerKo}</span> (${ex.note})`;
        });
      });
      return;
    }

    section.items.forEach((g) => {
      const suggestionsHtml = g.suggestions
        ? `<ul style="margin:10px 0 0; padding-left:20px;">${g.suggestions.map((s) => `<li>${s}</li>`).join("")}</ul>`
        : "";

      stack.innerHTML += `
        <div class="wire-box stack-card ibis-slot" data-slot="images/grammar-card.png">
          <h3 class="ko" style="margin:0 0 6px; font-size:22px;">${g.form}</h3>
          <p style="margin:0 0 10px;"><strong>Ý nghĩa:</strong> ${g.meaning}</p>

          <div class="wire-box inner-box">
            <p class="ko" style="margin:0 0 6px; font-size:20px;">${g.exampleKo}</p>
            <p style="margin:0 0 10px;">${g.exampleVi}</p>
            <button type="button" class="wire-box mini-btn" onclick="window._speak('${g.exampleKo}')">🔊 Nghe ví dụ</button>
          </div>

          ${suggestionsHtml}
          <p class="note" style="margin:10px 0 0;">${g.note}</p>
        </div>
      `;
    });
  }

  // =========================================================================
  // 5. TAB 4 KỸ NĂNG
  // =========================================================================
  document.querySelectorAll("#skills-sub-nav .sub-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#skills-sub-nav .sub-tab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".skill-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      activeSkill = btn.dataset.skill;
      document.getElementById(`skill-${activeSkill}`).classList.add("active");
      renderSidebar();
    });
  });

  // 5.1 NGHE (Giống hệt ảnh 1)
  function renderListening() {
    const mode = STUDY_DATA.skills.listening.modes[listeningModeIdx];
    const titleEl = document.getElementById("listening-title");
    const stack = document.getElementById("listening-stack");
    titleEl.textContent = mode.title;
    stack.innerHTML = "";

    if (mode.id === "choice") {
      const noteCard = document.createElement("div");
      noteCard.className = "wire-box stack-card note-card note hidden";

      mode.options.forEach((opt, idx) => {
        const card = document.createElement("div");
        card.className = "wire-box stack-card clickable";
        card.textContent = opt;
        card.addEventListener("click", () => {
          stack.querySelectorAll(".stack-card").forEach((c) => c.classList.remove("correct", "wrong"));
          card.classList.add(idx === mode.correctIndex ? "correct" : "wrong");
          noteCard.textContent = (idx === mode.correctIndex ? "Chính xác! " : "Chưa đúng! ") + mode.note;
          noteCard.classList.remove("hidden");
        });
        stack.appendChild(card);
      });
      stack.appendChild(noteCard);
    } else {
      stack.innerHTML = `
        <div class="wire-box stack-card" style="text-align:center;">
          <p class="ko" style="font-size:22px; margin:0;">${mode.maskedSentence}</p>
        </div>
        <div class="wire-box stack-card pinterest-bar">
          <input type="text" id="listen-fill-in" placeholder="Nhập từ nghe được..." />
          <button type="button" id="listen-fill-btn" class="wire-box mini-btn">Kiểm tra</button>
        </div>
        <div id="listen-fill-note" class="wire-box stack-card note-card note hidden"></div>
      `;
      document.getElementById("listen-fill-btn").addEventListener("click", () => {
        const val = document.getElementById("listen-fill-in").value.trim();
        const noteEl = document.getElementById("listen-fill-note");
        noteEl.textContent =
          val === mode.answer ? `Chính xác! ${mode.note}` : `Đáp án đúng: "${mode.answer}". ${mode.note}`;
        noteEl.classList.remove("hidden");
      });
    }
  }

  document.getElementById("btn-play-listening").addEventListener("click", () => {
    speakKorean(STUDY_DATA.skills.listening.modes[listeningModeIdx].audioText, 0.9);
  });

  // 5.2 NÓI (Shadowing + AI chấm chữa)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function renderSpeaking() {
    const stack = document.getElementById("speaking-stack");
    stack.innerHTML = "";

    if (speakingMode === "shadowing") {
      STUDY_DATA.skills.speaking.shadowing.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "wire-box stack-card";
        card.innerHTML = `
          <p class="ko" style="font-size:21px; margin:0 0 6px;">${item.ko}</p>
          <p style="margin:0 0 8px;">${item.vi}</p>
          <p class="note" style="margin:0 0 12px;">${item.note}</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button type="button" id="sh-play-${idx}" class="wire-box mini-btn">🔊 Nghe mẫu</button>
            <button type="button" id="sh-mic-${idx}" class="wire-box mini-btn">🎙️ Nhại lại</button>
          </div>
          <p id="sh-out-${idx}" class="note" style="margin:8px 0 0;"></p>
        `;
        stack.appendChild(card);

        document.getElementById(`sh-play-${idx}`).addEventListener("click", () => speakKorean(item.ko, 0.9));
        document.getElementById(`sh-mic-${idx}`).addEventListener("click", () => {
          const out = document.getElementById(`sh-out-${idx}`);
          if (!SpeechRecognition) {
            out.textContent = "Trình duyệt chưa hỗ trợ Micro (Hãy dùng Chrome/Edge).";
            return;
          }
          const rec = new SpeechRecognition();
          rec.lang = "ko-KR";
          out.textContent = "Đang nghe giọng bạn...";
          rec.start();
          rec.onresult = (e) => {
            out.innerHTML = `Bạn đã nói: "<span class="ko">${e.results[0][0].transcript}</span>"`;
          };
        });
      });
    } else {
      const p = STUDY_DATA.skills.speaking.aiPrompt;
      stack.innerHTML = `
        <div class="wire-box stack-card">
          <strong>Cấu trúc:</strong> <span class="ko">${p.structure}</span>
          <p style="margin:6px 0 0;">${p.situation}</p>
        </div>
        <div class="wire-box stack-card">
          <textarea id="ai-sentence-in" rows="2" placeholder="Nhập hoặc bấm Micro để nói câu của bạn..."></textarea>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button type="button" id="ai-mic-btn" class="wire-box mini-btn">🎙️ Nói</button>
            <button type="button" id="ai-check-btn" class="wire-box mini-btn">✨ AI Chấm chữa</button>
          </div>
        </div>
        <div class="wire-box stack-card pinterest-bar">
          <input type="password" id="gemini-key-in" placeholder="Gemini API Key (Tùy chọn để AI đối đáp tự do)..." />
          <button type="button" id="save-key-btn" class="wire-box mini-btn">Lưu Key</button>
        </div>
        <div id="ai-feedback-card" class="wire-box stack-card note-card note hidden" style="white-space:pre-line;"></div>
      `;

      const saved = localStorage.getItem("gemini_api_key");
      if (saved) document.getElementById("gemini-key-in").value = saved;

      document.getElementById("save-key-btn").addEventListener("click", () => {
        localStorage.setItem("gemini_api_key", document.getElementById("gemini-key-in").value.trim());
        alert("Đã lưu API Key!");
      });

      document.getElementById("ai-mic-btn").addEventListener("click", () => {
        if (!SpeechRecognition) return alert("Trình duyệt không hỗ trợ Micro.");
        const rec = new SpeechRecognition();
        rec.lang = "ko-KR";
        rec.start();
        rec.onresult = (e) => {
          document.getElementById("ai-sentence-in").value = e.results[0][0].transcript;
        };
      });

      document.getElementById("ai-check-btn").addEventListener("click", async () => {
        const text = document.getElementById("ai-sentence-in").value.trim();
        const fb = document.getElementById("ai-feedback-card");
        if (!text) return;
        fb.classList.remove("hidden");
        fb.textContent = "Đang chấm chữa...";

        const key = localStorage.getItem("gemini_api_key");
        if (key) {
          try {
            const res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{
                    parts: [{
                      text: `Giáo viên tiếng Hàn nhận xét ngắn gọn câu "${text}" (yêu cầu dùng "${p.structure}") bằng tiếng Việt, sau đó đáp lại 1 câu tiếng Hàn tự nhiên.`
                    }]
                  }]
                })
              }
            );
            const data = await res.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              fb.textContent = reply;
              return;
            }
          } catch (e) {}
        }

        if (text.includes(p.requiredToken)) {
          fb.textContent = `Chuẩn cấu trúc "${p.structure}"!\nAI phản hồi: 와, 정말요? 저도 한번 해 보고 싶어요!`;
          speakKorean("와, 정말요? 저도 한번 해 보고 싶어요!", 0.95);
        } else {
          fb.textContent = `Lưu ý: Câu chưa có cụm "${p.requiredToken}".\nCâu mẫu: ${p.sampleAnswer}`;
        }
      });
    }
  }

  // 5.3 ĐỌC (Tích O / X)
  function renderReading() {
    const r = STUDY_DATA.skills.reading;
    document.getElementById("reading-title").textContent = r.title;
    document.getElementById("reading-passage").textContent = r.passage;

    const stack = document.getElementById("reading-stack");
    stack.innerHTML = "";
    r.statements.forEach((st, idx) => {
      const card = document.createElement("div");
      card.className = "wire-box stack-card";
      card.innerHTML = `
        <p class="ko" style="margin:0 0 10px;">${st.text}</p>
        <div style="display:flex; gap:10px;">
          <button type="button" class="wire-box mini-btn" data-ans="true">O (Đúng)</button>
          <button type="button" class="wire-box mini-btn" data-ans="false">X (Sai)</button>
        </div>
        <p id="read-note-${idx}" class="note hidden" style="margin:8px 0 0;"></p>
      `;
      stack.appendChild(card);

      card.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const picked = btn.dataset.ans === "true";
          const noteEl = document.getElementById(`read-note-${idx}`);
          card.classList.remove("correct", "wrong");
          card.classList.add(picked === st.isTrue ? "correct" : "wrong");
          noteEl.textContent = (picked === st.isTrue ? "Chính xác! " : "Chưa đúng! ") + st.note;
          noteEl.classList.remove("hidden");
        });
      });
    });
  }

  // 5.4 VIẾT (Giấy ô vuông & Kiến thức văn viết)
  function renderWriting() {
    const stack = document.getElementById("writing-stack");
    stack.innerHTML = "";

    if (writingMode === "practice") {
      stack.innerHTML = `
        <div class="wire-box stack-card note-card note">
          Lưu ý: Không dùng từ văn nói (저, 그리고, 하지만, đuôi -아요/어요) khi viết bài trên giấy ô vuông.
        </div>
        <div class="wire-box stack-card">
          <textarea id="wongoji-in" rows="3" placeholder="Nhập đoạn văn tiếng Hàn để đổ vào giấy ô vuông..."></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
            <button type="button" id="btn-wongoji" class="wire-box mini-btn">Đổ vào ô vuông & Kiểm tra</button>
            <span id="wongoji-count">0 ký tự</span>
          </div>
        </div>
        <div id="wongoji-warn" class="wire-box stack-card note-card note hidden"></div>
        <div class="wire-box stack-card">
          <div id="wongoji-grid" class="wongoji-grid"></div>
        </div>
      `;

      document.getElementById("btn-wongoji").addEventListener("click", () => {
        const txt = document.getElementById("wongoji-in").value;
        document.getElementById("wongoji-count").textContent = `${txt.length} ký tự`;

        const warns = [];
        if (/(저는|제가|저를|저도)/.test(txt)) warns.push("Dùng '나' thay cho '저'");
        if (/(아요|어요|해요)/.test(txt)) warns.push("Chuyển đuôi '-아요/어요' sang '-는다/ㄴ다/다'");
        if (txt.includes("그리고")) warns.push("Thay '그리고' bằng '또한/아울러'");
        if (txt.includes("하지만")) warns.push("Thay '하지만' bằng '그러나/반면에'");

        const warnEl = document.getElementById("wongoji-warn");
        warnEl.textContent = warns.length ? "Lưu ý lỗi văn nói: " + warns.join(" | ") : "Tốt! Đúng văn phong viết.";
        warnEl.classList.remove("hidden");

        const chars = Array.from(txt);
        const total = Math.max(80, Math.ceil(chars.length / 20) * 20);
        const grid = document.getElementById("wongoji-grid");
        grid.innerHTML = "";
        for (let i = 0; i < total; i++) {
          const cell = document.createElement("div");
          cell.className = "wongoji-cell";
          cell.textContent = chars[i] || "";
          grid.appendChild(cell);
        }
      });
    } else {
      const wg = STUDY_DATA.skills.writing;
      stack.innerHTML = `
        <div class="wire-box stack-card">
          <strong>1. Quy tắc viết giấy ô vuông (원고지)</strong>
          <ul style="margin:8px 0 0; padding-left:20px;">${wg.wongojiRules.map((r) => `<li>${r}</li>`).join("")}</ul>
        </div>
        <div class="wire-box stack-card">
          <strong>2. Cấu trúc hô ứng văn viết</strong>
          <ul class="ko" style="margin:8px 0 0; padding-left:20px;">${wg.correlativeStructures.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
        <div class="wire-box stack-card note-card">
          <strong class="note">3. Từ vựng chỉ dùng trong văn viết (Lưu ý chuyển đổi)</strong>
          <ul class="ko note" style="margin:8px 0 0; padding-left:20px;">${wg.writtenWords.map((w) => `<li>${w}</li>`).join("")}</ul>
        </div>
      `;
    }
  }

  // Khởi chạy lần đầu
  renderSidebar();
  renderVocab();
  renderGrammar();
  renderListening();
  renderSpeaking();
  renderReading();
  renderWriting();
});
