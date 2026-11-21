const LIGHT_SIGNALS = {
  air: [
    { look: "steady-green", name: "Steady green", meaning: "Cleared to land" },
    { look: "steady-red", name: "Steady red", meaning: "Give way to other aircraft and continue circling" },
    { look: "flash-green", name: "Green flashes", meaning: "Return for landing" },
    { look: "flash-red", name: "Red flashes", meaning: "Aerodrome unsafe — do not land" },
    { look: "flash-white", name: "White flashes", meaning: "Land at this aerodrome and proceed to the apron" },
    { look: "pyro-red", name: "Red pyrotechnic", meaning: "Notwithstanding previous instructions, do not land for the time being" }
  ],
  ground: [
    { look: "steady-green", name: "Steady green", meaning: "Cleared for take-off" },
    { look: "steady-red", name: "Steady red", meaning: "Stop" },
    { look: "flash-green", name: "Green flashes", meaning: "Cleared to taxi" },
    { look: "flash-red", name: "Red flashes", meaning: "Taxi clear of the landing area in use" },
    { look: "flash-white", name: "White flashes", meaning: "Return to starting point on the aerodrome" }
  ]
};

function mountLightSignalTrainer(element) {
  let mode = "air";
  let currentSignal = null;
  let correctCount = 0;
  let attemptCount = 0;
  element.innerHTML = `
    <div class="sim-controls">
      <button class="btn small" data-mode="air">✈ In flight</button>
      <button class="btn small ghost" data-mode="ground">🛞 On the ground</button>
      <span style="margin-left:auto;font-weight:700" class="light-score">Score: 0/0</span>
    </div>
    <div class="lamp-stage"><div class="lamp"><div class="beam"></div></div></div>
    <div class="light-caption" style="text-align:center;font-size:13px;color:var(--muted);margin-top:6px"></div>
    <div class="option-list"></div>
    <div class="readout hidden"></div>
    <div class="sim-controls"><button class="btn small next-signal">Next signal →</button></div>`;
  const stage = element.querySelector(".lamp-stage");
  const beam = element.querySelector(".beam");
  const optionList = element.querySelector(".option-list");
  const readout = element.querySelector(".readout");
  const scoreLabel = element.querySelector(".light-score");
  const caption = element.querySelector(".light-caption");

  function showSignal() {
    const signals = LIGHT_SIGNALS[mode];
    let nextSignal = pickRandom(signals);
    while (currentSignal && nextSignal.look === currentSignal.look && signals.length > 1) {
      nextSignal = pickRandom(signals);
    }
    currentSignal = nextSignal;
    stage.querySelectorAll(".flare").forEach(flare => flare.remove());
    beam.className = "beam";
    if (currentSignal.look === "pyro-red") {
      const flare = document.createElement("div");
      flare.className = "flare";
      stage.appendChild(flare);
    } else {
      beam.classList.add(currentSignal.look);
    }
    caption.textContent = mode === "air" ? "You are IN FLIGHT. The tower shows:" : "You are ON THE GROUND. The tower shows:";
    readout.classList.add("hidden");
    optionList.innerHTML = shuffle(signals).map(signal => `<button class="option" data-look="${signal.look}">${signal.meaning}</button>`).join("");
  }

  optionList.addEventListener("click", event => {
    const button = event.target.closest(".option");
    if (!button || button.disabled) return;
    attemptCount++;
    const isCorrect = button.dataset.look === currentSignal.look;
    if (isCorrect) correctCount++;
    optionList.querySelectorAll(".option").forEach(option => {
      option.disabled = true;
      if (option.dataset.look === currentSignal.look) option.classList.add("correct");
    });
    if (!isCorrect) button.classList.add("wrong");
    readout.classList.remove("hidden");
    readout.className = "readout " + (isCorrect ? "ok" : "no");
    readout.innerHTML = `<b>${isCorrect ? "✅ Correct" : "❌ Not quite"}</b> — ${currentSignal.name} ${mode === "air" ? "to an aircraft in flight" : "to an aircraft on the ground"} means <b>${currentSignal.meaning}</b>.`;
    scoreLabel.textContent = `Score: ${correctCount}/${attemptCount}`;
  });

  element.querySelectorAll("[data-mode]").forEach(button => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      element.querySelectorAll("[data-mode]").forEach(other => other.classList.toggle("ghost", other !== button));
      showSignal();
    });
  });
  element.querySelector(".next-signal").addEventListener("click", showSignal);
  showSignal();
}

