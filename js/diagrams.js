function svgWrap(content, label) {
  return `<svg viewBox="0 0 120 120" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

const GRASS = '<rect width="120" height="120" rx="10" fill="#4f7d3a"/>';
const SKY = '<rect width="120" height="120" rx="10" fill="#cfe3f5"/>';
const MAST = '<line x1="30" y1="10" x2="30" y2="112" stroke="#555" stroke-width="3"/><line x1="30" y1="16" x2="92" y2="16" stroke="#555" stroke-width="3"/><line x1="16" y1="112" x2="44" y2="112" stroke="#555" stroke-width="3"/>';
const DUMBBELL = '<rect x="32" y="52" width="56" height="16" fill="#fff"/><circle cx="32" cy="60" r="17" fill="#fff"/><circle cx="88" cy="60" r="17" fill="#fff"/>';
const RED_SQUARE = '<rect x="22" y="22" width="76" height="76" fill="#c62828"/>';
const DIAGONAL_ONE = '<polygon points="22,34 34,22 98,86 86,98" fill="#fdd835"/>';
const DIAGONAL_TWO = '<polygon points="86,22 98,34 34,98 22,86" fill="#fdd835"/>';

function checkerBoard() {
  let squares = '<rect x="16" y="30" width="88" height="60" fill="#333"/>';
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 4; column++) {
      const colour = (row + column) % 2 === 0 ? "#c62828" : "#fdd835";
      squares += `<rect x="${18 + column * 21}" y="${32 + row * 18.7}" width="21" height="18.7" fill="${colour}"/>`;
    }
  }
  return SKY + squares;
}

const SIGNAL_SHAPES = {
  oneDiagonal: GRASS + RED_SQUARE + DIAGONAL_ONE,
  crossDiagonals: GRASS + RED_SQUARE + DIAGONAL_ONE + DIAGONAL_TWO,
  dumbbell: GRASS + DUMBBELL,
  dumbbellStripes: GRASS + DUMBBELL + '<rect x="28" y="43" width="8" height="34" fill="#111"/><rect x="84" y="43" width="8" height="34" fill="#111"/>',
  dumbbellRedL: GRASS + DUMBBELL + '<text x="60" y="69" text-anchor="middle" font-size="24" font-weight="900" fill="#c62828" font-family="Inter,sans-serif">L</text>',
  doubleCross: GRASS + '<rect x="14" y="54" width="92" height="12" fill="#fff"/><rect x="36" y="26" width="12" height="68" fill="#fff"/><rect x="72" y="26" width="12" height="68" fill="#fff"/>',
  landingT: GRASS + '<rect x="24" y="28" width="68" height="13" fill="#fff"/><rect x="51.5" y="28" width="13" height="70" fill="#fff"/><line x1="106" y1="104" x2="106" y2="46" stroke="#ffeb3b" stroke-width="3"/><polygon points="100,50 106,36 112,50" fill="#ffeb3b"/><text x="104" y="116" text-anchor="end" font-size="9" fill="#fff" font-family="Inter,sans-serif">land this way</text>',
  tWithDisc: GRASS + '<circle cx="58" cy="20" r="9" fill="#fff"/><rect x="24" y="38" width="68" height="13" fill="#fff"/><rect x="51.5" y="38" width="13" height="66" fill="#fff"/>',
  rightHandArrow: GRASS + '<path d="M36 106 L36 46 L84 46" fill="none" stroke="#fdd835" stroke-width="14"/><path d="M36 106 L36 46 L84 46" fill="none" stroke="#c62828" stroke-width="14" stroke-dasharray="10 10"/><polygon points="82,28 108,46 82,64" fill="#c62828"/>',
  letterH: GRASS + '<text x="60" y="90" text-anchor="middle" font-size="84" font-weight="900" fill="#fff" font-family="Inter,sans-serif">H</text>',
  letterL: GRASS + '<text x="60" y="90" text-anchor="middle" font-size="84" font-weight="900" fill="#fff" font-family="Inter,sans-serif">L</text>',
  letterC: SKY + '<rect x="22" y="22" width="76" height="76" fill="#fdd835" stroke="#333"/><text x="60" y="84" text-anchor="middle" font-size="64" font-weight="900" fill="#111" font-family="Inter,sans-serif">C</text>',
  checker: checkerBoard(),
  runwayBoard: SKY + '<rect x="16" y="34" width="88" height="52" fill="#fdd835" stroke="#333" stroke-width="2"/><text x="60" y="76" text-anchor="middle" font-size="40" font-weight="900" fill="#111" font-family="Inter,sans-serif">27</text>',
  blackBall: SKY + MAST + '<line x1="80" y1="16" x2="80" y2="30" stroke="#555" stroke-width="2"/><circle cx="80" cy="44" r="14" fill="#111"/>',
  twoRedBalls: SKY + MAST + '<line x1="80" y1="16" x2="80" y2="28" stroke="#555" stroke-width="2"/><circle cx="80" cy="40" r="12" fill="#d32f2f"/><circle cx="80" cy="68" r="12" fill="#d32f2f"/>',
  greenFlag: SKY + '<line x1="40" y1="10" x2="40" y2="112" stroke="#555" stroke-width="3"/><rect x="42" y="14" width="50" height="32" fill="#2e7d32"/>',
  unserviceable: GRASS + '<rect x="10" y="60" width="100" height="6" fill="#8d6e63"/>' + [14, 44, 74].map(x => `<rect x="${x}" y="48" width="8" height="20" fill="#ff6d00"/><rect x="${x + 8}" y="48" width="8" height="20" fill="#fff"/><rect x="${x + 16}" y="48" width="8" height="20" fill="#ff6d00"/>`).join("") + '<polygon points="100,30 100,50 116,40" fill="#ff6d00"/><polygon points="100,30 100,40 116,40" fill="#fff"/><line x1="100" y1="28" x2="100" y2="60" stroke="#555" stroke-width="2"/>'
};

function signalCard(shape, name, meaning) {
  return `<figure class="sigcard">${svgWrap(SIGNAL_SHAPES[shape], name)}<figcaption><b class="hideable">${name}</b><span class="meaning">${meaning}</span></figcaption></figure>`;
}

function gallery(cards) {
  return `<div class="gallery-wrap"><button class="btn small ghost gallery-toggle">🙈 Hide meanings — test yourself</button><div class="gallery">${cards}</div></div>`;
}

function aircraftIcon(x, y, heading, colour, scale = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${heading}) scale(${scale})"><path d="M0,-15 L3,-5 L15,1 L15,5 L3,2 L2,10 L6,13 L6,15 L0,13.5 L-6,15 L-6,13 L-2,10 L-3,2 L-15,5 L-15,1 L-3,-5 Z" fill="${colour}" stroke="#0b1020" stroke-width="0.8"/></g>`;
}

