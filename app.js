document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 0. TIỆN ÍCH PHÁT ÂM TIẾNG HÀN (WEB SPEECH API)
  // =========================================================================
  function speakKorean(text, rate = 1.0) {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ đọc giọng nói.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }

  // =========================================================================
  // 1. ĐIỀU HƯỚNG 3 PHẦN CHÍNH
  // =========================================================================
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });

  // =========================================================================
  // 2. PHẦN TỪ VỰNG (FLASHCARD THEO CỤM + PHÁT ÂM + ẢNH PINTEREST)
  // =========================================================================
  let currentTopicIdx = 0;
  let currentCardIdx = 0;

  const vocabTopicSelect = document.getElementById("vocab-topic-select");
  STUDY_DATA.vocabTopics.forEach((topic, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = topic.title;
    vocabTopicSelect.appendChild(opt);
  });

  function renderFlashcard() {
    const topic = STUDY_DATA.vocabTopics[currentTopicIdx];
    const card = topic.items[currentCardIdx];

    document.getElementById("flashcard-front").classList.remove("hidden");
    document.getElementById("flashcard-back").classList.add("hidden");

    document.getElementById("vocab-chunk").textContent = card.chunk;
    document.getElementById("vocab-meaning").textContent = card.meaning;
    document.getElementById("vocab-example-ko").textContent = card.exampleKo;
    document.getElementById("vocab-example-vi").textContent = card.exampleVi;
    document.getElementById("vocab-note").textContent = card.note;
    document.getElementById("vocab-counter").textContent = `${currentCardIdx + 1} / ${topic.items.length}`;

    const imgEl = document.getElementById("vocab-img");
    const placeholderEl = document.getElementById("vocab-img-placeholder");
    if (card.pinterestImg) {
      imgEl.src = card.pinterestImg;
      imgEl.classList.remove("hidden");
      placeholderEl.classList.add("hidden");
    } else {
      imgEl.src = "";
      imgEl.classList.add("hidden");
      placeholderEl.classList.remove("hidden");
    }
  }

  vocabTopicSelect.addEventListener("change", (e) => {
    currentTopicIdx = Number(e.target.value);
    currentCardIdx = 0;
    renderFlashcard();
  });

  document.getElementById("btn-flip-card").addEventListener("click", () => {
    document.getElementById("flashcard-front").classList.add("hidden");
    document.getElementById("flashcard-back").classList.remove("hidden");
  });

  document.getElementById("btn-flip-back").addEventListener("click", () => {
    document.getElementById("flashcard-back").classList.add("hidden");
    document.getElementById("flashcard-front").classList.remove("hidden");
  });

  document.getElementById("btn-speak-normal").addEventListener("click", () => {
    const card = STUDY_DATA.vocabTopics[currentTopicIdx].items[currentCardIdx];
    speakKorean(card.chunk, 1.0);
  });

  document.getElementById("btn-speak-slow").addEventListener("click", () => {
    const card = STUDY_DATA.vocabTopics[currentTopicIdx].items[currentCardIdx];
    speakKorean(card.chunk, 0.7);
  });

  document.getElementById("btn-speak-example").addEventListener("click", () => {
    const card = STUDY_DATA.vocabTopics[currentTopicIdx].items[currentCardIdx];
    speakKorean(card.exampleKo, 0.95);
  });

  document.getElementById("btn-prev-vocab").addEventListener("click", () => {
    const len = STUDY_DATA.vocabTopics[currentTopicIdx].items.length;
    currentCardIdx = (currentCardIdx - 1 + len) % len;
    renderFlashcard();
  });

  document.getElementById("btn-next-vocab").addEventListener("click", () => {
    const len = STUDY_DATA.vocabTopics[currentTopicIdx].items.length;
    currentCardIdx = (currentCardIdx + 1) % len;
    renderFlashcard();
  });

  document.getElementById("btn-apply-pinterest").addEventListener("click", () => {
    const url = document.getElementById("pinterest-url-input").value.trim();
    if (!url) return;
    STUDY_DATA.vocabTopics[currentTopicIdx].items[currentCardIdx].pinterestImg = url;
    document.getElementById("pinterest-url-input").value = "";
    renderFlashcard();
  });

  renderFlashcard();

  // =========================================================================
  // 3. PHẦN NGỮ PHÁP & LUYỆN TẬP
  // =========================================================================
  let activeGrammarCat = "topic";
  const grammarTopicSelect = document.getElementById("grammar-topic-select");
  STUDY_DATA.vocabTopics.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.title;
    grammarTopicSelect.appendChild(opt);
  });

  function renderGrammarList() {
    const container = document.getElementById("grammar-list");
    const filterWrap = document.getElementById("grammar-topic-filter-wrap");
    container.innerHTML = "";

    if (activeGrammarCat === "topic") {
      filterWrap.classList.remove("hidden");
      const selectedTopic = grammarTopicSelect.value;
      const list = STUDY_DATA.grammar.topic.filter((g) => g.topicId === selectedTopic);
      list.forEach((g) => {
        container.innerHTML += `
          <div class="grammar-item">
            <h4><span class="ko">${g.form}</span> — ${g.meaning}</h4>
            <p class="ko">Ví dụ: ${g.exampleKo} <button type="button" onclick="window._speak('${g.exampleKo}')">Nghe</button></p>
            <p>Dịch: ${g.exampleVi}</p>
            <div class="note-box">${g.note}</div>
          </div>
        `;
      });
    } else if (activeGrammarCat === "speaking") {
      filterWrap.classList.add("hidden");
      STUDY_DATA.grammar.speaking.forEach((g) => {
        const suggestions = g.suggestedStructures.map((s) => `<li>${s}</li>`).join("");
        container.innerHTML += `
          <div class="grammar-item">
            <h4><span class="ko">${g.form}</span> — ${g.meaning}</h4>
            <p class="ko">Ví dụ: ${g.exampleKo} <button type="button" onclick="window._speak('${g.exampleKo}')">Nghe</button></p>
            <p>Dịch: ${g.exampleVi}</p>
            <p><strong>Gợi ý cấu trúc câu đi kèm trong giao tiếp:</strong></p>
            <ul>${suggestions}</ul>
            <div class="note-box">${g.note}</div>
          </div>
        `;
      });
    } else if (activeGrammarCat === "writing") {
      filterWrap.classList.add("hidden");
      STUDY_DATA.grammar.writing.forEach((g) => {
        container.innerHTML += `
          <div class="grammar-item">
            <h4><span class="ko">${g.form}</span> — ${g.meaning}</h4>
            <p class="ko">Ví dụ: ${g.exampleKo}</p>
            <p>Dịch: ${g.exampleVi}</p>
            <div class="note-box">${g.note}</div>
          </div>
        `;
      });
    } else if (activeGrammarCat === "compare") {
      filterWrap.classList.add("hidden");
      STUDY_DATA.grammar.compare.forEach((g) => {
        container.innerHTML += `
          <div class="grammar-item">
            <h4 class="ko">${g.pair}</h4>
            <p><strong>Điểm giống nhau:</strong> ${g.similarity}</p>
            <div class="note-box" style="white-space: pre-line;">${g.differenceNote}</div>
            <p class="ko">Ví dụ đối chiếu: ${g.exampleKo}</p>
            <p>${g.exampleVi}</p>
          </div>
        `;
      });
    }
  }

  window._speak = (txt) => speakKorean(txt, 0.95);

  document.querySelectorAll("#grammar-category-nav .sub-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#grammar-category-nav .sub-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGrammarCat = btn.dataset.gcat;
      renderGrammarList();
    });
  });

  grammarTopicSelect.addEventListener("change", renderGrammarList);
  renderGrammarList();

  // Luyện tập ngữ pháp (Đục lỗ & Dịch câu)
  function renderGrammarPractice(type = "cloze") {
    const container = document.getElementById("grammar-practice-container");
    container.innerHTML = "";

    if (type === "cloze") {
      STUDY_DATA.grammar.exercises.cloze.forEach((ex, i) => {
        const div = document.createElement("div");
        div.className = "exercise-item";
        div.innerHTML = `
          <p><strong>Câu ${i + 1}:</strong> <span class="ko">${ex.question}</span></p>
          <input type="text" id="cloze-input-${i}" placeholder="Nhập từ còn thiếu..." />
          <button type="button" id="cloze-btn-${i}">Kiểm tra</button>
          <p id="cloze-res-${i}" class="note"></p>
        `;
        container.appendChild(div);

        document.getElementById(`cloze-btn-${i}`).addEventListener("click", () => {
          const val = document.getElementById(`cloze-input-${i}`).value.trim();
          const resEl = document.getElementById(`cloze-res-${i}`);
          if (val === ex.answer) {
            resEl.textContent = `Chính xác! ${ex.note}`;
          } else {
            resEl.textContent = `Chưa đúng. Đáp án là "${ex.answer}". ${ex.note}`;
          }
        });
      });
    } else {
      STUDY_DATA.grammar.exercises.translate.forEach((ex, i) => {
        const div = document.createElement("div");
        div.className = "exercise-item";
        div.innerHTML = `
          <p><strong>Dịch câu ${i + 1}:</strong> ${ex.vi}</p>
          <input type="text" id="trans-input-${i}" placeholder="Nhập câu tiếng Hàn của bạn..." />
          <button type="button" id="trans-btn-${i}">Xem đáp án mẫu</button>
          <p id="trans-res-${i}" class="note"></p>
        `;
        container.appendChild(div);

        document.getElementById(`trans-btn-${i}`).addEventListener("click", () => {
          const resEl = document.getElementById(`trans-res-${i}`);
          resEl.innerHTML = `Đáp án tham khảo: <span class="ko">${ex.answerKo}</span> — ${ex.note}`;
        });
      });
    }
  }

  document.querySelectorAll("[data-gpractice]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-gpractice]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrammarPractice(btn.dataset.gpractice);
    });
  });
  renderGrammarPractice("cloze");

  // =========================================================================
  // 4. PHẦN BỐN KỸ NĂNG (NGHE - NÓI - ĐỌC - VIẾT)
  // =========================================================================
  document.querySelectorAll("#skills-sub-nav .sub-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#skills-sub-nav .sub-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".skill-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`skill-${btn.dataset.skill}`).classList.add("active");
    });
  });

  // 4.1 KỸ NĂNG NGHE
  function renderListening() {
    const container = document.getElementById("listening-container");
    const fb = STUDY_DATA.skills.listening.fillBlank;
    const mc = STUDY_DATA.skills.listening.multipleChoice;

    container.innerHTML = `
      <div class="content-block ibis-slot" data-slot="images/listening-fill.png">
        <h4>Dạng 1: Nghe và điền từ vào chỗ trống</h4>
        <button type="button" id="btn-play-fb">Nghe đoạn ghi âm</button>
        <p class="ko big-text">${fb.displaySentence}</p>
        <input type="text" id="listen-fb-input" placeholder="Gõ từ tiếng Hàn nghe được vào chỗ trống..." />
        <button type="button" id="btn-check-fb">Kiểm tra</button>
        <p id="listen-fb-res" class="note"></p>
      </div>

      <div class="content-block ibis-slot" data-slot="images/listening-mc.png">
        <h4>Dạng 2: Kiểm tra thông tin (Trắc nghiệm A / B / C / D)</h4>
        <button type="button" id="btn-play-mc">Nghe hội thoại</button>
        <p><strong>Câu hỏi:</strong> ${mc.question}</p>
        <div id="mc-options">
          ${mc.options.map((opt, idx) => `
            <div>
              <label><input type="radio" name="listen-mc" value="${idx}" style="width:auto;" /> ${opt}</label>
            </div>
          `).join("")}
        </div>
        <button type="button" id="btn-check-mc">Chấm điểm</button>
        <p id="listen-mc-res" class="note"></p>
      </div>
    `;

    document.getElementById("btn-play-fb").addEventListener("click", () => speakKorean(fb.audioScript, 0.9));
    document.getElementById("btn-check-fb").addEventListener("click", () => {
      const val = document.getElementById("listen-fb-input").value.trim();
      const res = document.getElementById("listen-fb-res");
      if (val === fb.answer) {
        res.textContent = `Chính xác! Câu đầy đủ: "${fb.audioScript}" (${fb.meaning})`;
      } else {
        res.textContent = `Chưa đúng. Từ cần điền là "${fb.answer}". Câu đầy đủ: "${fb.audioScript}"`;
      }
    });

    document.getElementById("btn-play-mc").addEventListener("click", () => speakKorean(mc.audioScript, 0.9));
    document.getElementById("btn-check-mc").addEventListener("click", () => {
      const chosen = document.querySelector('input[name="listen-mc"]:checked');
      const res = document.getElementById("listen-mc-res");
      if (!chosen) {
        res.textContent = "Bạn hãy chọn một đáp án A, B, C hoặc D trước nhé.";
        return;
      }
      if (Number(chosen.value) === mc.correctIndex) {
        res.textContent = `Đúng rồi! ${mc.note}`;
      } else {
        res.textContent = `Chưa chính xác. Đáp án đúng là ${mc.options[mc.correctIndex]}. ${mc.note}`;
      }
    });
  }
  renderListening();

  // 4.2 KỸ NĂNG NÓI (SHADOWING + AI CHẤM CHỮA)
  function renderSpeaking() {
    const shadowContainer = document.getElementById("shadowing-container");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    STUDY_DATA.skills.speaking.shadowingList.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "exercise-item";
      div.innerHTML = `
        <p class="ko big-text">${item.ko}</p>
        <p>${item.vi}</p>
        <p class="note">${item.note}</p>
        <button type="button" id="shadow-listen-${idx}">1. Nghe mẫu</button>
        <button type="button" id="shadow-rec-${idx}">2. Bấm để nói nhại theo (Micro)</button>
        <p id="shadow-result-${idx}" class="note"></p>
      `;
      shadowContainer.appendChild(div);

      document.getElementById(`shadow-listen-${idx}`).addEventListener("click", () => speakKorean(item.ko, 0.9));
      document.getElementById(`shadow-rec-${idx}`).addEventListener("click", () => {
        const resEl = document.getElementById(`shadow-result-${idx}`);
        if (!SpeechRecognition) {
          resEl.textContent = "Trình duyệt chưa hỗ trợ nhận diện giọng nói (Hãy dùng Chrome/Edge).";
          return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "ko-KR";
        resEl.textContent = "Đang nghe giọng bạn...";
        recognition.start();

        recognition.onresult = (event) => {
          const spoken = event.results[0][0].transcript;
          resEl.innerHTML = `Hệ thống nghe được: "<span class="ko">${spoken}</span>" — Hãy so sánh với câu mẫu phía trên nhé!`;
        };
        recognition.onerror = () => {
          resEl.textContent = "Không nhận diện được giọng nói, bạn thử nói gần micro hơn nhé.";
        };
      });
    });

    // AI Chấm chữa & Hội thoại
    const aiContainer = document.getElementById("speaking-ai-container");
    const promptItem = STUDY_DATA.skills.speaking.aiPrompts[0];

    aiContainer.innerHTML = `
      <div class="exercise-item">
        <p><strong>Cấu trúc yêu cầu:</strong> <span class="ko">${promptItem.structure}</span></p>
        <p><strong>Tình huống:</strong> ${promptItem.situation}</p>
        <textarea id="ai-user-sentence" rows="2" placeholder="Nhập câu tiếng Hàn của bạn (hoặc dùng nút Micro bên dưới)..."></textarea>
        <div class="audio-controls">
          <button type="button" id="btn-ai-mic">Nói bằng Micro</button>
          <button type="button" id="btn-ai-check">Gửi AI chấm chữa & phản hồi</button>
        </div>
        <div id="ai-feedback-box" class="note-box hidden"></div>
      </div>
    `;

    // Lưu API Key
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) document.getElementById("gemini-api-key").value = savedKey;
    document.getElementById("btn-save-api-key").addEventListener("click", () => {
      const k = document.getElementById("gemini-api-key").value.trim();
      localStorage.setItem("gemini_api_key", k);
      alert("Đã lưu API Key vào trình duyệt của bạn!");
    });

    // Nút Micro cho phần đặt câu AI
    document.getElementById("btn-ai-mic").addEventListener("click", () => {
      if (!SpeechRecognition) return alert("Trình duyệt không hỗ trợ Micro.");
      const rec = new SpeechRecognition();
      rec.lang = "ko-KR";
      rec.start();
      rec.onresult = (e) => {
        document.getElementById("ai-user-sentence").value = e.results[0][0].transcript;
      };
    });

    // Xử lý chấm chữa (Dùng Gemini API nếu có key, hoặc bộ kiểm tra quy tắc tích hợp sẵn)
    document.getElementById("btn-ai-check").addEventListener("click", async () => {
      const userText = document.getElementById("ai-user-sentence").value.trim();
      const feedbackBox = document.getElementById("ai-feedback-box");
      if (!userText) return;

      feedbackBox.classList.remove("hidden");
      feedbackBox.textContent = "Đang phân tích câu của bạn...";

      const apiKey = localStorage.getItem("gemini_api_key");
      if (apiKey) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Bạn là giáo viên tiếng Hàn thân thiện. Học viên đang luyện cấu trúc "${promptItem.structure}" với tình huống "${promptItem.situation}". Câu của học viên: "${userText}". Hãy: 1) Nhận xét & sửa lỗi ngữ pháp/tự nhiên bằng tiếng Việt ngắn gọn. 2) Đáp lại học viên 1 câu tiếng Hàn tự nhiên để tiếp tục hội thoại.`
                  }]
                }]
              })
            }
          );
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            feedbackBox.style.whiteSpace = "pre-line";
            feedbackBox.textContent = reply;
            return;
          }
        } catch (err) {
          // Fallback về bộ chấm tự động nếu lỗi mạng/key
        }
      }

      // Bộ chấm chữa tích hợp sẵn (Offline-ready)
      const hasStructure = userText.includes(promptItem.requiredToken);
      const endsProperly = /[.?!요다]$/.test(userText);
      let msg = "";
      if (hasStructure && endsProperly) {
        msg = `Tốt lắm! Bạn đã dùng đúng cấu trúc "${promptItem.structure}".\nAI phản hồi hội thoại: 와, 정말요? 저도 한번 해 보고 싶어요! (Ồ, thật sao? Tôi cũng muốn thử một lần!)`;
        speakKorean("와, 정말요? 저도 한번 해 보고 싶어요!", 0.95);
      } else {
        msg = `Lưu ý cần sửa: Câu của bạn chưa thấy rõ cụm "${promptItem.requiredToken}" hoặc thiếu đuôi kết thúc câu (-어요/아요/습니다).\nCâu mẫu tham khảo: ${promptItem.sampleAnswer}`;
      }
      feedbackBox.style.whiteSpace = "pre-line";
      feedbackBox.textContent = msg;
    });
  }
  renderSpeaking();

  // 4.3 KỸ NĂNG ĐỌC (TÍCH ĐÚNG / SAI O - X)
  function renderReading() {
    const container = document.getElementById("reading-container");
    const r = STUDY_DATA.skills.reading;

    container.innerHTML = `
      <div class="content-block ibis-slot" data-slot="images/reading-paper.png">
        <h4>${r.title}</h4>
        <p class="ko">${r.passage}</p>
        <hr />
        <p><strong>Đọc đoạn văn và chọn Đúng (O) hoặc Sai (X):</strong></p>
        ${r.statements.map((st, idx) => `
          <div class="exercise-item">
            <p class="ko">${st.text}</p>
            <label><input type="radio" name="read-q-${idx}" value="true" style="width:auto;" /> O (Đúng)</label>
            <label style="margin-left:16px;"><input type="radio" name="read-q-${idx}" value="false" style="width:auto;" /> X (Sai)</label>
            <p id="read-res-${idx}" class="note"></p>
          </div>
        `).join("")}
        <button type="button" id="btn-check-reading">Kiểm tra bài đọc</button>
      </div>
    `;

    document.getElementById("btn-check-reading").addEventListener("click", () => {
      r.statements.forEach((st, idx) => {
        const chosen = document.querySelector(`input[name="read-q-${idx}"]:checked`);
        const resEl = document.getElementById(`read-res-${idx}`);
        if (!chosen) {
          resEl.textContent = "Bạn chưa chọn O hoặc X cho câu này.";
          return;
        }
        const isCorrect = (chosen.value === "true") === st.isTrue;
        resEl.textContent = isCorrect ? `Chính xác! ${st.explanation}` : `Chưa đúng. ${st.explanation}`;
      });
    });
  }
  renderReading();

  // 4.4 KỸ NĂNG VIẾT (KIẾN THỨC & GIẤY Ô VUÔNG WONGOJI)
  function renderWritingGuide() {
    const container = document.getElementById("writing-guide-container");
    const wg = STUDY_DATA.skills.writingGuide;

    container.innerHTML = `
      <h4>1. Quy tắc viết trên giấy ô vuông (원고지)</h4>
      <ul>${wg.wongojiRules.map((rule) => `<li>${rule}</li>`).join("")}</ul>

      <h4>2. Các cấu trúc hô ứng thường gặp trong văn viết</h4>
      <ul>${wg.correlativeStructures.map((c) => `<li><span class="ko"><strong>${c.pair}</strong></span>: ${c.meaning}</li>`).join("")}</ul>

      <h4>3. Bảng chuyển đổi từ vựng Văn nói → Văn viết</h4>
      <table>
        <thead>
          <tr>
            <th>Văn nói (Tránh dùng)</th>
            <th>Văn viết (Nên dùng)</th>
            <th>Lưu ý</th>
          </tr>
        </thead>
        <tbody>
          ${wg.writtenOnlyWords.map((w) => `
            <tr>
              <td class="ko">${w.spoken}</td>
              <td class="ko"><strong>${w.written}</strong></td>
              <td class="note">${w.note}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
  renderWritingGuide();

  // Đổ chữ vào lưới giấy ô vuông & kiểm tra lỗi văn nói
  document.getElementById("btn-render-wongoji").addEventListener("click", () => {
    const text = document.getElementById("wongoji-input").value;
    const grid = document.getElementById("wongoji-grid");
    const feedback = document.getElementById("wongoji-feedback");
    const countEl = document.getElementById("wongoji-char-count");

    countEl.textContent = `Số ký tự (kể cả dấu cách): ${text.length}`;

    // Kiểm tra lỗi dùng từ văn nói
    const warnings = [];
    if (/(저는|제가|저를|저도)/.test(text)) warnings.push("Phát hiện từ '저' (văn nói) → Hãy đổi thành '나/내가/나를'.");
    if (/(아요|어요|해요)/.test(text)) warnings.push("Phát hiện đuôi câu '-아요/어요' → Hãy chuyển sang thể văn viết '-는다/ㄴ다/다'.");
    if (text.includes("그리고")) warnings.push("Phát hiện từ '그리고' → Nên thay bằng '또한' hoặc '아울러'.");
    if (text.includes("하지만")) warnings.push("Phát hiện từ '하지만' → Nên thay bằng '그러나' hoặc '반면에'.");

    feedback.textContent = warnings.length > 0
      ? "Cảnh báo lỗi văn phong: " + warnings.join(" | ")
      : "Tốt! Không phát hiện lỗi dùng từ văn nói cơ bản.";

    // Đổ ký tự vào tối thiểu 100 ô vuông (tự mở rộng theo độ dài bài)
    const chars = Array.from(text);
    const totalCells = Math.max(100, Math.ceil(chars.length / 20) * 20);
    grid.innerHTML = "";

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "wongoji-cell";
      cell.textContent = chars[i] || "";
      grid.appendChild(cell);
    }
  });
});
