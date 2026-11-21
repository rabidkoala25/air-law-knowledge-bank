const GAME_SETTINGS = {
  speed: 95,
  turnRate: 1.1,
  climbRate: 0.55,
  gateDistance: 420,
  gateSpacing: 34,
  ringRadius: 17,
  terrainSize: 5000,
  terrainSegments: 110,
  startLives: 3
};

function terrainHeight(x, z) {
  const rolling = 38 * Math.sin(x * 0.0045) * Math.cos(z * 0.005);
  const hills = 22 * Math.sin(x * 0.013 + z * 0.009) + 14 * Math.cos(z * 0.017 - x * 0.006);
  return Math.max(rolling + hills, -6);
}

function shortQuestionPairs() {
  return QUESTIONS.map(question => {
    const correct = question.options[question.answer];
    const wrongOptions = question.options.filter((option, index) => index !== question.answer && option.length <= 34);
    if (correct.length > 34 || !wrongOptions.length || question.question.length > 150) return null;
    return { question: question.question, correct, wrong: pickRandom(wrongOptions), explanation: question.explanation, topic: question.topic };
  }).filter(Boolean);
}

function makeLabelSprite(text, background) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.fillStyle = background;
  context.beginPath();
  context.roundRect(4, 4, 504, 120, 24);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "bold 38px Inter, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach(word => {
    const attempt = line ? line + " " + word : word;
    if (context.measureText(attempt).width > 470 && line) {
      lines.push(line);
      line = word;
    } else {
      line = attempt;
    }
  });
  lines.push(line);
  const lineHeight = lines.length > 1 ? 44 : 0;
  lines.slice(0, 2).forEach((textLine, index) => context.fillText(textLine, 256, 64 + (index - (lines.length > 1 ? 0.5 : 0)) * lineHeight));
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
  sprite.scale.set(52, 13, 1);
  return sprite;
}

function buildAeroplane() {
  const aeroplane = new THREE.Group();
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xf4f6fb });
  const accentMaterial = new THREE.MeshLambertMaterial({ color: 0x1d5bd6 });
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 12), bodyMaterial);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(1.4, 3, 8), accentMaterial);
  nose.rotation.x = -Math.PI / 2;
  nose.position.z = -7.4;
  const wing = new THREE.Mesh(new THREE.BoxGeometry(18, 0.35, 3), accentMaterial);
  wing.position.set(0, 0.6, -1.5);
  const tailplane = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.3, 1.8), accentMaterial);
  tailplane.position.set(0, 0.4, 5.2);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 2), accentMaterial);
  fin.position.set(0, 1.9, 5.2);
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1, 2.6), new THREE.MeshLambertMaterial({ color: 0x0e1b36 }));
  canopy.position.set(0, 1.4, -2.4);
  const redLight = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff3b3b }));
  redLight.position.set(-9, 0.6, -1.5);
  const greenLight = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 6), new THREE.MeshBasicMaterial({ color: 0x3dff8a }));
  greenLight.position.set(9, 0.6, -1.5);
  aeroplane.add(fuselage, nose, wing, tailplane, fin, canopy, redLight, greenLight);
  return aeroplane;
}

function buildTerrain() {
  const geometry = new THREE.PlaneGeometry(GAME_SETTINGS.terrainSize, GAME_SETTINGS.terrainSize, GAME_SETTINGS.terrainSegments, GAME_SETTINGS.terrainSegments);
  geometry.rotateX(-Math.PI / 2);
  const colours = new Float32Array(geometry.attributes.position.count * 3);
  geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3));
  const terrain = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ vertexColors: true }));
  terrain.userData.centreX = null;
  terrain.userData.centreZ = null;
  return terrain;
}

function updateTerrain(terrain, playerX, playerZ) {
  const step = GAME_SETTINGS.terrainSize / GAME_SETTINGS.terrainSegments;
  const centreX = Math.round(playerX / (step * 10)) * step * 10;
  const centreZ = Math.round(playerZ / (step * 10)) * step * 10;
  if (centreX === terrain.userData.centreX && centreZ === terrain.userData.centreZ) return;
  terrain.userData.centreX = centreX;
  terrain.userData.centreZ = centreZ;
  terrain.position.set(centreX, 0, centreZ);
  const positions = terrain.geometry.attributes.position;
  const colours = terrain.geometry.attributes.color;
  const grass = new THREE.Color(0x5b8a3c);
  const darkGrass = new THREE.Color(0x3f6b2a);
  const water = new THREE.Color(0x2f6f9f);
  const rock = new THREE.Color(0x8a8f7a);
  for (let index = 0; index < positions.count; index++) {
    const worldX = positions.getX(index) + centreX;
    const worldZ = positions.getZ(index) + centreZ;
    const height = terrainHeight(worldX, worldZ);
    positions.setY(index, height);
    let colour = height < -5 ? water : (height > 45 ? rock : grass.clone().lerp(darkGrass, Math.max(0, Math.min(1, (height + 5) / 50))));
    colours.setXYZ(index, colour.r, colour.g, colour.b);
  }
  positions.needsUpdate = true;
  colours.needsUpdate = true;
  terrain.geometry.computeVertexNormals();
}