function lightingDiagram() {
  let lights = "";
  for (let x = 165; x <= 835; x += 40) {
    lights += `<circle cx="${x}" cy="86" r="4" fill="#fff" class="glow" style="color:#fff"/><circle cx="${x}" cy="204" r="4" fill="#fff" class="glow" style="color:#fff"/>`;
  }
  for (let y = 94; y <= 198; y += 13) {
    lights += `<circle cx="150" cy="${y}" r="4" fill="#3dff8a" class="glow" style="color:#3dff8a"/><circle cx="850" cy="${y}" r="4" fill="#ff3b3b" class="glow" style="color:#ff3b3b"/>`;
  }
  for (let y of [62, 72, 216, 226]) {
    lights += `<circle cx="150" cy="${y}" r="4" fill="#3dff8a" class="glow" style="color:#3dff8a"/>`;
  }
  for (let x = 180; x <= 820; x += 28) {
    const nearEnd = x > 740;
    const colour = nearEnd ? (x > 790 ? "#ff3b3b" : (Math.round(x / 28) % 2 ? "#ff3b3b" : "#fff")) : "#fff";
    lights += `<circle cx="${x}" cy="145" r="2.6" fill="${colour}"/>`;
  }
  for (let x = 20; x <= 140; x += 12) {
    lights += `<circle cx="${x}" cy="145" r="3" fill="#fff" class="glow" style="color:#fff"/>`;
  }
  for (let crossbarX of [50, 100]) {
    for (let y = 115; y <= 175; y += 10) {
      lights += `<circle cx="${crossbarX}" cy="${y}" r="3" fill="#fff"/>`;
    }
  }
  for (let y = 215; y <= 370; y += 22) {
    lights += `<circle cx="556" cy="${y}" r="3.5" fill="#4c8dff" class="glow" style="color:#4c8dff"/><circle cx="624" cy="${y}" r="3.5" fill="#4c8dff" class="glow" style="color:#4c8dff"/>`;
  }
  for (let y = 212; y <= 370; y += 15) {
    lights += `<circle cx="590" cy="${y}" r="2.6" fill="#3dff8a"/>`;
  }
  for (let x = 566; x <= 614; x += 8) {
    lights += `<circle cx="${x}" cy="262" r="3" fill="#ff3b3b" class="glow" style="color:#ff3b3b"/>`;
  }
  const papi = [0, 1, 2, 3].map(index => `<circle cx="${226 + index * 14}" cy="60" r="5" fill="${index < 2 ? "#fff" : "#ff3b3b"}" class="glow" style="color:${index < 2 ? "#fff" : "#ff3b3b"}"/>`).join("");
  return `<svg class="diagram" viewBox="0 0 900 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Aerodrome lighting at night">
    <rect width="900" height="390" fill="#0a1430"/>
    <rect x="150" y="90" width="700" height="110" fill="#1c2638"/>
    <rect x="560" y="200" width="60" height="190" fill="#1c2638"/>
    ${lights}${papi}
    <circle cx="544" cy="262" r="5" fill="#ffd600" class="blink"/><circle cx="636" cy="262" r="5" fill="#ffd600" class="blink-alt"/>
    <circle cx="840" cy="30" r="8" fill="#3dff8a" class="blink"/>
    <line x1="760" y1="380" x2="760" y2="300" stroke="#6b7a99" stroke-width="3"/><circle cx="760" cy="298" r="5" fill="#ff3b3b" class="glow" style="color:#ff3b3b"/>
    <g font-family="Inter,sans-serif" font-size="12" fill="#c8d2ea">
      <text x="20" y="104">Approach lights (white)</text>
      <text x="160" y="40">PAPI (left of runway)</text>
      <text x="122" y="250">Threshold + wing bars: GREEN</text>
      <text x="730" y="250" text-anchor="end">Runway end: RED →</text>
      <text x="300" y="80">Runway edge: WHITE</text>
      <text x="320" y="138">Centreline: white (red/white → red near the end)</text>
      <text x="640" y="320">Taxiway edge: BLUE</text>
      <text x="640" y="338">Taxiway centreline: GREEN</text>
      <text x="400" y="282">Stop bar: RED · Guard lights: flashing YELLOW</text>
      <text x="826" y="54" text-anchor="end">ID beacon: green Morse (civil)</text>
      <text x="772" y="372">Obstacle: red</text>
    </g>
  </svg>`;
}

