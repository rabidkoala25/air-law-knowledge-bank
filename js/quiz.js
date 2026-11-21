const quizState = { questions: [], index: 0, score: 0, results: [] };

function renderQuizSetup() {
  currentView = "quiz";
  setActiveTab("quiz");
  appElement.innerHTML = `
    <div class="quiz-wrap card">
      <h1 style="margin:0 0 4px;letter-spacing:-.02em">Practice Quiz</h1>
      <p style="color:var(--muted);margin:0">${QUESTIONS.length} questions in the bank. Answer order is shuffled every time.</p>
      <div class="form-grid">
        <label>Lesson<select id="quizLesson"><option value="all">All lessons</option>${LESSON_ORDER.map(lessonId => `<option value="${lessonId}">${LESSONS[lessonId].name}</option>`).join("")}</select></label>
        <label>Topic<select id="quizTopic"><option value="all">All topics</option>${TOPICS.map(topic => `<option value="${topic.num}">${topic.num}. ${topic.title}</option>`).join("")}</select></label>
        <label>Number of questions<select id="quizCount"><option value="10">10</option><option value="20" selected>20</option><option value="40">40</option><option value="999">All</option></select></label>
        <label class="check" style="align-self:end"><input type="checkbox" id="quizMistakes"> Only my mistakes (${wrongQuestionIds.length})</label>
      </div>
      <button class="btn" id="startQuiz">Start quiz</button>
    </div>`;
  document.getElementById("startQuiz").addEventListener("click", () => {
    startQuiz({
      lesson: document.getElementById("quizLesson").value,
      topic: document.getElementById("quizTopic").value,
      count: Number(document.getElementById("quizCount").value),
      mistakesOnly: document.getElementById("quizMistakes").checked
    });
  });
}

function startQuiz({ lesson = "all", topic = "all", count = 999, mistakesOnly = false, questionList = null }) {
  currentView = "quiz";
  setActiveTab("quiz");
  let pool = questionList || QUESTIONS.filter(question => {
    const questionTopic = topicByNumber(question.topic);
    if (lesson !== "all" && questionTopic.lesson !== lesson) return false;
    if (topic !== "all" && question.topic !== Number(topic)) return false;
    if (mistakesOnly && !wrongQuestionIds.includes(question.id)) return false;
    return true;
  });
  if (!pool.length) {
    appElement.innerHTML = `<div class="quiz-wrap card"><p>No questions match that selection${mistakesOnly ? " — no saved mistakes yet. Nice!" : "."}</p><button class="btn" data-view="quiz">Back</button></div>`;
    return;
  }
  quizState.questions = shuffle(pool).slice(0, count).map(question => ({ ...question, order: shuffle(question.options.map((option, index) => index)) }));
  quizState.index = 0;
  quizState.score = 0;
  quizState.results = [];
  renderQuestion();
}

function renderQuestion() {
  const question = quizState.questions[quizState.index];
  const total = quizState.questions.length;
  const topic = topicByNumber(question.topic);
  appElement.innerHTML = `
    <div class="quiz-wrap card">
      <div class="quiz-meta"><span>Question ${quizState.index + 1} of ${total}</span><span>Topic ${topic.num}: ${topic.title}</span><span>Score: ${quizState.score}</span></div>
      <div class="bar"><div style="width:${quizState.index / total * 100}%"></div></div>
      <div class="quiz-q">${question.question}</div>
      <div class="option-list">${question.order.map(optionIndex => `<button class="option" data-option="${optionIndex}">${question.options[optionIndex]}</button>`).join("")}</div>
      <div class="explain hidden"></div>
      <div class="quiz-foot">
        <button class="btn ghost small" data-topic="${topic.num}">📖 Review topic notes</button>
        <button class="btn hidden" id="nextQuestion">${quizState.index + 1 === total ? "See results" : "Next question →"}</button>
      </div>
    </div>`;
  appElement.querySelectorAll(".option").forEach(button => button.addEventListener("click", () => answerQuestion(button, question)));
  document.getElementById("nextQuestion").addEventListener("click", () => {
    quizState.index++;
    if (quizState.index >= quizState.questions.length) renderQuizResults();
    else renderQuestion();
  });
}

function answerQuestion(button, question) {
  if (button.disabled) return;
  const chosen = Number(button.dataset.option);
  const isCorrect = chosen === question.answer;
  if (isCorrect) {
    quizState.score++;
    wrongQuestionIds = wrongQuestionIds.filter(id => id !== question.id);
  } else if (!wrongQuestionIds.includes(question.id)) {
    wrongQuestionIds.push(question.id);
  }
  storage.write("airlaw-mistakes", wrongQuestionIds);
  quizState.results.push({ question, isCorrect });
  appElement.querySelectorAll(".option").forEach(option => {
    option.disabled = true;
    if (Number(option.dataset.option) === question.answer) option.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  const explanation = appElement.querySelector(".explain");
  explanation.classList.remove("hidden");
  explanation.innerHTML = `<b>${isCorrect ? "✅ Correct!" : "❌ Incorrect."}</b> ${question.explanation}`;
  document.getElementById("nextQuestion").classList.remove("hidden");
  appElement.querySelector(".quiz-meta span:last-child").textContent = `Score: ${quizState.score}`;
}

function renderQuizResults() {
  const total = quizState.questions.length;
  const percentage = Math.round(quizState.score / total * 100);
  const passed = percentage >= 75;
  const byTopic = {};
  quizState.results.forEach(({ question, isCorrect }) => {
    byTopic[question.topic] = byTopic[question.topic] || { right: 0, total: 0 };
    byTopic[question.topic].total++;
    if (isCorrect) byTopic[question.topic].right++;
  });
  const wrongOnes = quizState.results.filter(result => !result.isCorrect).map(result => result.question);
  appElement.innerHTML = `
    <div class="quiz-wrap card">
      <h1 style="margin:0;letter-spacing:-.02em">${passed ? "🎉" : "📚"} ${quizState.score}/${total} — ${percentage}%</h1>
      <p style="margin:6px 0 14px;color:${passed ? "var(--good)" : "var(--bad)"};font-weight:700">${passed ? "That would be a pass (75% needed)." : "Below the 75% pass mark — review the topics below."}</p>
      <div class="bar"><div style="width:${percentage}%"></div></div>
      <h3 style="margin-top:20px">By topic</h3>
      ${Object.entries(byTopic).sort((a, b) => a[0] - b[0]).map(([topicNumber, counts]) => `
        <div class="result-row"><button class="btn ghost small" data-topic="${topicNumber}">${topicNumber}. ${topicByNumber(Number(topicNumber)).title}</button><span style="font-weight:700;color:${counts.right === counts.total ? "var(--good)" : "var(--bad)"}">${counts.right}/${counts.total}</span></div>`).join("")}
      ${wrongOnes.length ? `<h3>Questions you missed</h3>${wrongOnes.map(question => `<div class="explain" style="margin-top:8px"><b>${question.question}</b><br>✔ ${question.options[question.answer]}<br><span style="color:var(--muted)">${question.explanation}</span></div>`).join("")}` : ""}
      <div class="quiz-foot">
        ${wrongOnes.length ? '<button class="btn" id="retryWrong">Retry the ones I missed</button>' : "<span></span>"}
        <button class="btn ghost" data-view="quiz">New quiz</button>
      </div>
    </div>`;
  const retryButton = document.getElementById("retryWrong");
  if (retryButton) retryButton.addEventListener("click", () => startQuiz({ questionList: wrongOnes }));
}