function mountDeclaredDistances(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Runway length: <span class="mono" data-out="runway"></span><input type="range" min="500" max="1600" step="50" value="1000" data-in="runway"></label>
      <label>Displaced threshold: <span class="mono" data-out="displaced"></span><input type="range" min="0" max="400" step="10" value="150" data-in="displaced"></label>
      <label>Stopway: <span class="mono" data-out="stopway"></span><input type="range" min="0" max="300" step="10" value="100" data-in="stopway"></label>
      <label>Clearway: <span class="mono" data-out="clearway"></span><input type="range" min="0" max="600" step="10" value="250" data-in="clearway"></label>
    </div>
    <svg class="sim-svg" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg"></svg>
    <div class="readout"></div>`;
  const svg = element.querySelector("svg");
  const readout = element.querySelector(".readout");
  const inputs = {};
  element.querySelectorAll("[data-in]").forEach(input => { inputs[input.dataset.in] = input; });

  function update() {
    const runway = Number(inputs.runway.value);
    const displaced = Math.min(Number(inputs.displaced.value), runway - 100);
    const stopway = Number(inputs.stopway.value);
    const clearway = Number(inputs.clearway.value);
    element.querySelector('[data-out="runway"]').textContent = runway + " m";
    element.querySelector('[data-out="displaced"]').textContent = displaced + " m";
    element.querySelector('[data-out="stopway"]').textContent = stopway + " m";
    element.querySelector('[data-out="clearway"]').textContent = clearway + " m";
    const tora = runway;
    const toda = runway + clearway;
    const asda = runway + stopway;
    const lda = runway - displaced;
    const scale = 800 / (runway + Math.max(stopway, clearway) + 20);
    const startX = 40;
    const runwayEndX = startX + runway * scale;
    let arrows = "";
    for (let x = startX + 12; x < startX + displaced * scale - 20; x += 40) {
      arrows += `<rect x="${x}" y="68" width="14" height="3" fill="#fff"/><polygon points="${x + 14},63 ${x + 22},69.5 ${x + 14},76" fill="#fff"/>`;
    }
    let chevrons = "";
    for (let x = runwayEndX + 6; x < runwayEndX + stopway * scale - 10; x += 22) {
      chevrons += `<polyline points="${x + 12},48 ${x},70 ${x + 12},92" fill="none" stroke="#ffd600" stroke-width="3"/>`;
    }
    const bar = (label, value, fromX, y, colour) => `
      <rect x="${fromX}" y="${y}" width="${Math.max(value * scale, 2)}" height="22" rx="5" fill="${colour}"/>
      <text x="${fromX + 8}" y="${y + 15.5}" font-size="13" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${label} ${value} m</text>`;
    svg.innerHTML = `
      <rect width="900" height="330" fill="#5b8a3c"/>
      <rect x="${runwayEndX}" y="22" width="${clearway * scale}" height="96" fill="rgba(120,190,255,.25)" stroke="#bfe0ff" stroke-dasharray="6 4"/>
      ${clearway ? `<text x="${runwayEndX + clearway * scale / 2}" y="16" text-anchor="middle" font-size="12" fill="#fff" font-family="Inter,sans-serif">clearway (obstacle-free climb area)</text>` : ""}
      <rect x="${startX}" y="40" width="${runway * scale}" height="60" fill="#4a4f57"/>
      ${stopway ? `<rect x="${runwayEndX}" y="40" width="${stopway * scale}" height="60" fill="#666b73"/>` : ""}
      ${chevrons}${arrows}
      ${displaced ? `<rect x="${startX + displaced * scale - 5}" y="40" width="5" height="60" fill="#fff"/>` : `<rect x="${startX}" y="40" width="5" height="60" fill="#fff"/>`}
      <text x="${startX}" y="130" font-size="12" fill="#fff" font-family="Inter,sans-serif">Take-off & landing direction →</text>
      ${displaced ? `<text x="${startX + displaced * scale / 2}" y="34" text-anchor="middle" font-size="11" fill="#fff" font-family="Inter,sans-serif">displaced</text>` : ""}
      ${stopway ? `<text x="${runwayEndX + stopway * scale / 2}" y="112" text-anchor="middle" font-size="11" fill="#fff" font-family="Inter,sans-serif">stopway</text>` : ""}
      ${bar("TORA", tora, startX, 150, "#1d5bd6")}
      ${bar("TODA", toda, startX, 192, "#0f8fa8")}
      ${bar("ASDA", asda, startX, 234, "#b7791f")}
      ${bar("LDA", lda, startX + displaced * scale, 276, "#16834a")}`;
    const clearwayWarning = clearway > tora / 2 ? `<br>⚠️ Clearway (${clearway} m) is more than half the TORA — Annex 14 says it should not normally exceed half the TORA.` : "";
    readout.innerHTML = `<span class="mono">TORA = ${tora}</span> · <span class="mono">TODA = ${tora} + ${clearway} = ${toda}</span> · <span class="mono">ASDA/EDA = ${tora} + ${stopway} = ${asda}</span> · <span class="mono">LDA = ${runway} − ${displaced} = ${lda}</span>${clearwayWarning}`;
  }
  Object.values(inputs).forEach(input => input.addEventListener("input", update));
  update();
}

function mountPapi(element) {
  const unitAngles = [2.5, 2.83, 3.17, 3.5];
  element.innerHTML = `
    <div class="sim-controls"><label>Your approach angle: <span class="mono papi-angle"></span><input type="range" min="1.5" max="4.5" step="0.05" value="3" class="papi-input"></label></div>
    <div class="two-col">
      <div class="lights-panel papi-lights" style="gap:18px"></div>
      <svg class="sim-svg papi-side" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <div class="readout papi-readout"></div>`;
  const input = element.querySelector(".papi-input");
  const lightsPanel = element.querySelector(".papi-lights");
  const sideView = element.querySelector(".papi-side");
  const readout = element.querySelector(".papi-readout");
  const messages = ["Too HIGH (all white)", "Slightly high", "ON the glide path ✓", "Slightly low", "Too LOW (all red) — climb!"];

  function update() {
    const angle = Number(input.value);
    element.querySelector(".papi-angle").textContent = angle.toFixed(2) + "°";
    const lightColours = unitAngles.map(unitAngle => angle > unitAngle ? "white" : "red");
    const redCount = lightColours.filter(colour => colour === "red").length;
    lightsPanel.innerHTML = lightColours.map(colour => `<div class="nav-lamp on ${colour}"></div>`).join("") + '<div style="color:#c8d2ea;font-size:12px;margin-left:6px">runway →</div>';
    const exaggeration = 6;
    const touchdownX = 360;
    const groundY = 140;
    const aircraftDistance = 260;
    const glideY = groundY - Math.tan(3 * exaggeration * Math.PI / 180) * aircraftDistance;
    const aircraftY = groundY - Math.tan(angle * exaggeration * Math.PI / 180) * aircraftDistance;
    sideView.innerHTML = `
      <rect width="400" height="160" fill="#dcecfb"/>
      <rect y="${groundY}" width="400" height="20" fill="#5b8a3c"/>
      <rect x="320" y="${groundY - 3}" width="80" height="6" fill="#4a4f57"/>
      <line x1="${touchdownX}" y1="${groundY}" x2="${touchdownX - aircraftDistance - 40}" y2="${groundY - Math.tan(3 * exaggeration * Math.PI / 180) * (aircraftDistance + 40)}" stroke="#16834a" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="40" y="${glideY - 8}" font-size="11" fill="#16834a" font-family="Inter,sans-serif">3° glide path (exaggerated)</text>
      <circle cx="${touchdownX - aircraftDistance}" cy="${Math.max(aircraftY, 8)}" r="7" fill="#1d5bd6"/>
      <text x="${touchdownX - aircraftDistance + 12}" y="${Math.max(aircraftY, 8) + 4}" font-size="11" fill="#13203b" font-family="Inter,sans-serif">you</text>`;
    readout.className = "papi-readout readout " + (redCount === 2 ? "ok" : (redCount === 0 || redCount === 4 ? "no" : ""));
    readout.innerHTML = `<b>${4 - redCount} white, ${redCount} red</b> → ${messages[redCount]}`;
  }
  input.addEventListener("input", update);
  update();
}

function normaliseAngle(angle) {
  let result = ((angle % 360) + 360) % 360;
  if (result > 180) result -= 360;
  return result;
}

function wedgePath(centreX, centreY, radius, fromAngle, toAngle) {
  const point = angle => {
    const radians = (angle - 90) * Math.PI / 180;
    return [centreX + radius * Math.cos(radians), centreY + radius * Math.sin(radians)];
  };
  const [x1, y1] = point(fromAngle);
  const [x2, y2] = point(toAngle);
  const largeArc = toAngle - fromAngle > 180 ? 1 : 0;
  return `M${centreX} ${centreY} L${x1} ${y1} A${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function mountNavLights(element) {
  element.innerHTML = `
    <div class="preset-row">
      <button class="btn small ghost" data-preset="60,270">Converging from right</button>
      <button class="btn small ghost" data-preset="300,90">Converging from left</button>
      <button class="btn small ghost" data-preset="0,180">Head-on</button>
      <button class="btn small ghost" data-preset="0,0">You're behind it</button>
    </div>
    <div class="sim-controls">
      <label>Where is it? Relative bearing from you: <span class="mono nl-bearing"></span><input type="range" min="0" max="359" value="60" class="nl-bearing-input"></label>
      <label>Its heading: <span class="mono nl-heading"></span><input type="range" min="0" max="359" value="270" class="nl-heading-input"></label>
    </div>
    <div class="two-col">
      <svg class="sim-svg" viewBox="0 0 320 320" style="background:#0a1430" xmlns="http://www.w3.org/2000/svg"></svg>
      <div>
        <div class="lights-panel">
          <div><div class="nav-lamp red nl-red"></div><div class="lamp-label">red</div></div>
          <div><div class="nav-lamp green nl-green"></div><div class="lamp-label">green</div></div>
          <div><div class="nav-lamp white nl-white"></div><div class="lamp-label">white</div></div>
        </div>
        <div class="lamp-label" style="color:var(--muted)">What you see of the other aircraft</div>
        <div class="readout nl-readout"></div>
      </div>
    </div>`;
  const bearingInput = element.querySelector(".nl-bearing-input");
  const headingInput = element.querySelector(".nl-heading-input");
  const svg = element.querySelector("svg");
  const readout = element.querySelector(".nl-readout");

  function update() {
    const bearing = Number(bearingInput.value);
    const heading = Number(headingInput.value);
    element.querySelector(".nl-bearing").textContent = String(bearing).padStart(3, "0") + "°";
    element.querySelector(".nl-heading").textContent = String(heading).padStart(3, "0") + "°";
    const otherX = 160 + 110 * Math.sin(bearing * Math.PI / 180);
    const otherY = 160 - 110 * Math.cos(bearing * Math.PI / 180);
    const directionToMe = (bearing + 180) % 360;
    const relativeAngle = normaliseAngle(directionToMe - heading);
    const seesGreen = relativeAngle >= -2 && relativeAngle <= 110;
    const seesRed = relativeAngle <= 2 && relativeAngle >= -110;
    const seesWhite = Math.abs(relativeAngle) >= 110;
    element.querySelector(".nl-red").classList.toggle("on", seesRed);
    element.querySelector(".nl-green").classList.toggle("on", seesGreen);
    element.querySelector(".nl-white").classList.toggle("on", seesWhite);
    svg.innerHTML = `
      <circle cx="160" cy="160" r="110" fill="none" stroke="#25345a" stroke-dasharray="4 5"/>
      <path d="${wedgePath(otherX, otherY, 46, heading - 110, heading)}" fill="rgba(255,59,59,.28)"/>
      <path d="${wedgePath(otherX, otherY, 46, heading, heading + 110)}" fill="rgba(61,255,138,.25)"/>
      <path d="${wedgePath(otherX, otherY, 46, heading + 110, heading + 250)}" fill="rgba(255,255,255,.15)"/>
      <line x1="160" y1="160" x2="${otherX}" y2="${otherY}" stroke="#ffd600" stroke-dasharray="3 4"/>
      ${aircraftIcon(160, 160, 0, "#6f9dff", 1.3)}
      ${aircraftIcon(otherX, otherY, heading, "#c8d2ea", 1.1)}
      <text x="160" y="200" text-anchor="middle" font-size="12" fill="#6f9dff" font-family="Inter,sans-serif" font-weight="700">YOU (heading north)</text>
      <text x="12" y="20" font-size="11" fill="#8a97b8" font-family="Inter,sans-serif">Top view · coloured wedges = its light arcs</text>`;
    const otherOnMyRight = bearing > 8 && bearing < 172;
    const otherOnMyLeft = bearing > 188 && bearing < 352;
    let verdict;
    if (seesRed && seesGreen) {
      verdict = "<b>Red AND green — head-on.</b> Both aircraft alter heading to the <b>right</b>.";
    } else if (seesWhite) {
      verdict = "<b>White only — you're behind it</b> (inside its 140° tail arc). If you're closing on it, you are <b>overtaking</b>: keep clear by altering heading to the <b>right</b>.";
    } else if (seesRed) {
      verdict = otherOnMyRight
        ? "<b>Red — and it's on your RIGHT.</b> You're on its left, it's on your right: <b>YOU give way</b> (normally turn right and pass behind). Constant bearing? Act now."
        : "<b>Red</b> — you're on its left side, but it isn't on your right, so your paths are probably crossing away or diverging. Keep it in sight and check the bearing.";
    } else {
      verdict = otherOnMyLeft
        ? "<b>Green — and it's on your LEFT.</b> You're on its right, so <b>IT gives way</b>. Maintain heading and speed — but keep watching; collision avoidance is still your responsibility."
        : "<b>Green</b> — you're on its right side but it isn't on your left, so paths are probably diverging. Keep watching.";
    }
    readout.innerHTML = verdict + '<div style="font-size:12.5px;color:var(--muted);margin-top:6px">Assumes you\'re at about the same level and converging.</div>';
  }
  element.querySelectorAll("[data-preset]").forEach(button => {
    button.addEventListener("click", () => {
      const [bearing, heading] = button.dataset.preset.split(",");
      bearingInput.value = bearing;
      headingInput.value = heading;
      update();
    });
  });
  bearingInput.addEventListener("input", update);
  headingInput.addEventListener("input", update);
  update();
}

const AIRCRAFT_CATEGORIES = {
  powered: { label: "a powered aeroplane", rank: 0 },
  towing: { label: "a powered aircraft seen towing a glider", rank: 1 },
  airship: { label: "an airship", rank: 2 },
  glider: { label: "a glider", rank: 3 },
  balloon: { label: "a hot-air balloon", rank: 4 }
};

const CATEGORY_PAIRS = [["powered", "towing"], ["powered", "airship"], ["powered", "glider"], ["powered", "balloon"], ["airship", "glider"], ["airship", "balloon"], ["glider", "balloon"]];

function makeRightOfWayScenario() {
  const kind = pickRandom(["category", "category", "category", "converging", "converging", "headon", "overtaking", "landing", "gliderLanding", "emergency"]);
  const side = pickRandom(["right", "left"]);
  const sideDiagram = side === "right" ? { x: 205, y: 70, heading: 270 } : { x: 35, y: 70, heading: 90 };
  if (kind === "category") {
    const pair = pickRandom(CATEGORY_PAIRS);
    const swapped = Math.random() < 0.5;
    const mine = swapped ? pair[1] : pair[0];
    const theirs = swapped ? pair[0] : pair[1];
    const youGiveWay = AIRCRAFT_CATEGORIES[mine].rank < AIRCRAFT_CATEGORIES[theirs].rank;
    return {
      text: `You are flying <b>${AIRCRAFT_CATEGORIES[mine].label}</b>. You are converging at the same level with <b>${AIRCRAFT_CATEGORIES[theirs].label}</b>, which is on your <b>${side}</b>.`,
      answer: youGiveWay ? "you" : "other",
      explanation: `The category hierarchy overrides the 'on your right' rule. Order of priority: balloons → gliders → airships → aircraft towing → other powered aircraft. ${youGiveWay ? "You are lower in the order, so <b>you give way</b>." : "The other aircraft is lower in the order, so <b>it gives way</b> — you maintain heading and speed."}`,
      diagram: sideDiagram
    };
  }
  if (kind === "converging") {
    return {
      text: `You and another <b>powered aeroplane</b> are converging at about the same level. It is on your <b>${side}</b>.`,
      answer: side === "right" ? "you" : "other",
      explanation: side === "right" ? "It's on your right, so <b>you give way</b> — avoid passing over, under or ahead of it (normally turn right to pass behind)." : "You are on its right, so <b>it gives way</b>. You maintain heading and speed, but stay alert.",
      diagram: sideDiagram
    };
  }
  if (kind === "headon") {
    return { text: "You and another <b>powered aeroplane</b> are approaching head-on at the same level.", answer: "both", explanation: "Head-on: <b>each</b> aircraft alters heading to the <b>right</b>.", diagram: { x: 120, y: 40, heading: 180 } };
  }
  if (kind === "overtaking") {
    return { text: "You are in a <b>powered aeroplane</b> and catching up on another aeroplane from behind, at the same level, on the same track.", answer: "you", explanation: "The overtaken aircraft has right of way. <b>You</b> (the overtaking aircraft) keep out of the way by altering heading to the <b>right</b>, and stay clear until entirely past.", diagram: { x: 120, y: 70, heading: 0 } };
  }
  if (kind === "landing") {
    const youAreHigher = Math.random() < 0.5;
    return {
      text: `You and another powered aeroplane are both approaching to land on the same runway. You are <b>${youAreHigher ? "higher" : "lower"}</b> than the other aircraft.`,
      answer: youAreHigher ? "you" : "other",
      explanation: youAreHigher ? "The <b>higher aircraft gives way to the lower</b> — so you give way." : "The higher aircraft gives way to the lower, so <b>it gives way</b> — but you must not cut in front of another aircraft on final or overtake it.",
      diagram: null
    };
  }
  if (kind === "gliderLanding") {
    return { text: "You are in a <b>powered aeroplane</b> approaching to land. A <b>glider</b> is also approaching to land on the same runway, and it is <b>higher</b> than you.", answer: "you", explanation: "Power-driven aircraft give way to gliders approaching to land — <b>you give way</b>, even though the glider is higher.", diagram: null };
  }
  return { text: "You are on the downwind leg. You hear and see another aircraft declaring that it has an engine problem and is <b>compelled to land</b>.", answer: "you", explanation: "Aircraft must give way to any aircraft known to be <b>compelled to land</b> — <b>you give way</b>.", diagram: null };
}

function mountRightOfWay(element) {
  let scenario = null;
  let correctCount = 0;
  let attemptCount = 0;
  element.innerHTML = `
    <div class="two-col">
      <div>
        <div class="row-text" style="font-size:16px;margin:4px 0 8px"></div>
        <div class="option-list">
          <button class="option" data-answer="you">I give way</button>
          <button class="option" data-answer="other">The other aircraft gives way</button>
          <button class="option" data-answer="both">Both alter heading to the right</button>
        </div>
      </div>
      <svg class="sim-svg row-diagram" viewBox="0 0 240 200" style="background:#cfe3f5" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <div class="readout hidden row-readout"></div>
    <div class="sim-controls"><button class="btn small row-next">Next scenario →</button><span style="margin-left:auto;font-weight:700" class="row-score">Score: 0/0</span></div>`;
  const textElement = element.querySelector(".row-text");
  const diagram = element.querySelector(".row-diagram");
  const readout = element.querySelector(".row-readout");
  const options = element.querySelectorAll(".option");

  function showScenario() {
    scenario = makeRightOfWayScenario();
    textElement.innerHTML = scenario.text;
    readout.classList.add("hidden");
    options.forEach(option => { option.disabled = false; option.classList.remove("correct", "wrong"); });
    if (scenario.diagram) {
      diagram.innerHTML = `${aircraftIcon(120, 150, 0, "#1d5bd6", 1.5)}<text x="120" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="#1d5bd6" font-family="Inter,sans-serif">YOU</text>${aircraftIcon(scenario.diagram.x, scenario.diagram.y, scenario.diagram.heading, "#d32f2f", 1.5)}<text x="${scenario.diagram.x}" y="${scenario.diagram.y - 24}" text-anchor="middle" font-size="12" font-weight="700" fill="#d32f2f" font-family="Inter,sans-serif">OTHER</text>`;
    } else {
      diagram.innerHTML = `<rect x="20" y="170" width="200" height="12" fill="#4a4f57"/><text x="120" y="100" text-anchor="middle" font-size="40">🛬</text><text x="120" y="130" text-anchor="middle" font-size="12" fill="#13203b" font-family="Inter,sans-serif">landing / circuit situation</text>`;
    }
  }
  options.forEach(option => option.addEventListener("click", () => {
    if (option.disabled) return;
    attemptCount++;
    const isCorrect = option.dataset.answer === scenario.answer;
    if (isCorrect) correctCount++;
    options.forEach(other => {
      other.disabled = true;
      if (other.dataset.answer === scenario.answer) other.classList.add("correct");
    });
    if (!isCorrect) option.classList.add("wrong");
    readout.className = "readout row-readout " + (isCorrect ? "ok" : "no");
    readout.innerHTML = `<b>${isCorrect ? "✅ Correct." : "❌ Not quite."}</b> ${scenario.explanation}`;
    element.querySelector(".row-score").textContent = `Score: ${correctCount}/${attemptCount}`;
  }));
  element.querySelector(".row-next").addEventListener("click", showScenario);
  showScenario();
}

function mountLowFlying(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Area<select class="lf-area"><option value="open">Open countryside</option><option value="congested">Congested area (town/city)</option><option value="assembly">Open-air assembly of people</option></select></label>
      <label>Height above highest obstacle in the relevant radius: <span class="mono lf-height-out"></span><input type="range" min="0" max="2000" step="50" value="600" class="lf-height"></label>
      <label>Closest distance to any person, vessel, vehicle or structure: <span class="mono lf-distance-out"></span><input type="range" min="0" max="2000" step="50" value="700" class="lf-distance"></label>
    </div>
    <div class="sim-controls">
      <label class="check"><input type="checkbox" class="lf-takeoff"> Taking off or landing (normal aviation practice)</label>
      <label class="check"><input type="checkbox" class="lf-glide" checked> Could glide clear of the built-up area if the engine failed</label>
    </div>
    <div class="readout lf-readout"></div>`;
  const area = element.querySelector(".lf-area");
  const height = element.querySelector(".lf-height");
  const distance = element.querySelector(".lf-distance");
  const takeoff = element.querySelector(".lf-takeoff");
  const glide = element.querySelector(".lf-glide");
  const readout = element.querySelector(".lf-readout");

  function update() {
    const heightValue = Number(height.value);
    const distanceValue = Number(distance.value);
    element.querySelector(".lf-height-out").textContent = heightValue + " ft";
    element.querySelector(".lf-distance-out").textContent = distanceValue + " ft";
    const checks = [];
    if (takeoff.checked) {
      checks.push({ ok: true, text: "Taking off / landing in accordance with normal aviation practice is exempt from these minima (you must still not endanger anyone)." });
    } else if (area.value === "open") {
      checks.push({ ok: distanceValue >= 500, text: `UK rule: at least 500 ft from any person, vessel, vehicle or structure — you are ${distanceValue} ft away.` });
      checks.push({ ok: null, text: `SERA text (500 ft above ground/obstacle within 150 m) — your height ${heightValue} ft. The UK applies the 500 ft distance rule above instead.` });
    } else {
      checks.push({ ok: heightValue >= 1000, text: `At least 1000 ft above the highest obstacle within 600 m — you are at ${heightValue} ft.` });
      checks.push({ ok: glide.checked, text: "High enough to land clear without undue hazard to people or property if the engine fails." });
    }
    const failed = checks.some(check => check.ok === false);
    readout.className = "readout lf-readout " + (failed ? "no" : "ok");
    readout.innerHTML = `<b>${failed ? "❌ Not legal" : "✅ Legal"}</b><ul class="check-list">${checks.map(check => `<li><span>${check.ok === null ? "ℹ️" : (check.ok ? "✅" : "❌")}</span><span>${check.text}</span></li>`).join("")}</ul>`;
  }
  [area, height, distance, takeoff, glide].forEach(input => input.addEventListener("input", update));
  update();
}

function mountCollisionCourse(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <button class="btn small" data-cc="collision">Collision course</button>
      <button class="btn small ghost" data-cc="miss">Safe pass behind</button>
    </div>
    <svg class="sim-svg" viewBox="0 0 420 300" style="background:#cfe3f5" xmlns="http://www.w3.org/2000/svg"></svg>
    <div class="readout cc-readout"></div>`;
  const svg = element.querySelector("svg");
  const readout = element.querySelector(".cc-readout");
  let mode = "collision";
  let tick = 0;
  let firstBearing = null;
  const totalTicks = 220;
  const meStart = { x: 210, y: 285 };
  const conflictPoint = { x: 210, y: 95 };
  const otherStart = { x: 410, y: 30 };

  function positionsAt(time) {
    const myProgress = time / 160;
    const me = { x: meStart.x, y: meStart.y + (conflictPoint.y - meStart.y) * myProgress };
    const otherArrival = mode === "collision" ? 160 : 215;
    const otherProgress = time / otherArrival;
    const other = { x: otherStart.x + (conflictPoint.x - otherStart.x) * otherProgress, y: otherStart.y + (conflictPoint.y - otherStart.y) * otherProgress };
    return { me, other };
  }

  function bearingBetween(me, other) {
    const degrees = Math.atan2(other.x - me.x, me.y - other.y) * 180 / Math.PI;
    return (degrees + 360) % 360;
  }

  function draw() {
    if (!svg.isConnected) return;
    tick = (tick + 1) % (totalTicks + 60);
    const time = Math.min(tick, totalTicks);
    let sightLines = "";
    for (let pastTime = 0; pastTime <= time; pastTime += 25) {
      const { me, other } = positionsAt(pastTime);
      sightLines += `<line x1="${me.x}" y1="${me.y}" x2="${other.x}" y2="${other.y}" stroke="${mode === "collision" ? "#d32f2f" : "#16834a"}" stroke-opacity=".45" stroke-width="1.5"/>`;
    }
    const { me, other } = positionsAt(time);
    const bearing = bearingBetween(me, other);
    if (time === 0) firstBearing = bearing;
    const drift = firstBearing === null ? 0 : bearing - firstBearing;
    svg.innerHTML = `
      ${sightLines}
      <circle cx="${conflictPoint.x}" cy="${conflictPoint.y}" r="6" fill="none" stroke="#d32f2f" stroke-dasharray="3 3"/>
      ${aircraftIcon(me.x, me.y, 0, "#1d5bd6", 1.3)}
      ${aircraftIcon(other.x, other.y, Math.atan2(conflictPoint.x - otherStart.x, otherStart.y - conflictPoint.y) * 180 / Math.PI, "#d32f2f", 1.3)}
      <text x="10" y="290" font-size="12" fill="#13203b" font-family="Inter,sans-serif">Lines = line of sight every few seconds</text>`;
    readout.className = "readout cc-readout " + (mode === "collision" ? "no" : "ok");
    readout.innerHTML = mode === "collision"
      ? `Relative bearing to the other aircraft: <b class="mono">${bearing.toFixed(0)}°</b> (change ${drift.toFixed(1)}°) — <b>constant bearing, closing range → collision course.</b> On the windscreen it would look stationary while growing.`
      : `Relative bearing: <b class="mono">${bearing.toFixed(0)}°</b> (change ${drift.toFixed(1)}°) — the bearing is <b>changing</b>, so it will pass clear (here behind you).`;
    requestAnimationFrame(draw);
  }
  element.querySelectorAll("[data-cc]").forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.cc;
    tick = 0;
    firstBearing = null;
    element.querySelectorAll("[data-cc]").forEach(other => other.classList.toggle("ghost", other !== button));
  }));
  requestAnimationFrame(draw);
}