function markingsDiagram() {
  let pianoKeys = "";
  const keyRows = [70, 86, 102, 118, 160, 176, 192, 208];
  for (let y of keyRows) {
    pianoKeys += `<rect x="62" y="${y - 4}" width="64" height="9" fill="#fff"/>`;
  }
  let centreline = "";
  for (let x = 230; x < 900; x += 70) {
    centreline += `<rect x="${x}" y="141" width="40" height="4" fill="#fff"/>`;
  }
  let touchdown = "";
  for (let [x, count] of [[260, 3], [520, 2], [620, 2], [720, 1]]) {
    for (let index = 0; index < count; index++) {
      touchdown += `<rect x="${x}" y="${92 + index * 9}" width="40" height="5" fill="#fff"/><rect x="${x}" y="${184 - index * 9}" width="40" height="5" fill="#fff"/>`;
    }
  }
  return `<svg class="diagram" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ICAO runway and taxiway markings">
    <rect width="900" height="400" fill="#5b8a3c"/>
    <rect x="40" y="60" width="860" height="166" fill="#4a4f57"/>
    <rect x="40" y="64" width="860" height="3" fill="#fff"/><rect x="40" y="219" width="860" height="3" fill="#fff"/>
    ${pianoKeys}
    <text x="0" y="0" transform="translate(150 143) rotate(90)" text-anchor="middle" font-size="40" font-weight="800" fill="#fff" font-family="Inter,sans-serif">09</text>
    ${centreline}
    <rect x="380" y="90" width="90" height="15" fill="#fff"/><rect x="380" y="181" width="90" height="15" fill="#fff"/>
    ${touchdown}
    <rect x="680" y="226" width="56" height="174" fill="#4a4f57"/>
    <path d="M708 400 L708 250 Q708 150 800 143" fill="none" stroke="#ffd600" stroke-width="3"/>
    <rect x="680" y="292" width="56" height="3" fill="#ffd600"/><rect x="680" y="300" width="56" height="3" fill="#ffd600"/>
    <line x1="680" y1="279" x2="736" y2="279" stroke="#ffd600" stroke-width="3" stroke-dasharray="6 5"/><line x1="680" y1="271" x2="736" y2="271" stroke="#ffd600" stroke-width="3" stroke-dasharray="6 5"/>
    <rect x="744" y="276" width="64" height="26" fill="#d32f2f" stroke="#000"/><text x="776" y="295" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="JetBrains Mono,monospace">09-27</text>
    <rect x="610" y="276" width="34" height="26" fill="#111" stroke="#ffd600" stroke-width="2"/><text x="627" y="295" text-anchor="middle" font-size="15" font-weight="800" fill="#ffd600" font-family="JetBrains Mono,monospace">A</text>
    <line x1="680" y1="350" x2="736" y2="350" stroke="#ffd600" stroke-width="3" stroke-dasharray="8 6"/>
    <g font-family="Inter,sans-serif" font-size="12.5" font-weight="600" fill="#fff">
      <text x="44" y="48">① Threshold "piano keys" — stripe count shows runway width</text>
      <text x="44" y="246">② Designator: magnetic heading ÷ 10 (090° → 09)</text>
      <text x="380" y="48">③ Aiming point (two big blocks)</text>
      <text x="520" y="80" fill="#e8f5e9">④ Touchdown zone markings</text>
      <text x="236" y="168" fill="#e8f5e9">⑤ Centreline (white dashes)</text>
      <text x="420" y="292">⑥ Runway-holding position (Pattern A):</text>
      <text x="420" y="308" font-weight="400">dashed lines face the runway, STOP at the solid lines</text>
      <text x="420" y="350">⑦ Intermediate holding position (single dashed)</text>
      <text x="748" y="320" font-weight="400">mandatory sign</text>
      <text x="560" y="325" font-weight="400">location sign</text>
      <text x="745" y="390" font-weight="400">⑧ Taxiway centreline YELLOW</text>
    </g>
  </svg>`;
}

