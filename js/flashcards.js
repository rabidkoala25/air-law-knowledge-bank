const flashcardState = { cards: [], index: 0, topic: "all" };

function renderFlashcards() {
  currentView = "cards";
  setActiveTab("cards");
  flashcardState.cards = QUESTIONS.filter(question => flashcardState.topic === "all" || question.topic === Number(flashcardState.topic));
  flashcardState.index = Math.min(flashcardState.index, flashcardState.cards.length - 1);
  drawFlashcard();
}

function drawFlashcard() {
  const card = flashcardState.cards[flashcardState.index];
  const topic = topicByNumber(card.topic);
  appElement.innerHTML = `
    <div class="quiz-wrap">
      <div class="card">
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between">
          <h1 style="margin:0;letter-spacing:-.02em;font-size:24px">Flashcards</h1>
          <select id="cardTopic" style="padding:8px 10px;border-radius:9px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);font:inherit">
            <option value="all">All topics</option>${TOPICS.map(item => `<option value="${item.num}" ${String(item.num) === String(flashcardState.topic) ? "selected" : ""}>${item.num}. ${item.title}</option>`).join("")}
          </select>
        </div>
        <div class="flashcard" id="flashcard">
          <div class="flashcard-inner">
            <div class="face front"><div class="f-label">Topic ${topic.num} · ${topic.title} · card ${flashcardState.index + 1}/${flashcardState.cards.length}</div><div class="f-main">${card.question}</div><div class="f-sub">Click or press <span class="kbd">Space</span> to flip</div></div>
            <div class="face back"><div class="f-label">Answer</div><div class="f-main">${card.options[card.answer]}</div><div class="f-sub">${card.explanation}</div></div>
          </div>
        </div>
        <div class="quiz-foot">
          <button class="btn ghost" id="previousCard">← Previous</button>
          <button class="btn ghost" id="shuffleCards">🔀 Shuffle</button>
          <button class="btn" id="nextCard">Next →</button>
        </div>
        <p class="footer-note" style="margin-top:12px">Keyboard: <span class="kbd">←</span> <span class="kbd">→</span> to move, <span class="kbd">Space</span> to flip</p>
      </div>
    </div>`;
  document.getElementById("flashcard").addEventListener("click", flipFlashcard);
  document.getElementById("previousCard").addEventListener("click", () => moveFlashcard(-1));
  document.getElementById("nextCard").addEventListener("click", () => moveFlashcard(1));
  document.getElementById("shuffleCards").addEventListener("click", () => {
    flashcardState.cards = shuffle(flashcardState.cards);
    flashcardState.index = 0;
    drawFlashcard();
  });
  document.getElementById("cardTopic").addEventListener("change", event => {
    flashcardState.topic = event.target.value;
    flashcardState.index = 0;
    renderFlashcards();
  });
}

function flipFlashcard() {
  const flashcard = document.getElementById("flashcard");
  if (flashcard) flashcard.classList.toggle("flipped");
}

function moveFlashcard(step) {
  const count = flashcardState.cards.length;
  flashcardState.index = (flashcardState.index + step + count) % count;
  drawFlashcard();
}