const SIMULATORS = {
  lights: { title: "Light Signal Trainer", topicId: "light-signals", sub: "Watch the tower's lamp and choose what it means. Switch between in flight and on the ground.", mount: mountLightSignalTrainer },
  declared: { title: "Declared Distances Runway", topicId: "declared-distances", sub: "Drag the sliders and watch TORA, TODA, ASDA and LDA change.", mount: mountDeclaredDistances },
  papi: { title: "PAPI Simulator", topicId: "aerodrome-lighting", sub: "Change your approach angle and see what the PAPI shows.", mount: mountPapi },
  navlights: { title: "Night Navigation Lights", topicId: "night-navigation-lights", sub: "Place another aircraft around you at night. See which of its lights you'd see — and what to do.", mount: mountNavLights },
  rightofway: { title: "Right-of-Way Scenario Trainer", topicId: "in-flight-right-of-way", sub: "Random encounters — decide who gives way.", mount: mountRightOfWay },
  lowflying: { title: "Low Flying Rules Checker", topicId: "low-flying", sub: "Set up a situation and check it against the rules.", mount: mountLowFlying },
  collision: { title: "Constant Bearing = Collision", topicId: "collision-avoidance", sub: "Watch the line of sight: if it stays parallel (constant bearing) you're on a collision course.", mount: mountCollisionCourse }
};