function thresholdDiagram() {
  let arrows = "";
  for (let x = 200; x <= 380; x += 60) {
    arrows += `<rect x="${x}" y="111" width="30" height="4" fill="#fff"/><polygon points="${x + 30},104 ${x + 46},113 ${x + 30},122" fill="#fff"/>`;
  }
  let chevrons = "";
  for (let x = 60; x <= 140; x += 40) {
    chevrons += `<polyline points="${x},60 ${x + 26},113 ${x},166" fill="none" stroke="#ffd600" stroke-width="7"/>`;
  }
  let arrowHeads = "";
  for (let y of [76, 100, 126, 150]) {
    arrowHeads += `<polygon points="398,${y - 7} 414,${y} 398,${y + 7}" fill="#fff"/>`;
  }
  let pianoKeys = "";
  for (let y of [64, 78, 92, 134, 148, 162]) {
    pianoKeys += `<rect x="430" y="${y - 3}" width="60" height="8" fill="#fff"/>`;
  }
  return `<svg class="diagram" viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Displaced threshold and pre-threshold area">
    <rect width="900" height="260" fill="#5b8a3c"/>
    <rect x="40" y="50" width="160" height="126" fill="#5d6168"/>
    <rect x="200" y="50" width="700" height="126" fill="#4a4f57"/>
    ${chevrons}${arrows}${arrowHeads}
    <rect x="418" y="50" width="7" height="126" fill="#fff"/>
    ${pianoKeys}
    <text x="0" y="0" transform="translate(540 113) rotate(90)" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Inter,sans-serif">09</text>
    <g font-family="Inter,sans-serif" font-size="12.5" font-weight="600" fill="#fff">
      <text x="40" y="200">Yellow chevrons: pre-threshold area</text>
      <text x="40" y="216" font-weight="400">(blast pad / stopway) — not for normal</text>
      <text x="40" y="232" font-weight="400">taxi, take-off or landing</text>
      <text x="220" y="200">White arrows: displaced threshold area</text>
      <text x="220" y="216" font-weight="400">OK for taxi & take-off (and roll-out from</text>
      <text x="220" y="232" font-weight="400">the other direction) — do NOT touch down</text>
      <text x="430" y="200">Threshold bar + piano keys:</text>
      <text x="430" y="216" font-weight="400">landing (LDA) starts here</text>
      <text x="40" y="36">◀ approach direction</text>
    </g>
  </svg>`;
}

