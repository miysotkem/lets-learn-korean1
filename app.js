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

  // Mỗi phần tử trong cells là { char: string, type: 'indent'|'char'|'space'|'punct-corner'|'punct-center', merged?: boolean }
  const cells = [{ char: "", type: "indent" }]; // Ô đầu tiên lùi đầu dòng (들여쓰기)
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
      // Chuẩn Wongoji: KHÔNG bỏ trống ô sau dấu chấm (.) và dấu phẩy (,)
      if (lastNonSpaceChar === "." || lastNonSpaceChar === ",") {
        continue;
      }
      // Nếu dấu cách rơi vào ô đầu tiên của dòng mới -> bỏ qua
      if (cells.length % cols === 0) {
        continue;
      }
      cells.push({ char: " ", type: "space" });
      continue;
    }

    // 3. Quy tắc cấm đầu dòng (줄 바꿈 금칙):
    // Các dấu câu (.), (,), (?), (!), ()), (”), (’) KHÔNG BAO GIỜ đứng ở ô đầu dòng mới
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

    // 6. Số có 2 chữ số (ví dụ: 20, 80) viết ghép vào cùng 1 ô vuông
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
    : `<div class="feedback-msg feedback-warn">★ Gợi ý chỉnh sửa văn viết:<br/>• ${warnings.map(autoFontKo).join("<br/>• ")}</div>`;
}
