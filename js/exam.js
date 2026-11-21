const EXAM_QUESTION_COUNT = 16;
const EXAM_MINUTES = 35;
const EXAM_PASS_PERCENT = 75;
const examState = { active: false, questions: [], answers: [], flagged: [], index: 0, endTime: 0, startTime: 0, timerId: null, lastResult: null };

function buildExamPaper() {
  const byTopic = {};
  QUESTIONS.forEach(question => {
    byTopic[question.topic] = byTopic[question.topic] || [];
    byTopic[question.topic].push(question);
  });
  const oneFromEachTopic = shuffle(Object.values(byTopic).map(questions => pickRandom(questions)));
  const chosen = oneFromEachTopic.slice(0, EXAM_QUESTION_COUNT);
  const remaining = shuffle(QUESTIONS.filter(question => !chosen.includes(question)));
  while (chosen.length < EXAM_QUESTION_COUNT && remaining.length) chosen.push(remaining.pop());
  return shuffle(chosen).map(question => ({ ...question, order: shuffle(question.options.map((option, index) => index)) }));
}

function formatClock(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderExam() {
  currentView = "exam";
  setActiveTab("exam");
  if (examState.active) {
    renderExamQuestion();
  } else if (examState.lastResult) {
    renderExamResults();
  } else {
    renderExamIntro();
  }
}

function renderExamIntro() {
  appElement.innerHTML = `
    <div class="quiz-wrap card">
      <h1 style="margin:0 0 6px;letter-spacing:-.02em">⏱ Mock Exam — test conditions</h1>
      <p style="color:var(--muted);margin:0 0 14px">Simulates the UK PPL Air Law theory exam.</p>
      <table class="ref">
        <tr><td><b>Questions</b></td><td>${EXAM_QUESTION_COUNT}, drawn at random from the ${QUESTIONS.length}-question bank (spread across different topics)</td></tr>
        <tr><td><b>Time allowed</b></td><td>${EXAM_MINUTES} minutes — the paper submits itself when time runs out</td></tr>
        <tr><td><b>Pass mark</b></td><td>${EXAM_PASS_PERCENT}% (${Math.ceil(EXAM_QUESTION_COUNT * EXAM_PASS_PERCENT / 100)} of ${EXAM_QUESTION_COUNT} correct)</td></tr>
        <tr><td><b>Rules</b></td><td>No notes and no feedback until the end. You can move between questions, change answers and flag questions to come back to.</td></tr>
      </table>
      <div class="callout trap"><b class="title">Test conditions</b>Close your notes and put your phone away. Don't open other tabs in this page during the exam — the clock keeps running.</div>
      <button class="btn" id="beginExam">Start exam — timer begins immediately</button>
    </div>`;
  document.getElementById("beginExam").addEventListener("click", startExam);
}

function startExam() {
  examState.active = true;
  examState.questions = buildExamPaper();
  examState.answers = new Array(examState.questions.length).fill(null);
  examState.flagged = new Array(examState.questions.length).fill(false);
  examState.index = 0;
  examState.startTime = Date.now();
  examState.endTime = examState.startTime + EXAM_MINUTES * 60 * 1000;
  examState.lastResult = null;
  clearInterval(examState.timerId);
  examState.timerId = setInterval(tickExamTimer, 500);
  renderExamQuestion();
}

function tickExamTimer() {
  const remaining = examState.endTime - Date.now();
  if (remaining <= 0) {
    submitExam(true);
    return;
  }
  const timer = document.getElementById("examTimer");
  if (timer && currentView === "exam") {
    timer.textContent = formatClock(remaining);
    timer.classList.toggle("low", remaining < 5 * 60 * 1000);
  }
}

function renderExamQuestion() {
  const question = examState.questions[examState.index];
  const total = examState.questions.length;
  const answeredCount = examState.answers.filter(answer => answer !== null).length;
  appElement.innerHTML = `
    <div class="quiz-wrap">
      <div class="exam-bar">
        <div><div style="font-size:12px;opacity:.75">TIME REMAINING</div><div class="exam-timer" id="examTimer">${formatClock(examState.endTime - Date.now())}</div></div>
        <div style="font-size:13.5px">Answered <b>${answeredCount}/${total}</b></div>
        <button class="btn small" id="submitExam" style="background:#fff;color:#0e1b36">Submit exam</button>
      </div>
      <div class="card">
        <div class="quiz-meta"><span>Question ${examState.index + 1} of ${total}</span><span>Air Law — mock exam</span></div>
        <div class="quiz-q">${question.question}</div>
        <div class="option-list">${question.order.map(optionIndex => `<button class="option ${examState.answers[examState.index] === optionIndex ? "selected" : ""}" data-exam-option="${optionIndex}">${question.options[optionIndex]}</button>`).join("")}</div>
        <div class="quiz-foot">
          <button class="btn ghost" id="examPrevious" ${examState.index === 0 ? "disabled" : ""}>← Previous</button>
          <button class="btn ghost" id="examFlag">${examState.flagged[examState.index] ? "⚑ Unflag" : "⚐ Flag for review"}</button>
          <button class="btn" id="examNext">${examState.index + 1 === total ? "Review & submit" : "Next →"}</button>
        </div>
        <div class="exam-nav">${examState.questions.map((item, index) => `<button data-exam-jump="${index}" class="${examState.answers[index] !== null ? "answered" : ""} ${index === examState.index ? "current" : ""} ${examState.flagged[index] ? "flagged" : ""}">${index + 1}</button>`).join("")}</div>
        <div class="legend"><span>■ blue = answered</span><span>⚑ = flagged</span><span>outlined = current</span></div>
      </div>
    </div>`;
  tickExamTimer();
  appElement.querySelectorAll("[data-exam-option]").forEach(button => button.addEventListener("click", () => {
    examState.answers[examState.index] = Number(button.dataset.examOption);
    renderExamQuestion();
  }));
  appElement.querySelectorAll("[data-exam-jump]").forEach(button => button.addEventListener("click", () => {
    examState.index = Number(button.dataset.examJump);
    renderExamQuestion();
  }));
  document.getElementById("examPrevious").addEventListener("click", () => {
    if (examState.index > 0) {
      examState.index--;
      renderExamQuestion();
    }
  });
  document.getElementById("examNext").addEventListener("click", () => {
    if (examState.index + 1 < total) {
      examState.index++;
      renderExamQuestion();
    } else {
      confirmExamSubmit();
    }
  });
  document.getElementById("examFlag").addEventListener("click", () => {
    examState.flagged[examState.index] = !examState.flagged[examState.index];
    renderExamQuestion();
  });
  document.getElementById("submitExam").addEventListener("click", confirmExamSubmit);
}

function confirmExamSubmit() {
  const unanswered = examState.answers.filter(answer => answer === null).length;
  const flaggedCount = examState.flagged.filter(Boolean).length;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal">
      <h3 style="margin:0 0 8px">Submit your exam?</h3>
      <p style="margin:0 0 6px;color:var(--muted)">${unanswered ? `<b style="color:var(--bad)">${unanswered} question${unanswered > 1 ? "s" : ""} unanswered.</b> ` : "All questions answered. "}${flaggedCount ? `${flaggedCount} flagged for review.` : ""}</p>
      <p style="margin:0 0 16px;color:var(--muted)">Time remaining: ${formatClock(examState.endTime - Date.now())}</p>
      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button class="btn ghost" id="cancelSubmit">Keep working</button>
        <button class="btn" id="confirmSubmit">Submit</button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);
  backdrop.querySelector("#cancelSubmit").addEventListener("click", () => backdrop.remove());
  backdrop.querySelector("#confirmSubmit").addEventListener("click", () => {
    backdrop.remove();
    submitExam(false);
  });
}