function renderGame() {
  currentView = "game";
  setActiveTab("game");
  if (typeof THREE === "undefined") {
    appElement.innerHTML = `<div class="card">The 3D engine couldn't load — check your internet connection and refresh.</div>`;
    return;
  }
  appElement.innerHTML = `
    <div class="card" style="padding:0;overflow:hidden;position:relative">
      <div id="gameStage" style="position:relative;width:100%;height:min(70vh,620px);background:#9cc9f0;touch-action:none"></div>
      <div id="gameHud" style="position:absolute;top:0;left:0;right:0;padding:12px 14px;display:flex;justify-content:space-between;gap:10px;color:#fff;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.6);pointer-events:none;flex-wrap:wrap">
        <span id="gameScore">Score 0</span><span id="gameLives">❤️❤️❤️</span><span id="gameAltitude">ALT 0 ft</span>
      </div>
      <div id="gameQuestion" style="position:absolute;left:12px;right:12px;bottom:12px;padding:12px 14px;border-radius:12px;background:rgba(14,27,54,.82);color:#fff;font-size:15px;pointer-events:none"></div>
      <div id="gameWarning" style="position:absolute;top:44px;left:50%;transform:translateX(-50%);padding:6px 12px;border-radius:8px;background:rgba(196,43,43,.85);color:#fff;font-weight:800;display:none;pointer-events:none">⚠️ LOW FLYING — below 500 ft!</div>
      <div id="gameOverlay" style="position:absolute;inset:0;display:grid;place-items:center;background:rgba(10,20,48,.55)">
        <div class="card" style="max-width:460px;text-align:center">
          <h2 style="margin:0 0 6px">✈️ Air Law Gates</h2>
          <p style="margin:0 0 12px;color:var(--muted)">Each question puts two answer gates in the sky. Fly through the <b>correct</b> one. Wrong gate, a missed gate or hitting the ground costs a life.</p>
          <p style="margin:0 0 14px;font-size:14px"><span class="kbd">W</span>/<span class="kbd">↑</span> climb · <span class="kbd">S</span>/<span class="kbd">↓</span> descend · <span class="kbd">A</span>/<span class="kbd">←</span> <span class="kbd">D</span>/<span class="kbd">→</span> turn · or use the buttons</p>
          <p id="gameBest" style="margin:0 0 12px;font-size:13px;color:var(--muted)"></p>
          <button class="btn" id="gameStart">Take off</button>
        </div>
      </div>
    </div>
    <div class="sim-controls" style="justify-content:center;margin-top:10px">
      <button class="btn ghost" data-control="left">◀ Left</button>
      <button class="btn ghost" data-control="up">▲ Climb</button>
      <button class="btn ghost" data-control="down">▼ Descend</button>
      <button class="btn ghost" data-control="right">Right ▶</button>
    </div>`;
  startFlightGame();
}

