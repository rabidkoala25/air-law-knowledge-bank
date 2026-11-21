const appElement = document.getElementById("app");
let confidentTopics = storage.read("airlaw-confident", []);
let wrongQuestionIds = storage.read("airlaw-wrong", []);
let currentView = "home";

function setActiveTab(view) {
  document.querySelectorAll(".tabs button").forEach(button => {
    button.classList.toggle("active", button.dataset.view === view);
  });
}

function route() {
  const hash = location.hash.replace("#", "");
  if (hash.startsWith("topic-")) {
    renderStudy(parseInt(hash.split("-")[1], 10));
  } else if (hash === "study") {
    renderStudy(TOPICS[0].num);
  } else if (hash === "sims") {
    renderSimulators();
  } else if (hash === "quiz") {
    renderQuizSetup();
  } else if (hash === "exam") {
    renderExam();
  } else if (hash === "cards") {
    renderFlashcards();
  } else if (hash === "mnemonics") {
    renderMnemonics();
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

function goTo(hash) {
  if (location.hash === "#" + hash) {
    route();
  } else {
    location.hash = hash;
  }
}

function renderHome() {
  currentView = "home";
  setActiveTab("home");
  const confidentCount = confidentTopics.length;
  const topicCards = lessonId => TOPICS.filter(topic => topic.lesson === lessonId).map(topic => `
    <button class="topic-card ${confidentTopics.includes(topic.num) ? "done" : ""}" data-topic="${topic.num}">
      <span class="tc-num">#${topic.num} · ${topic.tag}</span>
      <span class="tc-title">${topic.title}</span>
      <span class="tc-meta">${topic.summary}</span>
      <span class="tc-meta">📝 ${questionsForTopic(topic.num).length} questions${topic.body().includes("sim-slot") ? " · 🎮 simulator" : ""}</span>
    </button>`).join("");
  appElement.innerHTML = `
    <div class="home-hero">
      <div class="hero">
        <svg class="hero-art" viewBox="-20 -20 40 40">${aircraftIcon(0, 0, 45, "#fff", 1.2)}</svg>
        <h1>UK PPL(A) Air Law — everything in one place</h1>
        <p>Notes, diagrams, simulators, mnemonics and ${QUESTIONS.length} practice questions covering every topic on your tracker so far. Mark topics as confident as you go.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn" data-view="study">Start studying</button>
          <button class="btn" data-view="quiz">Take a quiz</button>
          <button class="btn" data-view="exam">⏱ Mock exam (16 Q · 35 min)</button>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><div class="v">${TOPICS.length}</div><div class="l">topics</div></div>
        <div class="stat"><div class="v">${QUESTIONS.length}</div><div class="l">practice questions</div></div>
        <div class="stat"><div class="v">${confidentCount}/${TOPICS.length}</div><div class="l">marked confident</div><div class="bar" style="margin-top:8px"><div style="width:${confidentCount / TOPICS.length * 100}%"></div></div></div>
        <div class="stat"><div class="v">${wrongQuestionIds.length}</div><div class="l">questions to review</div>${wrongQuestionIds.length ? '<button class="btn small" style="margin-top:8px" data-review="1">Review mistakes</button>' : ""}</div>
      </div>
    </div>
    ${LESSON_ORDER.map(lessonId => `<div class="section-title">${LESSONS[lessonId].name}</div><div class="topic-grid">${topicCards(lessonId)}</div>`).join("")}
    <div class="card">
      <b>How to use this</b>
      <ul style="margin:8px 0 0;padding-left:20px;color:var(--muted);font-size:14.5px">
        <li>Read a topic, play with its simulator, then hit <b>Practise this topic</b>.</li>
        <li>In galleries, press <b>Hide meanings</b> and click each card to test yourself.</li>
        <li>Questions you get wrong are saved — use <b>Review mistakes</b> before the exam.</li>
        <li>UK PPL theory pass mark is <b>75%</b> — the quiz shows whether you'd pass.</li>
      </ul>
    </div>
    <p class="footer-note">Built from SERA (UK Reg (EU) 923/2012), the Air Navigation Order 2016, Rules of the Air Regulations 2015, CAP 637, CAP 168, ICAO Annex 14, Part-FCL and Part-NCO. Always cross-check against your course material and current CAA publications.</p>`;
}

function renderStudy(topicNumber) {
  currentView = "study";
  setActiveTab("study");
  const topic = topicByNumber(topicNumber) || TOPICS[0];
  const bodyHtml = topic.body();
  const sidebar = LESSON_ORDER.map(lessonId => `
    <div class="side-lesson">${LESSONS[lessonId].name}</div>
    ${TOPICS.filter(item => item.lesson === lessonId).map(item => `
      <button class="side-item ${item.num === topic.num ? "active" : ""} ${confidentTopics.includes(item.num) ? "done" : ""}" data-topic="${item.num}" data-search="${(item.title + " " + item.tag + " " + stripTags(item.body())).toLowerCase().replace(/"/g, "")}">
        <span class="side-num">${item.num}</span><span>${item.title}</span>
      </button>`).join("")}`).join("");
  const topicIndex = TOPICS.indexOf(topic);
  const previousTopic = TOPICS[topicIndex - 1];
  const nextTopic = TOPICS[topicIndex + 1];
  const mnemonicsHtml = topic.mnemonics.length ? `<h2>🧠 Mnemonics</h2><div class="mnemonic-grid">${topic.mnemonics.map(item => `<div class="mnemonic"><div class="m-title">${item.title}</div><div class="m-text">${item.text}</div></div>`).join("")}</div>` : "";
  const topicQuestionCount = questionsForTopic(topic.num).length;
  appElement.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <input class="search" placeholder="Search topics… (e.g. PAPI, 600 m)" id="topicSearch">
        ${sidebar}
      </aside>
      <article class="card topic">
        <span class="pill">${LESSONS[topic.lesson].short} · Topic ${topic.num}</span>
        <h1>${topic.title}</h1>
        <p class="lead">${topic.summary}</p>
        <div class="topic-actions">
          <label class="confident"><input type="checkbox" data-confident="${topic.num}" ${confidentTopics.includes(topic.num) ? "checked" : ""}> I'm confident with this</label>
          <button class="btn" data-practice="${topic.num}">📝 Practise this topic (${topicQuestionCount})</button>
        </div>
        ${bodyHtml}
        ${mnemonicsHtml}
        <div class="topic-nav">
          ${previousTopic ? `<button class="btn ghost" data-topic="${previousTopic.num}">← ${previousTopic.title}</button>` : "<span></span>"}
          ${nextTopic ? `<button class="btn ghost" data-topic="${nextTopic.num}">${nextTopic.title} →</button>` : `<button class="btn" data-view="quiz">Take the full quiz →</button>`}
        </div>
      </article>
    </div>`;
  mountSimSlots(appElement);
  const searchInput = document.getElementById("topicSearch");
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    document.querySelectorAll(".side-item").forEach(item => {
      item.style.display = !term || item.dataset.search.includes(term) ? "" : "none";
    });
  });
}

function renderSimulators() {
  currentView = "sims";
  setActiveTab("sims");
  appElement.innerHTML = `
    <h1 style="margin:4px 0 4px;letter-spacing:-.02em">Simulators</h1>
    <p class="lead" style="color:var(--muted)">Interactive tools for the topics that are easiest to learn by doing.</p>
    ${Object.entries(SIMULATORS).map(([key, simulator]) => `
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center">
          <span class="pill">Topic ${simulator.topic} · ${topicByNumber(simulator.topic).title}</span>
          <button class="btn small ghost" data-topic="${simulator.topic}">Open notes →</button>
        </div>
        <div class="sim-slot" data-sim="${key}"></div>
      </div>`).join("")}`;
  mountSimSlots(appElement);
}

function mountSimSlots(container) {
  container.querySelectorAll(".sim-slot").forEach(slot => {
    const simulator = SIMULATORS[slot.dataset.sim];
    if (!simulator) return;
    slot.innerHTML = `<div class="sim"><div class="sim-title">🎮 ${simulator.title}</div><div class="sim-sub">${simulator.sub}</div><div class="sim-body"></div></div>`;
    simulator.mount(slot.querySelector(".sim-body"));
  });
}

function renderMnemonics() {
  currentView = "mnemonics";
  setActiveTab("mnemonics");
  appElement.innerHTML = `
    <h1 style="margin:4px 0 4px;letter-spacing:-.02em">All Mnemonics</h1>
    <p style="color:var(--muted);margin:0 0 16px">Every memory aid in one place — perfect for the night before the exam.</p>
    ${LESSON_ORDER.map(lessonId => `
      <div class="section-title">${LESSONS[lessonId].name}</div>
      <div class="mnemonic-grid" style="margin-bottom:20px">
        ${TOPICS.filter(topic => topic.lesson === lessonId).flatMap(topic => topic.mnemonics.map(item => `
          <div class="mnemonic" style="cursor:pointer" data-topic="${topic.num}">
            <div class="m-topic">#${topic.num} ${topic.title}</div>
            <div class="m-title">${item.title}</div>
            <div class="m-text">${item.text}</div>
          </div>`)).join("")}
      </div>`).join("")}`;
}

document.addEventListener("click", event => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    goTo(viewButton.dataset.view);
    return;
  }
  const topicButton = event.target.closest("[data-topic]");
  if (topicButton && !event.target.closest(".sim")) {
    goTo("topic-" + topicButton.dataset.topic);
    return;
  }
  const practiceButton = event.target.closest("[data-practice]");
  if (practiceButton) {
    startQuiz({ topic: practiceButton.dataset.practice });
    return;
  }
  const reviewButton = event.target.closest("[data-review]");
  if (reviewButton) {
    startQuiz({ mistakesOnly: true });
    return;
  }
  const galleryToggle = event.target.closest(".gallery-toggle");
  if (galleryToggle) {
    const wrapper = galleryToggle.closest(".gallery-wrap");
    const isTesting = wrapper.classList.toggle("testing");
    wrapper.querySelectorAll(".sigcard").forEach(card => card.classList.remove("revealed"));
    galleryToggle.textContent = isTesting ? "👀 Show all meanings" : "🙈 Hide meanings — test yourself";
    return;
  }
  const signalCardElement = event.target.closest(".gallery-wrap.testing .sigcard");
  if (signalCardElement) {
    signalCardElement.classList.toggle("revealed");
  }
});

document.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-confident]");
  if (!checkbox) return;
  const topicNumber = Number(checkbox.dataset.confident);
  confidentTopics = checkbox.checked ? [...new Set([...confidentTopics, topicNumber])] : confidentTopics.filter(number => number !== topicNumber);
  storage.write("airlaw-confident", confidentTopics);
  document.querySelectorAll(`.side-item[data-topic="${topicNumber}"]`).forEach(item => item.classList.toggle("done", checkbox.checked));
});

document.addEventListener("keydown", event => {
  if (currentView !== "cards") return;
  if (event.key === " ") {
    event.preventDefault();
    flipFlashcard();
  } else if (event.key === "ArrowRight") {
    moveFlashcard(1);
  } else if (event.key === "ArrowLeft") {
    moveFlashcard(-1);
  }
});

window.addEventListener("hashchange", route);
route();