const NOTAM_SUBJECTS = { FA: "Aerodrome", MR: "Runway", MX: "Taxiway", OB: "Obstacle", RT: "Temporary restricted area", RD: "Danger area", RR: "Restricted area", RP: "Prohibited area", WA: "Air display", WP: "Parachute jumping exercise", WE: "Exercises", WU: "Unmanned aircraft", NV: "VOR", NB: "NDB", ND: "DME" };
const NOTAM_CONDITIONS = { LC: "closed", AS: "unserviceable", CA: "activated", CH: "changed", LT: "limited", HW: "work in progress", LW: "will take place", CE: "erected", XX: "see plain-language text" };
const NOTAM_TRAFFIC = { I: "IFR", V: "VFR", IV: "IFR and VFR" };
const NOTAM_PURPOSE = { N: "selected for immediate attention", B: "included in Pre-flight Information Bulletins", O: "significant for flight operations", M: "miscellaneous" };
const NOTAM_SCOPE = { A: "aerodrome", E: "en route", W: "navigation warning", K: "checklist" };
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SAMPLE_NOTAMS = [
  { label: "Aerodrome closed", text: "Q) EGTT/QFALC/IV/NBO/A/000/999/5150N00119W005\nA) EGTK B) 2611250800 C) 2611251600\nE) AD CLSD DUE WORKS IN PROGRESS" },
  { label: "Runway closed at night", text: "Q) EGPX/QMRLC/IV/NBO/A/000/999/5552N00426W005\nA) EGPF B) 2612010000 C) 2612150600 EST\nD) 0000-0600 DAILY\nE) RWY 05/23 CLSD DUE MAINT" },
  { label: "Air display", text: "Q) EGTT/QWALW/IV/M/W/000/080/5130N00030W006\nA) EGTT B) 2607041400 C) 2607041530\nE) AEROBATIC DISPLAY WI 6NM RADIUS 513000N 0003000W. RESTRICTED AREA (TEMPORARY) ESTABLISHED.\nF) SFC G) 8000FT AMSL" },
  { label: "New obstacle", text: "Q) EGTT/QOBCE/IV/M/AE/000/015/5205N00010E002\nA) EGSC B) 2611200900 C) PERM\nE) CRANE ERECTED 1.2NM SE OF AD, 1350FT AMSL, LIT." }
];