function startFlightGame() {
  const stage = document.getElementById("gameStage");
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9cc9f0);
  scene.fog = new THREE.Fog(0x9cc9f0, 400, 1900);
  const camera = new THREE.PerspectiveCamera(65, stage.clientWidth / stage.clientHeight, 1, 4000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4a6b3a, 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7);
  sun.position.set(300, 500, 200);
  scene.add(sun);
  const terrain = buildTerrain();
  scene.add(terrain);
  const aeroplane = buildAeroplane();
  scene.add(aeroplane);

  const questionPool = shuffle(shortQuestionPairs());
  const keys = new Set();
  const state = { running: false, x: 0, y: 160, z: 0, yaw: 0, pitch: 0, roll: 0, score: 0, lives: GAME_SETTINGS.startLives, questionIndex: 0, gate: null, lastTime: 0, invulnerableUntil: 0 };
  const bestScore = storage.read("airlaw-game-best", 0);
  document.getElementById("gameBest").textContent = bestScore ? `Best score: ${bestScore}` : "";

  function forwardVector(yaw) {
    return new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  }

  function removeGate() {
    if (!state.gate) return;
    state.gate.objects.forEach(object => scene.remove(object));
    state.gate = null;
  }

  function spawnGate() {
    removeGate();
    const pair = questionPool[state.questionIndex % questionPool.length];
    state.questionIndex++;
    const forward = forwardVector(state.yaw);
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const centre = new THREE.Vector3(state.x, 0, state.z).add(forward.clone().multiplyScalar(GAME_SETTINGS.gateDistance));
    centre.x += (Math.random() - 0.5) * 60;
    const ground = terrainHeight(centre.x, centre.z);
    centre.y = Math.max(ground + 70, Math.min(state.y + (Math.random() - 0.5) * 50, ground + 220));
    const correctOnLeft = Math.random() < 0.5;
    const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xffd600, emissive: 0x332a00 });
    const objects = [];
    const rings = [-1, 1].map(side => {
      const position = centre.clone().add(right.clone().multiplyScalar(side * GAME_SETTINGS.gateSpacing));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(GAME_SETTINGS.ringRadius, 1.6, 10, 36), ringMaterial);
      ring.position.copy(position);
      ring.rotation.y = state.yaw;
      const isCorrect = (side === -1) === correctOnLeft;
      const label = makeLabelSprite(isCorrect ? pair.correct : pair.wrong, side === -1 ? "#1d5bd6" : "#c42b2b");
      label.position.copy(position).add(new THREE.Vector3(0, GAME_SETTINGS.ringRadius + 11, 0));
      objects.push(ring, label);
      return { position, isCorrect };
    });
    objects.forEach(object => scene.add(object));
    state.gate = { pair, rings, centre, forward, objects };
    document.getElementById("gameQuestion").innerHTML = `<b>Q${state.questionIndex}.</b> ${pair.question}`;
  }

  function updateHud() {
    document.getElementById("gameScore").textContent = `Score ${state.score}`;
    document.getElementById("gameLives").textContent = state.lives > 0 ? "❤️".repeat(state.lives) : "💀";
    const altitudeFeet = Math.round(state.y * 3);
    const heightFeet = Math.round((state.y - terrainHeight(state.x, state.z)) * 3);
    document.getElementById("gameAltitude").textContent = `ALT ${altitudeFeet} ft · HGT ${heightFeet} ft`;
    document.getElementById("gameWarning").style.display = state.running && heightFeet < 500 ? "block" : "none";
  }

  function flashFeedback(text, good) {
    const box = document.getElementById("gameQuestion");
    box.style.background = good ? "rgba(22,131,74,.9)" : "rgba(196,43,43,.9)";
    box.innerHTML = text;
    setTimeout(() => { if (box.isConnected) box.style.background = "rgba(14,27,54,.82)"; }, 1400);
  }

  function loseLife(reason) {
    state.lives--;
    state.invulnerableUntil = performance.now() + 1500;
    if (state.lives <= 0) {
      endGame(reason);
    }
  }

  function endGame(reason) {
    state.running = false;
    removeGate();
    const best = Math.max(storage.read("airlaw-game-best", 0), state.score);
    storage.write("airlaw-game-best", best);
    const overlay = document.getElementById("gameOverlay");
    overlay.style.display = "grid";
    overlay.querySelector("h2").textContent = "🛬 Game over";
    overlay.querySelector("p").innerHTML = `${reason}<br>You scored <b>${state.score}</b>.`;
    document.getElementById("gameBest").textContent = `Best score: ${best}`;
    document.getElementById("gameStart").textContent = "Fly again";
  }

  function checkGate() {
    const gate = state.gate;
    if (!gate) return;
    const offset = new THREE.Vector3(state.x, state.y, state.z).sub(gate.centre);
    if (offset.dot(gate.forward) < 0) return;
    const hit = gate.rings.find(ring => {
      const toRing = new THREE.Vector3(state.x, state.y, state.z).sub(ring.position);
      const sideways = toRing.sub(gate.forward.clone().multiplyScalar(toRing.dot(gate.forward)));
      return sideways.length() < GAME_SETTINGS.ringRadius + 2;
    });
    if (hit && hit.isCorrect) {
      state.score += 10;
      flashFeedback(`✅ Correct! <b>${gate.pair.correct}</b> — ${gate.pair.explanation}`, true);
    } else {
      flashFeedback(`${hit ? "❌ Wrong gate." : "⚠️ Missed the gates."} Answer: <b>${gate.pair.correct}</b> — ${gate.pair.explanation}`, false);
      loseLife(hit ? "Flew through the wrong gate." : "Missed the gates.");
    }
    removeGate();
    if (state.running) setTimeout(() => { if (state.running) spawnGate(); }, 1600);
  }

  function step(time) {
    if (!renderer.domElement.isConnected) {
      renderer.dispose();
      return;
    }
    const deltaSeconds = Math.min((time - state.lastTime) / 1000 || 0, 0.05);
    state.lastTime = time;
    if (state.running) {
      const turnInput = (keys.has("left") ? 1 : 0) - (keys.has("right") ? 1 : 0);
      const climbInput = (keys.has("up") ? 1 : 0) - (keys.has("down") ? 1 : 0);
      state.roll += ((turnInput * 0.7) - state.roll) * Math.min(1, deltaSeconds * 4);
      state.pitch += ((climbInput * 0.35) - state.pitch) * Math.min(1, deltaSeconds * 3);
      state.yaw += state.roll * GAME_SETTINGS.turnRate * deltaSeconds;
      const forward = forwardVector(state.yaw);
      state.x += forward.x * GAME_SETTINGS.speed * deltaSeconds;
      state.z += forward.z * GAME_SETTINGS.speed * deltaSeconds;
      state.y += Math.sin(state.pitch) * GAME_SETTINGS.speed * GAME_SETTINGS.climbRate * deltaSeconds * 2;
      state.y = Math.min(state.y, 600);
      const ground = terrainHeight(state.x, state.z);
      if (state.y < ground + 3 && time > state.invulnerableUntil) {
        flashFeedback("💥 Ground contact! Mind the low flying rules.", false);
        state.y = ground + 120;
        state.pitch = 0;
        loseLife("Crashed into the ground.");
      }
      if (state.y < ground + 3) state.y = ground + 3;
      checkGate();
    }
    updateTerrain(terrain, state.x, state.z);
    aeroplane.position.set(state.x, state.y, state.z);
    aeroplane.rotation.set(0, 0, 0);
    aeroplane.rotateY(state.yaw);
    aeroplane.rotateX(state.pitch);
    aeroplane.rotateZ(state.roll);
    aeroplane.visible = !(time < state.invulnerableUntil && Math.floor(time / 120) % 2 === 0);
    const forward = forwardVector(state.yaw);
    const cameraTarget = new THREE.Vector3(state.x, state.y, state.z).sub(forward.clone().multiplyScalar(42)).add(new THREE.Vector3(0, 14, 0));
    camera.position.lerp(cameraTarget, Math.min(1, deltaSeconds * 5));
    camera.lookAt(new THREE.Vector3(state.x, state.y + 4, state.z).add(forward.clone().multiplyScalar(30)));
    updateHud();
    renderer.render(scene, camera);
    requestAnimationFrame(step);
  }

  function beginRun() {
    Object.assign(state, { running: true, x: 0, y: 160, z: 0, yaw: 0, pitch: 0, roll: 0, score: 0, lives: GAME_SETTINGS.startLives, invulnerableUntil: performance.now() + 1500 });
    camera.position.set(0, 175, 60);
    document.getElementById("gameOverlay").style.display = "none";
    spawnGate();
  }

  const keyMap = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowUp: "up", w: "up", W: "up", ArrowDown: "down", s: "down", S: "down" };
  function onKeyDown(event) {
    if (!renderer.domElement.isConnected) return;
    if (keyMap[event.key]) {
      keys.add(keyMap[event.key]);
      event.preventDefault();
    }
  }
  function onKeyUp(event) {
    if (keyMap[event.key]) keys.delete(keyMap[event.key]);
  }
  function onResize() {
    if (!renderer.domElement.isConnected) return;
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    camera.aspect = stage.clientWidth / stage.clientHeight;
    camera.updateProjectionMatrix();
  }
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
  appElement.querySelectorAll("[data-control]").forEach(button => {
    const control = button.dataset.control;
    const press = event => { event.preventDefault(); keys.add(control); };
    const release = () => keys.delete(control);
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
  });
  document.getElementById("gameStart").addEventListener("click", beginRun);
  updateTerrain(terrain, 0, 0);
  requestAnimationFrame(step);
}