function smallMarking(kind) {
  if (kind === "patternB") {
    let rungs = "";
    for (let x = 14; x <= 104; x += 10) rungs += `<rect x="${x}" y="50" width="3" height="20" fill="#ffd600"/>`;
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#4a4f57"/><rect x="10" y="48" width="100" height="3" fill="#ffd600"/><rect x="10" y="69" width="100" height="3" fill="#ffd600"/>${rungs}`, "Pattern B holding position");
  }
  if (kind === "patternA") {
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#4a4f57"/><line x1="10" y1="36" x2="110" y2="36" stroke="#ffd600" stroke-width="3" stroke-dasharray="7 5"/><line x1="10" y1="46" x2="110" y2="46" stroke="#ffd600" stroke-width="3" stroke-dasharray="7 5"/><rect x="10" y="62" width="100" height="3" fill="#ffd600"/><rect x="10" y="72" width="100" height="3" fill="#ffd600"/><text x="60" y="22" text-anchor="middle" font-size="10" fill="#fff" font-family="Inter,sans-serif">RUNWAY side</text><text x="60" y="100" text-anchor="middle" font-size="10" fill="#fff" font-family="Inter,sans-serif">hold here (solid side)</text>`, "Pattern A holding position");
  }
  if (kind === "closedRunway") {
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#4a4f57"/><g transform="translate(60 60) rotate(45)"><rect x="-6" y="-38" width="12" height="76" fill="#fff"/><rect x="-38" y="-6" width="76" height="12" fill="#fff"/></g>`, "Closed runway cross");
  }
  if (kind === "closedTaxiway") {
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#4a4f57"/><g transform="translate(60 60) rotate(45)"><rect x="-6" y="-38" width="12" height="76" fill="#ffd600"/><rect x="-38" y="-6" width="76" height="12" fill="#ffd600"/></g>`, "Closed taxiway cross");
  }
  if (kind === "intermediate") {
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#4a4f57"/><rect x="57" y="0" width="5" height="120" fill="#ffd600"/><line x1="12" y1="60" x2="108" y2="60" stroke="#ffd600" stroke-width="4" stroke-dasharray="10 7"/>`, "Intermediate holding position");
  }
  if (kind === "grassMarkers") {
    return svgWrap(`<rect width="120" height="120" rx="10" fill="#5b8a3c"/>${[18, 52, 86].map(y => `<rect x="20" y="${y}" width="22" height="7" fill="#fff"/><rect x="78" y="${y}" width="22" height="7" fill="#fff"/>`).join("")}`, "Grass runway edge markers");
  }
  return "";
}

function markingCard(kind, name, meaning) {
  return `<figure class="sigcard">${smallMarking(kind)}<figcaption><b class="hideable">${name}</b><span class="meaning">${meaning}</span></figcaption></figure>`;
}

function asiDiagram() {
  const centre = 130;
  const maxSpeed = 180;
  const angleFor = speed => -150 + (speed / maxSpeed) * 300;
  const point = (radius, angle) => {
    const radians = (angle - 90) * Math.PI / 180;
    return [centre + radius * Math.cos(radians), centre + radius * Math.sin(radians)];
  };
  const arc = (fromSpeed, toSpeed, radius, colour, width) => {
    const [x1, y1] = point(radius, angleFor(fromSpeed));
    const [x2, y2] = point(radius, angleFor(toSpeed));
    const largeArc = angleFor(toSpeed) - angleFor(fromSpeed) > 180 ? 1 : 0;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${radius} ${radius} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${colour}" stroke-width="${width}" fill="none"/>`;
  };
  let ticks = "";
  for (let speed = 0; speed <= maxSpeed; speed += 10) {
    const [xOuter, yOuter] = point(118, angleFor(speed));
    const [xInner, yInner] = point(speed % 20 === 0 ? 106 : 111, angleFor(speed));
    ticks += `<line x1="${xOuter}" y1="${yOuter}" x2="${xInner}" y2="${yInner}" stroke="#fff" stroke-width="2"/>`;
    if (speed % 20 === 0 && speed > 0) {
      const [xText, yText] = point(84, angleFor(speed));
      ticks += `<text x="${xText}" y="${yText + 5}" text-anchor="middle" font-size="14" fill="#fff" font-weight="700" font-family="Inter,sans-serif">${speed}</text>`;
    }
  }
  const [redX1, redY1] = point(94, angleFor(149));
  const [redX2, redY2] = point(120, angleFor(149));
  const [needleX, needleY] = point(96, angleFor(95));
  return `<svg class="diagram" style="max-width:340px;background:#111" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Airspeed indicator markings">
    <circle cx="130" cy="130" r="126" fill="#1a1a1a" stroke="#555" stroke-width="4"/>
    ${arc(35, 85, 98, "#ffffff", 8)}
    ${arc(40, 111, 110, "#2ecc71", 10)}
    ${arc(111, 149, 110, "#f1c40f", 10)}
    <line x1="${redX1}" y1="${redY1}" x2="${redX2}" y2="${redY2}" stroke="#ff3030" stroke-width="5"/>
    ${ticks}
    <line x1="130" y1="130" x2="${needleX}" y2="${needleY}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="130" cy="130" r="8" fill="#444"/>
    <text x="130" y="178" text-anchor="middle" font-size="12" fill="#bbb" font-family="Inter,sans-serif">KNOTS</text>
  </svg>`;
}