function formatNotamTime(value) {
  const match = value.trim().match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\s*EST)?$/);
  if (!match) {
    if (value.trim() === "PERM") return "<b>PERM</b> — permanent (will be incorporated into the AIP)";
    return value;
  }
  const [, year, month, day, hour, minute, estimated] = match;
  return `<b>${Number(day)} ${MONTH_NAMES[Number(month) - 1]} 20${year}, ${hour}:${minute} UTC</b>${estimated ? " — <b>EST</b>imated (may be extended or cancelled)" : ""}`;
}

function decodeQualifier(line) {
  const parts = line.trim().split("/");
  if (parts.length < 8) return `<span class="mono">${line}</span>`;
  const [fir, code, traffic, purpose, scope, lower, upper, area] = parts;
  const subject = NOTAM_SUBJECTS[code.slice(1, 3)] || `subject "${code.slice(1, 3)}"`;
  const condition = NOTAM_CONDITIONS[code.slice(3, 5)] || `condition "${code.slice(3, 5)}"`;
  const purposes = purpose.split("").map(letter => NOTAM_PURPOSE[letter] || letter).join("; ");
  const scopes = scope.split("").map(letter => NOTAM_SCOPE[letter] || letter).join(" + ");
  const areaMatch = area.match(/^(\d{4}[NS])(\d{5}[EW])(\d{3})$/);
  const areaText = areaMatch ? `centred ${areaMatch[1]} ${areaMatch[2]}, radius ${Number(areaMatch[3])} nm` : area;
  return `<ul class="check-list">
    <li><span class="mono">${fir}</span><span>FIR (Flight Information Region)</span></li>
    <li><span class="mono">${code}</span><span><b>${subject} — ${condition}</b> (letters 2–3 subject, 4–5 condition)</span></li>
    <li><span class="mono">${traffic}</span><span>Traffic affected: ${NOTAM_TRAFFIC[traffic] || traffic}</span></li>
    <li><span class="mono">${purpose}</span><span>Purpose: ${purposes}</span></li>
    <li><span class="mono">${scope}</span><span>Scope: ${scopes}</span></li>
    <li><span class="mono">${lower}/${upper}</span><span>Vertical limits: FL${lower} to FL${upper} (hundreds of feet; 000/999 = surface to unlimited)</span></li>
    <li><span class="mono">${area}</span><span>Area: ${areaText}</span></li>
  </ul>`;
}

function mountNotamDecoder(element) {
  element.innerHTML = `
    <div class="preset-row">${SAMPLE_NOTAMS.map((sample, index) => `<button class="btn small ghost" data-sample="${index}">${sample.label}</button>`).join("")}</div>
    <textarea class="notam-input mono" rows="5" style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font-size:13.5px"></textarea>
    <div class="sim-controls"><button class="btn small notam-decode">Decode NOTAM</button><span style="font-size:13px;color:var(--muted)">Paste your own NOTAM or pick a sample (samples are illustrative).</span></div>
    <div class="readout notam-output"></div>`;
  const input = element.querySelector(".notam-input");
  const output = element.querySelector(".notam-output");
  const fieldNames = { Q: "Qualifier", A: "Location", B: "Valid from", C: "Valid until", D: "Schedule", E: "Text", F: "Lower limit", G: "Upper limit" };

  function decode() {
    const fields = {};
    const pattern = /([QABCDEFG])\)\s*([\s\S]*?)(?=\s+[QABCDEFG]\)|$)/g;
    let match;
    while ((match = pattern.exec(input.value)) !== null) {
      fields[match[1]] = match[2].trim();
    }
    if (!Object.keys(fields).length) {
      output.innerHTML = "Couldn't find any NOTAM fields like <span class=\"mono\">A)</span>, <span class=\"mono\">B)</span>…";
      return;
    }
    output.innerHTML = Object.entries(fields).map(([letter, value]) => {
      let meaning = value;
      if (letter === "Q") meaning = decodeQualifier(value);
      if (letter === "B" || letter === "C") meaning = formatNotamTime(value);
      if (letter === "A") meaning = `<b class="mono">${value}</b> — ICAO location indicator`;
      return `<div style="margin:8px 0"><b class="mono">${letter})</b> <b>${fieldNames[letter]}</b><div style="margin-left:26px">${meaning}</div></div>`;
    }).join("");
  }
  element.querySelectorAll("[data-sample]").forEach(button => button.addEventListener("click", () => {
    input.value = SAMPLE_NOTAMS[Number(button.dataset.sample)].text;
    decode();
  }));
  element.querySelector(".notam-decode").addEventListener("click", decode);
  input.value = SAMPLE_NOTAMS[0].text;
  decode();
}

const AIRCRAFT_DEFECTS = [
  { text: "None open", airworthy: true },
  { text: "None open", airworthy: true },
  { text: "Rear seat cover torn", airworthy: true },
  { text: "Small paint chip on the spinner", airworthy: true },
  { text: "Oil leak from the engine — oil found on the cowling", airworthy: false },
  { text: "Elevator trim stiff and jamming", airworthy: false },
  { text: "Magnetic compass missing from its mount", airworthy: false },
  { text: "Left fuel gauge reading erratically", airworthy: false }
];