function submitExam(timeRanOut) {
  if (!examState.active) return;
  clearInterval(examState.timerId);
  examState.active = false;
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());
  const results = examState.questions.map((question, index) => ({ question, chosen: examState.answers[index], isCorrect: examState.answers[index] === question.answer }));
  results.forEach(({ question, isCorrect }) => {
    if (isCorrect) {
      wrongQuestionIds = wrongQuestionIds.filter(id => id !== question.id);
    } else if (!wrongQuestionIds.includes(question.id)) {
      wrongQuestionIds.push(question.id);
    }
  });
  storage.write("airlaw-mistakes", wrongQuestionIds);
  const timeUsed = Math.min(Date.now(), examState.endTime) - examState.startTime;
  examState.lastResult = { results, timeRanOut, timeUsed };
  const history = storage.read("airlaw-exam-history", []);
  history.push({ date: new Date().toISOString(), score: results.filter(result => result.isCorrect).length, total: results.length });
  storage.write("airlaw-exam-history", history.slice(-20));
  if (currentView === "exam") renderExamResults();
}

function renderExamResults() {
  const { results, timeRanOut, timeUsed } = examState.lastResult;
  const score = results.filter(result => result.isCorrect).length;
  const percentage = Math.round(score / results.length * 100);
  const passed = percentage >= EXAM_PASS_PERCENT;
  const history = storage.read("airlaw-exam-history", []);
  appElement.innerHTML = `
    <div class="quiz-wrap card">
      ${timeRanOut ? '<div class="callout trap" style="margin-top:0"><b class="title">Time up</b>The exam was submitted automatically when the 35 minutes ran out.</div>' : ""}
      <h1 style="margin:0;letter-spacing:-.02em">${passed ? "🎉 PASS" : "❌ FAIL"} — ${score}/${results.length} (${percentage}%)</h1>
      <p style="margin:6px 0 12px;color:var(--muted)">Pass mark ${EXAM_PASS_PERCENT}% · Time used ${formatClock(timeUsed)} of ${EXAM_MINUTES}:00</p>
      <div class="bar"><div style="width:${percentage}%"></div></div>
      ${history.length > 1 ? `<h3>Recent mock exams</h3><div class="legend">${history.slice(-8).map(attempt => `<span class="mono" style="color:${attempt.score / attempt.total * 100 >= EXAM_PASS_PERCENT ? "var(--good)" : "var(--bad)"}">${attempt.score}/${attempt.total}</span>`).join("")}</div>` : ""}
      <h3 style="margin-top:20px">Full paper review</h3>
      ${results.map(({ question, chosen, isCorrect }, index) => `
        <div class="explain" style="margin-top:10px;border-left-color:${isCorrect ? "var(--good)" : "var(--bad)"}">
          <b>${index + 1}. ${question.question}</b>
          <div style="margin-top:6px">${isCorrect ? "✅" : "❌"} Your answer: ${chosen === null ? "<i>not answered</i>" : question.options[chosen]}</div>
          ${isCorrect ? "" : `<div>✔ Correct: <b>${question.options[question.answer]}</b></div>`}
          <div style="color:var(--muted);margin-top:4px">${question.explanation} <a href="#topic-${question.topic}">Topic ${question.topic} notes →</a></div>
        </div>`).join("")}
      <div class="quiz-foot">
        <button class="btn ghost" data-view="home">Back to overview</button>
        <button class="btn" id="newExam">Start a new mock exam</button>
      </div>
    </div>`;
  document.getElementById("newExam").addEventListener("click", () => {
    examState.lastResult = null;
    renderExamIntro();
  });
}