function groundRightOfWayDiagram() {
  const box = (content, title) => `<svg viewBox="0 0 220 200" class="diagram" style="margin:0" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="200" fill="#4a4f57"/><text x="110" y="20" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="Inter,sans-serif">${title}</text>${content}</svg>`;
  const headOn = box(`<rect x="100" y="28" width="4" height="170" fill="#ffd600"/>${aircraftIcon(102, 160, 0, "#4c8dff", 1.2)}${aircraftIcon(102, 60, 180, "#ff6b6b", 1.2)}<path d="M120 145 Q140 125 132 100" stroke="#4c8dff" stroke-width="2.5" fill="none" marker-end="url(#arrowBlue)"/><path d="M84 75 Q64 95 72 120" stroke="#ff6b6b" stroke-width="2.5" fill="none"/><text x="110" y="192" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,sans-serif">Both STOP or alter RIGHT</text>`, "Head-on");
  const converging = box(`${aircraftIcon(80, 150, 0, "#4c8dff", 1.2)}${aircraftIcon(170, 80, 270, "#ff6b6b", 1.2)}<line x1="80" y1="130" x2="80" y2="70" stroke="#4c8dff" stroke-dasharray="4 4"/><line x1="150" y1="80" x2="95" y2="80" stroke="#ff6b6b" stroke-dasharray="4 4"/><text x="110" y="192" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,sans-serif">Blue has red on its RIGHT → blue gives way</text>`, "Converging");
  const overtaking = box(`<rect x="100" y="28" width="4" height="170" fill="#ffd600"/>${aircraftIcon(102, 80, 0, "#ff6b6b", 1.2)}${aircraftIcon(102, 160, 0, "#4c8dff", 1.2)}<path d="M112 145 Q140 120 130 70" stroke="#4c8dff" stroke-width="2.5" fill="none"/><text x="110" y="192" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,sans-serif">Overtaker (blue) keeps well clear</text>`, "Overtaking");
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:12px 0">${headOn}${converging}${overtaking}</div>`;
}

function sovereigntyDiagram() {
  return `<svg class="diagram" viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sovereign airspace, territorial waters and high seas">
    <rect width="820" height="300" fill="#dcecfb"/>
    <rect x="0" y="40" width="540" height="200" fill="rgba(29,91,214,.12)" stroke="#1d5bd6" stroke-dasharray="7 5"/>
    <rect x="0" y="240" width="380" height="60" fill="#5b8a3c"/>
    <rect x="380" y="240" width="160" height="60" fill="#5fa8d3"/>
    <rect x="540" y="240" width="280" height="60" fill="#2f6f9f"/>
    <line x1="540" y1="20" x2="540" y2="300" stroke="#c42b2b" stroke-width="2"/>
    ${aircraftIcon(200, 140, 90, "#13203b", 1.3)}
    ${aircraftIcon(680, 140, 90, "#13203b", 1.3)}
    <g font-family="Inter,sans-serif" font-weight="700" font-size="13">
      <text x="20" y="64" fill="#1d5bd6">State's sovereign airspace (Art 1 &amp; 2)</text>
      <text x="20" y="82" fill="#13203b" font-weight="400">complete and exclusive sovereignty · that state's rules apply (Art 12)</text>
      <text x="560" y="64" fill="#c42b2b">High seas</text>
      <text x="560" y="82" fill="#13203b" font-weight="400">ICAO Annex 2 rules apply</text>
      <text x="560" y="98" fill="#13203b" font-weight="400">(no national deviations)</text>
      <text x="20" y="276" fill="#fff">Land territory</text>
      <text x="392" y="268" fill="#fff">Territorial waters</text>
      <text x="392" y="284" fill="#fff" font-weight="400">(normally 12 nm)</text>
      <text x="560" y="276" fill="#fff">International waters</text>
    </g>
  </svg>`;
}