function formatDate(date) {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function makePreflightScenario() {
  const today = new Date();
  const dayInMs = 24 * 60 * 60 * 1000;
  const arcValid = Math.random() > 0.2;
  const arcExpiry = new Date(today.getTime() + (arcValid ? (10 + Math.random() * 300) : -(1 + Math.random() * 40)) * dayInMs);
  const currentHours = Math.round((1100 + Math.random() * 900) * 10) / 10;
  const plannedHours = Math.round((0.8 + Math.random() * 1.2) * 10) / 10;
  const checkTight = Math.random() < 0.25;
  const hoursToCheck = checkTight ? Math.round((0.2 + Math.random() * (plannedHours - 0.3)) * 10) / 10 : Math.round((plannedHours + 2 + Math.random() * 35) * 10) / 10;
  const nextCheckDue = Math.round((currentHours + hoursToCheck) * 10) / 10;
  const hoursOk = currentHours + plannedHours <= nextCheckDue;
  const crsSigned = Math.random() > 0.2;
  const defect = pickRandom(AIRCRAFT_DEFECTS);
  const insuranceValid = Math.random() > 0.15;
  const items = [
    { label: "C of A / ARC", value: `ARC expires ${formatDate(arcExpiry)}`, ok: arcValid, reason: arcValid ? "ARC is current." : "ARC has expired — the C of A isn't valid without it." },
    { label: "Maintenance due", value: `Tech log: ${currentHours.toFixed(1)} h · next 50-hour check due at ${nextCheckDue.toFixed(1)} h · planned flight ${plannedHours.toFixed(1)} h`, ok: hoursOk, reason: hoursOk ? `${currentHours.toFixed(1)} + ${plannedHours.toFixed(1)} = ${(currentHours + plannedHours).toFixed(1)} h — within the limit.` : `${currentHours.toFixed(1)} + ${plannedHours.toFixed(1)} = ${(currentHours + plannedHours).toFixed(1)} h — the check would be overdue during your flight.` },
    { label: "Last maintenance", value: crsSigned ? "Brake pads replaced — CRS signed" : "Brake pads replaced — CRS not signed", ok: crsSigned, reason: crsSigned ? "Work has been released to service." : "No CRS: the aircraft hasn't been released to service after maintenance." },
    { label: "Tech log defects", value: defect.text, ok: defect.airworthy, reason: defect.airworthy ? "Nothing here affects airworthiness." : "This affects airworthiness and must be rectified (or properly assessed) before flight." },
    { label: "Insurance", value: insuranceValid ? "Certificate valid" : "Certificate expired last week", ok: insuranceValid, reason: insuranceValid ? "Insured." : "Flying without valid insurance is not allowed." }
  ];
  return { items, go: items.every(item => item.ok) };
}

function mountPreflightCheck(element) {
  let scenario = null;
  let correctCount = 0;
  let attemptCount = 0;
  element.innerHTML = `
    <table class="ref preflight-table"></table>
    <div class="sim-controls">
      <button class="btn preflight-go" style="background:var(--good)">✅ GO</button>
      <button class="btn preflight-nogo" style="background:var(--bad)">⛔ NO-GO</button>
      <span style="margin-left:auto;font-weight:700" class="preflight-score">Score: 0/0</span>
    </div>
    <div class="readout hidden preflight-readout"></div>
    <div class="sim-controls"><button class="btn small ghost preflight-next">Next aircraft →</button></div>
    <p style="font-size:12.5px;color:var(--muted);margin:4px 0 0">Simplified training scenarios — in real life, ask an engineer whenever you're unsure whether a defect affects airworthiness.</p>`;
  const table = element.querySelector(".preflight-table");
  const readout = element.querySelector(".preflight-readout");
  const buttons = [element.querySelector(".preflight-go"), element.querySelector(".preflight-nogo")];

  function showScenario() {
    scenario = makePreflightScenario();
    table.innerHTML = `<tr><th>Item</th><th>What the paperwork shows</th></tr>${scenario.items.map(item => `<tr><td><b>${item.label}</b></td><td>${item.value}</td></tr>`).join("")}`;
    readout.classList.add("hidden");
    buttons.forEach(button => { button.disabled = false; });
  }
  function answer(saysGo) {
    if (buttons[0].disabled) return;
    attemptCount++;
    const isCorrect = saysGo === scenario.go;
    if (isCorrect) correctCount++;
    buttons.forEach(button => { button.disabled = true; });
    readout.className = "readout preflight-readout " + (isCorrect ? "ok" : "no");
    readout.innerHTML = `<b>${isCorrect ? "✅ Correct" : "❌ Not quite"} — this aircraft is a ${scenario.go ? "GO" : "NO-GO"}.</b><ul class="check-list">${scenario.items.map(item => `<li><span>${item.ok ? "✅" : "❌"}</span><span><b>${item.label}:</b> ${item.reason}</span></li>`).join("")}</ul>`;
    element.querySelector(".preflight-score").textContent = `Score: ${correctCount}/${attemptCount}`;
  }
  buttons[0].addEventListener("click", () => answer(true));
  buttons[1].addEventListener("click", () => answer(false));
  element.querySelector(".preflight-next").addEventListener("click", showScenario);
  showScenario();
}

SIMULATORS.notam = { title: "NOTAM Decoder", topicId: "notams", sub: "Pick a sample NOTAM (or paste a real one) and see every field explained.", mount: mountNotamDecoder };
SIMULATORS.preflight = { title: "Pre-Flight Paperwork: Go or No-Go?", topicId: "preflight-docs", sub: "Check each aircraft's documents and decide whether you can fly it.", mount: mountPreflightCheck };

function mountCruisingLevels(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Magnetic track: <span class="mono cl-track-out"></span><input type="range" min="0" max="359" value="90" class="cl-track"></label>
      <label>Flight rules<select class="cl-rules"><option value="VFR">VFR</option><option value="IFR">IFR</option></select></label>
    </div>
    <div class="readout cl-readout"></div>`;
  const track = element.querySelector(".cl-track");
  const rules = element.querySelector(".cl-rules");
  const readout = element.querySelector(".cl-readout");

  function update() {
    const trackValue = Number(track.value);
    element.querySelector(".cl-track-out").textContent = String(trackValue).padStart(3, "0") + "°M";
    const easterly = trackValue <= 179;
    const isVfr = rules.value === "VFR";
    const levels = [];
    for (let thousands = easterly ? 3 : 4; thousands <= 19; thousands += 2) {
      const level = thousands * 10 + (isVfr ? 5 : 0);
      if (level <= 195) levels.push("FL" + String(level).padStart(3, "0"));
    }
    readout.innerHTML = `<b>${easterly ? "000°–179° → ODD" : "180°–359° → EVEN"}${isVfr ? " + 500 ft" : ""}</b><br><span class="mono">${levels.join(" · ")}</span><div style="font-size:12.5px;color:var(--muted);margin-top:6px">Flight levels apply above the transition altitude. VFR stops at FL195.</div>`;
  }
  track.addEventListener("input", update);
  rules.addEventListener("input", update);
  update();
}

function mountVmcChecker(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Airspace class<select class="vmc-class"><option>A</option><option>C</option><option selected>D</option><option>E</option><option>G</option></select></label>
      <label>Level<select class="vmc-band"><option value="high">At or above FL100</option><option value="mid">Below FL100, above 3,000 ft AMSL / 1,000 ft above terrain</option><option value="low" selected>At or below 3,000 ft AMSL / 1,000 ft above terrain</option></select></label>
    </div>
    <div class="sim-controls">
      <label class="check"><input type="checkbox" class="vmc-day" checked> Daytime</label>
      <label class="check"><input type="checkbox" class="vmc-slow" checked> 140 kt IAS or less</label>
    </div>
    <div class="readout vmc-readout"></div>`;
  const airspaceClass = element.querySelector(".vmc-class");
  const band = element.querySelector(".vmc-band");
  const day = element.querySelector(".vmc-day");
  const slow = element.querySelector(".vmc-slow");
  const readout = element.querySelector(".vmc-readout");

  function update() {
    const classValue = airspaceClass.value;
    if (classValue === "A") {
      readout.className = "readout vmc-readout no";
      readout.innerHTML = "<b>VFR is not permitted in Class A.</b>";
      return;
    }
    let visibility = "5 km";
    let cloud = "1,500 m horizontally, 1,000 ft vertically";
    if (band.value === "high") visibility = "8 km";
    if (band.value === "low" && classValue === "G") cloud = "Clear of cloud, surface in sight";
    let alternative = "";
    const ukAlternativeApplies = band.value === "low" && day.checked && slow.checked;
    if (ukAlternativeApplies && classValue === "D") alternative = "<b>UK alternative applies:</b> 5 km, clear of cloud, surface in sight.";
    if (ukAlternativeApplies && classValue === "G") alternative = "<b>UK alternative applies:</b> 1,500 m flight visibility, clear of cloud, surface in sight.";
    if (band.value === "low" && (classValue === "D" || classValue === "G") && !ukAlternativeApplies) alternative = "UK alternative minima need <b>daytime</b> and <b>140 kt or less</b>.";
    readout.className = "readout vmc-readout ok";
    readout.innerHTML = `<b>Standard minima (Class ${classValue}):</b> flight visibility <b>${visibility}</b> · ${cloud}${alternative ? `<div style="margin-top:6px">${alternative}</div>` : ""}${classValue === "C" || classValue === "D" ? '<div style="font-size:12.5px;color:var(--muted);margin-top:6px">VFR here also needs an ATC clearance. Below VMC in a control zone? Ask for Special VFR.</div>' : ""}`;
  }
  [airspaceClass, band, day, slow].forEach(input => input.addEventListener("input", update));
  update();
}

SIMULATORS.levels = { title: "Cruising Level Finder", topicId: "cruising-levels", sub: "Pick a magnetic track and flight rules to see the correct cruising levels.", mount: mountCruisingLevels };
SIMULATORS.vmc = { title: "VMC Minima Checker", topicId: "vmc-minima", sub: "Choose the airspace class and level to see the VFR weather minima.", mount: mountVmcChecker };

const SIGNAL_DECKS = {
  marshalling: [
    { prompt: "Pilot: raises arm and hand with fingers extended horizontally in front of face, then clenches fist", answer: "Brakes engaged" },
    { prompt: "Pilot: raises arm with fist clenched horizontally in front of face, then extends fingers", answer: "Brakes released" },
    { prompt: "Pilot: arms extended, palms outwards, moves hands inwards to cross in front of face", answer: "Insert chocks" },
    { prompt: "Pilot: hands crossed in front of face, palms outwards, moves arms outwards", answer: "Remove chocks" },
    { prompt: "Pilot: raises a number of fingers on one hand", answer: "Ready to start that engine number" },
    { prompt: "Marshaller: arms extended at 90° to the sides, slowly raised above the head until the wands cross", answer: "Normal stop" },
    { prompt: "Marshaller: arms abruptly raised to the top of the head, wands crossed", answer: "Emergency stop" },
    { prompt: "Marshaller: wand drawn across the throat in a slicing motion", answer: "Cut engines" },
    { prompt: "Marshaller: extended arms moved downwards in a patting gesture, waist to knees", answer: "Slow down" },
    { prompt: "Marshaller: arms above head, wands jabbed inwards until they touch", answer: "Chocks inserted" },
    { prompt: "Marshaller: arms above head, wands jabbed outwards", answer: "Chocks removed" }
  ],
  signals: [
    { prompt: "Interceptor rocks its wings and flashes its lights, then makes a slow level turn", answer: "You have been intercepted — follow me" },
    { prompt: "Interceptor makes an abrupt climbing turn of 90° or more without crossing your path", answer: "You may proceed" },
    { prompt: "Interceptor lowers its gear, shows steady landing lights and overflies the runway", answer: "Land at this aerodrome" },
    { prompt: "Red and green stars fired from the ground every 10 seconds", answer: "You are in or near a restricted, prohibited or danger area" },
    { prompt: "Ground signal laid out by survivors: V", answer: "Require assistance" },
    { prompt: "Ground signal laid out by survivors: X", answer: "Require medical assistance" },
    { prompt: "Ground signal laid out by survivors: N", answer: "No or negative" },
    { prompt: "Ground signal laid out by survivors: Y", answer: "Yes or affirmative" },
    { prompt: "Ground signal laid out by survivors: ↑", answer: "Proceeding in this direction" }
  ],
  codes: [
    { prompt: "Squawk 7700", answer: "Emergency" },
    { prompt: "Squawk 7600", answer: "Radio failure" },
    { prompt: "Squawk 7500", answer: "Unlawful interference" },
    { prompt: "Squawk 7000", answer: "UK conspicuity code" },
    { prompt: "Squawk 2000", answer: "Entering an FIR with no code assigned" },
    { prompt: "INCERFA", answer: "Uncertainty phase" },
    { prompt: "ALERFA", answer: "Alert phase" },
    { prompt: "DETRESFA", answer: "Distress phase" },
    { prompt: "MAYDAY MAYDAY MAYDAY", answer: "Distress — immediate assistance required" },
    { prompt: "PAN PAN, PAN PAN, PAN PAN", answer: "Urgency — no immediate assistance required" },
    { prompt: "121.5 MHz", answer: "International emergency frequency" },
    { prompt: "Call sign suffix 'Radio'", answer: "Air/Ground Communication Service" },
    { prompt: "Call sign suffix 'Information'", answer: "Aerodrome Flight Information Service" }
  ]
};

function mountDeckTrainer(element, deckName) {
  const deck = SIGNAL_DECKS[deckName];
  let reversed = false;
  let current = null;
  let correctCount = 0;
  let attemptCount = 0;
  element.innerHTML = `
    <div class="sim-controls">
      <button class="btn small" data-direction="forward">Signal → meaning</button>
      <button class="btn small ghost" data-direction="reverse">Meaning → signal</button>
      <span style="margin-left:auto;font-weight:700" class="deck-score">Score: 0/0</span>
    </div>
    <div class="readout deck-prompt" style="font-size:16px;font-weight:600"></div>
    <div class="option-list deck-options"></div>
    <div class="readout hidden deck-feedback"></div>
    <div class="sim-controls"><button class="btn small deck-next">Next →</button></div>`;
  const promptBox = element.querySelector(".deck-prompt");
  const optionList = element.querySelector(".deck-options");
  const feedback = element.querySelector(".deck-feedback");

  function showCard() {
    current = pickRandom(deck);
    const questionText = reversed ? current.answer : current.prompt;
    const correctText = reversed ? current.prompt : current.answer;
    const distractors = shuffle(deck.filter(card => card !== current)).slice(0, 3).map(card => reversed ? card.prompt : card.answer);
    promptBox.textContent = questionText;
    optionList.innerHTML = shuffle([correctText, ...distractors]).map(text => `<button class="option" data-correct="${text === correctText}">${text}</button>`).join("");
    feedback.classList.add("hidden");
  }
  optionList.addEventListener("click", event => {
    const button = event.target.closest(".option");
    if (!button || button.disabled) return;
    attemptCount++;
    const isCorrect = button.dataset.correct === "true";
    if (isCorrect) correctCount++;
    optionList.querySelectorAll(".option").forEach(option => {
      option.disabled = true;
      if (option.dataset.correct === "true") option.classList.add("correct");
    });
    if (!isCorrect) button.classList.add("wrong");
    feedback.className = "readout deck-feedback " + (isCorrect ? "ok" : "no");
    feedback.innerHTML = `<b>${isCorrect ? "✅ Correct" : "❌ Not quite"}</b> — ${current.prompt} → <b>${current.answer}</b>`;
    element.querySelector(".deck-score").textContent = `Score: ${correctCount}/${attemptCount}`;
  });
  element.querySelectorAll("[data-direction]").forEach(button => button.addEventListener("click", () => {
    reversed = button.dataset.direction === "reverse";
    element.querySelectorAll("[data-direction]").forEach(other => other.classList.toggle("ghost", other !== button));
    showCard();
  }));
  element.querySelector(".deck-next").addEventListener("click", showCard);
  showCard();
}

function mountAltimeterSimulator(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Local QNH: <span class="mono alt-qnh-out"></span><input type="range" min="980" max="1040" value="1003" class="alt-qnh"></label>
      <label>Aerodrome elevation: <span class="mono alt-elev-out"></span><input type="range" min="0" max="1000" step="10" value="270" class="alt-elev"></label>
      <label>Your true altitude: <span class="mono alt-true-out"></span><input type="range" min="0" max="7000" step="50" value="2500" class="alt-true"></label>
    </div>
    <div class="two-col">
      <div class="readout alt-readings"></div>
      <div class="readout alt-transition"></div>
    </div>
`;
  const read = selector => Number(element.querySelector(selector).value);
  const feetPerHectopascal = 30;

  function update() {
    const qnh = read(".alt-qnh");
    const elevation = read(".alt-elev");
    const trueAltitude = read(".alt-true");
    element.querySelector(".alt-qnh-out").textContent = qnh + " hPa";
    element.querySelector(".alt-elev-out").textContent = elevation + " ft";
    element.querySelector(".alt-true-out").textContent = trueAltitude + " ft AMSL";
    const qfe = qnh - Math.round(elevation / feetPerHectopascal);
    const pressureAltitude = trueAltitude + (1013 - qnh) * feetPerHectopascal;
    const transitionAltitude = 3000;
    let transitionLevel = 35;
    while (transitionLevel * 100 - (1013 - qnh) * feetPerHectopascal < transitionAltitude + 500) transitionLevel += 5;
    element.querySelector(".alt-readings").innerHTML = `
      <b>What the altimeter reads</b>
      <ul class="check-list">
        <li><span class="mono">QNH ${qnh}</span><span>→ <b>${trueAltitude} ft</b> altitude</span></li>
        <li><span class="mono">QFE ${qfe}</span><span>→ <b>${trueAltitude - elevation} ft</b> height above the aerodrome</span></li>
        <li><span class="mono">1013</span><span>→ <b>${Math.round(pressureAltitude)} ft</b> pressure altitude = <b>FL${String(Math.round(pressureAltitude / 100)).padStart(3, "0")}</b></span></li>
      </ul>
      <div style="font-size:12.5px;color:var(--muted)">Using 1 hPa ≈ 30 ft. QFE ≈ QNH − elevation ÷ 30.</div>`;
    const belowTransition = trueAltitude <= transitionAltitude;
    element.querySelector(".alt-transition").innerHTML = `
      <b>Transition (TA ${transitionAltitude} ft)</b>
      <p style="margin:6px 0">With QNH ${qnh}, the transition level would be around <b>FL${String(transitionLevel).padStart(3, "0")}</b> (illustrative — ATC/AIP publish the actual TL).</p>
      <p style="margin:6px 0">${qnh < 1013 ? "Low QNH → the transition layer is <b>thicker</b>." : "High QNH → the transition layer is <b>thinner</b>."}</p>
      <p style="margin:6px 0">At ${trueAltitude} ft you should be using <b>${belowTransition ? "QNH (altitude)" : "1013 (flight level) once above the transition altitude"}</b>.</p>`;
  }
  element.querySelectorAll("input").forEach(input => input.addEventListener("input", update));
  update();
}

function addMonths(date, months) {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result;
}

function mountDateCalculator(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Your date of birth<input type="date" class="dc-birth" value="1983-06-15"></label>
      <label>Date of Class 2 medical<input type="date" class="dc-medical" value="2026-11-21"></label>
      <label>SEP skill test / last revalidation date<input type="date" class="dc-sep" value="2025-03-10"></label>
      <label>Date of your 3rd most recent landing<input type="date" class="dc-landing" value="2026-10-01"></label>
    </div>
    <div class="readout dc-output"></div>`;
  const output = element.querySelector(".dc-output");
  const dateValue = selector => {
    const value = element.querySelector(selector).value;
    return value ? new Date(value + "T12:00:00") : null;
  };
  const birthdayAt = (birth, age) => new Date(birth.getFullYear() + age, birth.getMonth(), birth.getDate(), 12);

  function update() {
    const birth = dateValue(".dc-birth");
    const medical = dateValue(".dc-medical");
    const sep = dateValue(".dc-sep");
    const landing = dateValue(".dc-landing");
    const lines = [];
    if (birth && medical) {
      let ageAtExam = medical.getFullYear() - birth.getFullYear();
      if (medical < birthdayAt(birth, ageAtExam)) ageAtExam--;
      let months = 12;
      let capAge = null;
      if (ageAtExam < 40) { months = 60; capAge = 42; }
      else if (ageAtExam < 50) { months = 24; capAge = 51; }
      let expiry = addMonths(medical, months);
      let capped = false;
      if (capAge !== null && expiry > birthdayAt(birth, capAge)) { expiry = birthdayAt(birth, capAge); capped = true; }
      lines.push(`<li><span>🩺</span><span><b>Class 2 medical</b> (age ${ageAtExam} at exam → ${months} months${capped ? `, capped at your ${capAge}${capAge === 42 ? "nd" : "st"} birthday` : ""}): valid until <b>${formatDate(expiry)}</b></span></li>`);
    }
    if (sep) {
      const endOfTestMonth = new Date(sep.getFullYear(), sep.getMonth() + 1, 0, 12);
      const expiry = new Date(endOfTestMonth.getFullYear() + 2, endOfTestMonth.getMonth() + 1, 0, 12);
      const windowStart = addMonths(expiry, -3);
      const experienceStart = addMonths(expiry, -12);
      lines.push(`<li><span>🛩️</span><span><b>SEP rating</b>: expires <b>${formatDate(expiry)}</b> (24 months from the end of ${MONTH_NAMES[sep.getMonth()]} ${sep.getFullYear()}). Proficiency-check window opens ${formatDate(windowStart)}; experience must be flown from ${formatDate(experienceStart)}.</span></li>`);
    }
    if (landing) {
      const lastDay = new Date(landing.getTime() + 90 * 24 * 60 * 60 * 1000);
      const today = new Date();
      lines.push(`<li><span>👥</span><span><b>Passenger currency</b>: you can carry passengers until <b>${formatDate(lastDay)}</b> (90 days) — ${today <= lastDay ? "✅ current today" : "❌ lapsed — fly 3 take-offs and landings solo or with an instructor first"}.</span></li>`);
    }
    output.innerHTML = `<ul class="check-list">${lines.join("")}</ul><div style="font-size:12.5px;color:var(--muted)">Study aid only — always check the dates printed on your own licence and medical.</div>`;
  }
  element.querySelectorAll("input").forEach(input => input.addEventListener("input", update));
  update();
}

const AIRSPACE_RULES = {
  A: { IFR: ["Permitted", "Clearance required", "Two-way radio required", "Separated from all traffic", "No speed limit"], VFR: null },
  C: { IFR: ["Permitted", "Clearance required", "Two-way radio required", "Separated from IFR and VFR", "No speed limit"], VFR: ["Permitted", "Clearance required", "Two-way radio required", "Separated from IFR; traffic information on VFR", "250 kt IAS below FL100"] },
  D: { IFR: ["Permitted", "Clearance required", "Two-way radio required", "Separated from IFR; traffic information on VFR", "250 kt IAS below FL100"], VFR: ["Permitted", "Clearance required", "Two-way radio required", "Not separated; traffic information on all traffic", "250 kt IAS below FL100"] },
  E: { IFR: ["Permitted", "Clearance required", "Two-way radio required", "Separated from IFR; traffic information where practicable", "250 kt IAS below FL100"], VFR: ["Permitted", "No clearance needed", "Radio not required", "Not separated; traffic information where practicable", "250 kt IAS below FL100"] },
  G: { IFR: ["Permitted", "No clearance needed", "Radio not required (UK FIS available)", "Not separated", "250 kt IAS below FL100"], VFR: ["Permitted", "No clearance needed", "Radio not required (UK FIS available)", "Not separated", "250 kt IAS below FL100"] }
};

function mountAirspaceExplorer(element) {
  element.innerHTML = `
    <div class="sim-controls">
      <label>Airspace class<select class="ae-class"><option>A</option><option>C</option><option selected>D</option><option>E</option><option>G</option></select></label>
      <label>Flight rules<select class="ae-rules"><option>VFR</option><option>IFR</option></select></label>
    </div>
    <div class="readout ae-output"></div>`;
  const labels = ["Allowed?", "ATC clearance", "Radio", "Separation / service", "Speed limit"];

  function update() {
    const classValue = element.querySelector(".ae-class").value;
    const rules = element.querySelector(".ae-rules").value;
    const facts = AIRSPACE_RULES[classValue][rules];
    const output = element.querySelector(".ae-output");
    if (!facts) {
      output.className = "readout ae-output no";
      output.innerHTML = `<b>VFR is not permitted in Class ${classValue}.</b>`;
      return;
    }
    output.className = "readout ae-output";
    output.innerHTML = `<table class="ref" style="margin:0">${facts.map((fact, index) => `<tr><td><b>${labels[index]}</b></td><td>${fact}</td></tr>`).join("")}</table>`;
  }
  element.querySelectorAll("select").forEach(select => select.addEventListener("input", update));
  update();
}

SIMULATORS.altimeter = { title: "Altimeter Simulator", topicId: "altimeter-settings", sub: "See what QNH, QFE and 1013 make the altimeter read, and where the transition layer sits.", mount: mountAltimeterSimulator };
SIMULATORS.airspace = { title: "Airspace Requirements Explorer", topicId: "airspace-classes", sub: "Pick a class and flight rules to see what you need and what ATC provides.", mount: mountAirspaceExplorer };
SIMULATORS.dates = { title: "Licence & Currency Date Calculator", topicId: "medical-certificates", sub: "Work out medical expiry, SEP rating expiry and passenger currency from real dates.", mount: mountDateCalculator };
SIMULATORS.marshalling = { title: "Marshalling Signals Trainer", topicId: "marshalling-signals", sub: "Signal → meaning, or flip it round: meaning → signal.", mount: element => mountDeckTrainer(element, "marshalling") };
SIMULATORS.signals = { title: "Interception & SAR Signals Trainer", topicId: "interception", sub: "Interception, warning and search-and-rescue signals, both ways round.", mount: element => mountDeckTrainer(element, "signals") };
SIMULATORS.codes = { title: "Codes, Calls & Phases Trainer", topicId: "transponder-codes", sub: "Squawks, emergency phases, distress calls and frequencies.", mount: element => mountDeckTrainer(element, "codes") };

Object.values(SIMULATORS).forEach(simulator => {
  simulator.topic = TOPICS.find(topic => topic.id === simulator.topicId).num;
});