function colourCard(colour, textColour, name, meaning) {
  return `<figure class="sigcard"><div style="height:90px;border-radius:8px;background:${colour};display:grid;place-items:center;color:${textColour};font-weight:800;font-size:18px;border:1px solid rgba(0,0,0,.15)">AIC</div><figcaption><b class="hideable">${name}</b><span class="meaning">${meaning}</span></figcaption></figure>`;
}

function landingPriorityDiagram() {
  return `<svg class="diagram" viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Landing priority side view">
    <rect width="820" height="260" fill="#dcecfb"/>
    <rect y="220" width="820" height="40" fill="#5b8a3c"/>
    <rect x="620" y="216" width="200" height="8" fill="#4a4f57"/>
    <line x1="640" y1="220" x2="40" y2="40" stroke="#16834a" stroke-width="2" stroke-dasharray="7 5"/>
    ${aircraftIcon(400, 152, 106, "#1d5bd6", 1.5)}
    ${aircraftIcon(200, 60, 106, "#d32f2f", 1.5)}
    <path d="M200 84 Q260 120 300 110" stroke="#d32f2f" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
    <g font-family="Inter,sans-serif" font-size="13" font-weight="700">
      <text x="420" y="140" fill="#1d5bd6">LOWER aircraft — has priority</text>
      <text x="420" y="156" fill="#13203b" font-weight="400">but must not cut in front of / overtake one on final</text>
      <text x="220" y="40" fill="#d32f2f">HIGHER aircraft — gives way</text>
      <text x="40" y="200" fill="#13203b" font-weight="400">Everyone in flight or on the ground gives way to aircraft landing / on final approach.</text>
      <text x="40" y="216" fill="#13203b" font-weight="400">Powered aircraft give way to gliders — even if the glider is higher.</text>
    </g>
  </svg>`;
}

function standOnDiagram() {
  return `<svg class="diagram" viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stand-on and give-way aircraft">
    <rect width="820" height="300" fill="#dcecfb"/>
    <line x1="120" y1="150" x2="760" y2="150" stroke="#16834a" stroke-width="3"/>
    <polygon points="760,140 780,150 760,160" fill="#16834a"/>
    ${aircraftIcon(120, 150, 90, "#16834a", 1.6)}
    ${aircraftIcon(420, 270, 0, "#d32f2f", 1.6)}
    <path d="M420 250 L420 205" stroke="#d32f2f" stroke-width="2.5" fill="none"/>
    <path d="M420 205 Q425 185 460 190 Q520 205 520 175 L520 70" stroke="#d32f2f" stroke-width="2.5" fill="none" stroke-dasharray="6 4"/>
    <line x1="420" y1="205" x2="420" y2="90" stroke="#d32f2f" stroke-width="2" stroke-dasharray="3 5" opacity=".5"/>
    <text x="410" y="110" text-anchor="end" font-size="28" fill="#d32f2f" font-family="Inter,sans-serif">✕</text>
    <g font-family="Inter,sans-serif" font-size="13">
      <text x="110" y="120" fill="#16834a" font-weight="700">Stand-on aircraft (right of way)</text>
      <text x="110" y="136" fill="#13203b">maintains heading AND speed</text>
      <text x="530" y="90" fill="#d32f2f" font-weight="700">Give-way aircraft</text>
      <text x="530" y="106" fill="#13203b">passes well clear — normally behind</text>
      <text x="530" y="122" fill="#13203b">allows for wake turbulence</text>
      <text x="180" y="88" fill="#d32f2f">don't pass over, under or in front</text>
    </g>
  </svg>`;
}
