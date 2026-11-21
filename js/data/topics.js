const LESSONS = {
  l3: { name: "Lesson 3 — Aerodromes", short: "Lesson 3" },
  l2: { name: "Lesson 2 — Registration, Airworthiness & Rules of the Air", short: "Lesson 2" }
};

const LESSON_ORDER = ["l3", "l2"];

const TOPICS = [
  {
    num: 1, lesson: "l3", title: "Aerodrome Signal Area", tag: "Signals",
    summary: "Ground signals laid out in a square near the tower — mainly for non-radio pilots to read from overhead.",
    body: () => `
      <p>The <b>signals area</b> (signals square) is a marked square at the aerodrome, normally <b>near the control tower / ATSU</b>, positioned so it can be read <b>from the air</b>. Non-radio pilots typically overfly the aerodrome at a safe height to read it (and the windsock) before joining. Some signals are also hoisted on a <b>mast</b>, or shown on the tower.</p>
      <h2>Signals displayed in the signals area</h2>
      ${gallery(
        signalCard("oneDiagonal", "Red square, ONE yellow diagonal", "Special precautions needed on approach/landing — state of the manoeuvring area is poor (or other reason).") +
        signalCard("crossDiagonals", "Red square, yellow CROSS (both diagonals)", "Aerodrome unsafe for movement of aircraft — LANDING PROHIBITED, and the prohibition is liable to continue.") +
        signalCard("dumbbell", "White dumb-bell", "Aircraft movements on the ground are confined to paved/hard surfaces (land, take off AND taxi on hard surfaces).") +
        signalCard("dumbbellStripes", "Dumb-bell with black stripe on each disc", "Take off and land on RUNWAYS only, but other ground movements need not be confined to hard surfaces.") +
        signalCard("dumbbellRedL", "Red letter L on the dumb-bell", "Light aircraft may take off and land on a runway OR on the special area marked by a white L.") +
        signalCard("letterL", "White letter L", "Marks the part of the manoeuvring area provided for light aircraft.") +
        signalCard("doubleCross", "White double cross", "Glider flying is in progress.") +
        signalCard("landingT", "White landing T", "Land and take off PARALLEL to the shaft, TOWARDS the cross-arm.") +
        signalCard("tWithDisc", "White disc above the T cross-arm", "Directions of landing and take-off do not necessarily coincide.") +
        signalCard("rightHandArrow", "Red & yellow striped arrow (bent 90°)", "Right-hand circuit in force — turns after take-off and before landing are to the right.") +
        signalCard("letterH", "White letter H", "Helicopters shall take off and land only within the area designated by the H.") +
        signalCard("unserviceable", "Orange & white markers / flags", "Boundary of an unserviceable part of the manoeuvring area — keep off.")
      )}
      <h2>Signals on a mast, or on/near the tower</h2>
      ${gallery(
        signalCard("twoRedBalls", "Two red balls on a mast (vertical)", "Glider flying is in progress (mast version of the double cross).") +
        signalCard("blackBall", "Black ball on a mast", "Directions of take-off and landing are not necessarily the same (mast version of the disc).") +
        signalCard("greenFlag", "Rectangular green flag on a mast", "Right-hand circuit in force (mast version of the striped arrow).") +
        signalCard("letterC", "Black letter C on yellow", "Location of the ATS reporting office — where pilots report (book in/out).") +
        signalCard("checker", "Red & yellow chequered flag/board", "Aircraft may move on the manoeuvring area and apron only with ATC permission.") +
        signalCard("runwayBoard", "Black numbers on a yellow board", "Shows the runway in use (direction for take-off), displayed on/near the tower.")
      )}
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li><b>One</b> diagonal = take care. <b>Two</b> diagonals (cross) = do not land.</li>
        <li>Plain dumb-bell = <b>everything</b> on hard surfaces. Striped dumb-bell = <b>only take-off/landing</b> on runways.</li>
        <li>Landing T: land along the shaft <b>towards the cross-arm</b> (like the T is pointing at you on finals — the cross-arm is the far end).</li>
        <li>Glider ops: white double cross (ground) or two red balls (mast).</li>
        <li>"C" = <b>C</b>ontact/report here. Chequered board = ATC permission needed to move.</li>
      </ul></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Answer options will swap "special care" and "landing prohibited" — count the yellow diagonals.</li>
        <li>The striped arrow shows a <b>right-hand</b> circuit; left-hand is the default so it has no signal.</li>
      </ul></div>
      <div class="callout law">Source: SERA (UK Reg (EU) 923/2012) Appendix 1 ground signals; Rules of the Air Regulations 2015; CAP 637 Visual Aids Handbook.</div>`,
    mnemonics: [
      { title: "One line = Look out, Cross = Can't land", text: "A single diagonal is like a single warning line — be careful. Two diagonals cross it out — no landing." },
      { title: "Dumb-bell = Don't leave the tarmac", text: "Plain dumb-bell: all movement on hard surfaces. Add black stripes and you're 'striped' down to runway-only for take-off & landing — taxi on grass is OK." },
      { title: "Two red balls = 'Gliders are on the ball'", text: "Two red balls and a double cross both mean gliders. Two = double." },
      { title: "C = Come and see us", text: "Black C on yellow is where you report to ATC/the ATSU." }
    ]
  },
  {
    num: 2, lesson: "l3", title: "Notification of Arrival", tag: "Procedures",
    summary: "Booking in and out, closing flight plans, and stopping an unnecessary search-and-rescue call-out.",
    body: () => `
      <p>The <b>pilot-in-command (commander)</b> is responsible for making sure the aerodrome/ATS knows about the aircraft's departure and arrival. In practice this is called <b>booking out</b> (before departure) and <b>booking in</b> (on arrival) — in person at the ATSU/reporting office (look for the <b>black C on yellow</b>), by phone, or by radio where accepted.</p>
      <h2>If you filed a flight plan</h2>
      <table class="ref"><tr><th>Situation</th><th>What you must do</th></tr>
        <tr><td>Land at destination with an ATS unit</td><td>Make an <b>arrival report</b> (close the flight plan) <b>as soon as possible after landing</b>.</td></tr>
        <tr><td>Land at an aerodrome with <b>no ATS unit</b></td><td>Report arrival as soon as practicable after landing, by the <b>quickest means available</b> (normally phone) to the <b>nearest ATS unit</b>.</td></tr>
        <tr><td>Divert / land somewhere else</td><td>Inform ATS (destination or the nearest ATSU) <b>within 30 minutes of your ETA</b> at the planned destination, otherwise <b>overdue / search & rescue action</b> may begin.</td></tr>
        <tr><td>Delay before departure</td><td>Inform ATS so the flight plan can be amended or cancelled.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Closing the flight plan is the <b>pilot's</b> responsibility — ATS don't do it for you.</li>
        <li>The magic number is <b>30 minutes after ETA</b> — after this, the alerting service treats you as overdue.</li>
        <li>No ATSU at arrival aerodrome → phone the nearest ATSU by the quickest means.</li>
        <li><b>PPR</b> (Prior Permission Required) aerodromes: you must get permission <b>before</b> you arrive.</li>
      </ul></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>"Within 30 minutes of landing" ≠ "within 30 minutes of ETA". The alerting clock runs from your <b>ETA</b>.</li>
      </ul></div>
      <div class="callout law">Source: SERA.4020 (closing a flight plan); Rules of the Air Regulations 2015; UK AIP ENR 1.10.</div>`,
    mnemonics: [
      { title: "Book out, Book in, Close it, 30 min", text: "Before you go: book out. When you land: book in. Flight plan? Close it. Landed elsewhere? Tell ATS within 30 minutes of ETA." },
      { title: "\"Thirty and they search\"", text: "30 minutes past ETA with no arrival report and SAR starts asking questions." }
    ]
  },
  {
    num: 3, lesson: "l3", title: "Aerodrome Lighting", tag: "Lighting",
    summary: "Colours of runway, taxiway, approach and obstacle lighting, beacons, and the PAPI glide-slope indicator.",
    body: () => `
      ${lightingDiagram()}
      <p class="diagram-cap">Schematic night view. Approach from the left. The yellow runway guard lights and the green beacon flash.</p>
      <h2>Light colours</h2>
      <table class="ref"><tr><th>Lighting</th><th>Colour</th><th>Notes</th></tr>
        <tr><td>Runway edge</td><td><span class="swatch" style="background:#fff"></span>White</td><td>May be <b>yellow</b> over the last 600 m (or last third) of an instrument runway — the "caution zone".</td></tr>
        <tr><td>Runway threshold & wing bars</td><td><span class="swatch" style="background:#2ecc71"></span>Green</td><td>Seen by aircraft on approach. "Green to go in."</td></tr>
        <tr><td>Runway end</td><td><span class="swatch" style="background:#e53935"></span>Red</td><td>Seen by aircraft on the runway. (A green threshold light is usually red from the other side.)</td></tr>
        <tr><td>Runway centreline</td><td><span class="swatch" style="background:#fff"></span>White</td><td>Alternating red/white from 900 m to 300 m before the end, then all red for the last 300 m.</td></tr>
        <tr><td>Touchdown zone</td><td><span class="swatch" style="background:#fff"></span>White</td><td>Barrettes either side of centreline.</td></tr>
        <tr><td>Approach lighting</td><td><span class="swatch" style="background:#fff"></span>White</td><td>Centreline with crossbars (UK "Calvert" pattern).</td></tr>
        <tr><td>Taxiway edge</td><td><span class="swatch" style="background:#4c8dff"></span>Blue</td><td>"Blue for boundaries."</td></tr>
        <tr><td>Taxiway centreline</td><td><span class="swatch" style="background:#2ecc71"></span>Green</td><td>Alternate green/yellow where it crosses a runway or ILS-sensitive area.</td></tr>
        <tr><td>Stop bar</td><td><span class="swatch" style="background:#e53935"></span>Red</td><td>Row across taxiway at a holding position. <b>Never cross a lit red stop bar</b> — even with a clearance.</td></tr>
        <tr><td>Runway guard lights</td><td><span class="swatch" style="background:#ffd600"></span>Flashing yellow</td><td>Pairs flashing alternately ("wig-wags") at runway-holding positions: runway ahead!</td></tr>
        <tr><td>Obstacle lights</td><td><span class="swatch" style="background:#e53935"></span>Red</td><td>Steady or flashing; very tall obstacles may have flashing high-intensity white.</td></tr>
        <tr><td>Aerodrome identification beacon</td><td><span class="swatch" style="background:#2ecc71"></span>Green / <span class="swatch" style="background:#e53935"></span>Red</td><td>Flashes a two-letter <b>Morse</b> ID: <b>green at civil</b> aerodromes, <b>red at military</b>.</td></tr>
        <tr><td>Aerodrome location beacon</td><td><span class="swatch" style="background:#fff"></span>Flashing white</td><td>(or alternating white & colour) to show where an aerodrome is.</td></tr>
      </table>
      <h2>PAPI — Precision Approach Path Indicator</h2>
      <p>Usually <b>four</b> light units in a row beside the runway (normally on the left), each showing white above its set angle and red below. For a standard <b>3°</b> approach you should see <b>two white, two red</b>. An <b>APAPI</b> (abbreviated) has only two units.</p>
      <div class="sim-slot" data-sim="papi"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Threshold <b>green</b>, end <b>red</b>, runway edge <b>white</b>; taxiway edge <b>blue</b>, taxiway centreline <b>green</b>.</li>
        <li>PAPI: 2 white + 2 red = on slope. All white = too high. All red = too low.</li>
        <li>Civil identification beacon: <b>green Morse</b>. Military: <b>red</b>.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 14; CAP 168 Licensing of Aerodromes; CAP 637.</div>`,
    mnemonics: [
      { title: "\"Green to get in, red at the end\"", text: "Threshold lights green as you arrive; runway end lights red to stop you running off." },
      { title: "\"Blue for boundaries\"", text: "Taxiway EDGE lights are blue; the centreline you follow is green." },
      { title: "PAPI: \"Two and two, you're true\"", text: "2 white/2 red = 3° slope. \"All white, you're out of sight (too high). All red, you're dead (too low).\"" },
      { title: "Civil = Green = Grass & Gliders", text: "Civil aerodrome ID beacon flashes green Morse; military flashes red." }
    ]
  },
  {
    num: 4, lesson: "l3", title: "Aerodrome Light Signals", tag: "Signals",
    summary: "Signal lamp (light gun) signals from the tower to aircraft in the air and on the ground — and how you acknowledge.",
    body: () => `
      <p>Used for radio failure or non-radio aircraft. The tower aims a signal lamp at you. Same colours mean different things in the air and on the ground, but they follow a pattern.</p>
      <div class="two-col">
        <div><h3>To aircraft IN FLIGHT</h3>
        <table class="ref"><tr><th>Signal</th><th>Meaning</th></tr>
          <tr><td><span class="swatch" style="background:#2ecc71"></span>Steady green</td><td>Cleared to <b>land</b></td></tr>
          <tr><td><span class="swatch" style="background:#e53935"></span>Steady red</td><td><b>Give way</b> to other aircraft and <b>continue circling</b></td></tr>
          <tr><td><span class="swatch" style="background:#2ecc71"></span>Green flashes</td><td><b>Return for landing</b> (a steady green to land will follow)</td></tr>
          <tr><td><span class="swatch" style="background:#e53935"></span>Red flashes</td><td>Aerodrome <b>unsafe — do not land</b></td></tr>
          <tr><td><span class="swatch" style="background:#fff"></span>White flashes</td><td><b>Land at this aerodrome and proceed to the apron</b></td></tr>
          <tr><td>🎆 Red pyrotechnic</td><td>Notwithstanding any previous instructions, <b>do not land for the time being</b></td></tr>
        </table></div>
        <div><h3>To aircraft ON THE GROUND</h3>
        <table class="ref"><tr><th>Signal</th><th>Meaning</th></tr>
          <tr><td><span class="swatch" style="background:#2ecc71"></span>Steady green</td><td>Cleared for <b>take-off</b></td></tr>
          <tr><td><span class="swatch" style="background:#e53935"></span>Steady red</td><td><b>Stop</b></td></tr>
          <tr><td><span class="swatch" style="background:#2ecc71"></span>Green flashes</td><td>Cleared to <b>taxi</b></td></tr>
          <tr><td><span class="swatch" style="background:#e53935"></span>Red flashes</td><td><b>Taxi clear</b> of the landing area in use</td></tr>
          <tr><td><span class="swatch" style="background:#fff"></span>White flashes</td><td><b>Return to starting point</b> on the aerodrome</td></tr>
        </table></div>
      </div>
      <h2>Acknowledging signals</h2>
      <table class="ref"><tr><th></th><th>By day</th><th>By night</th></tr>
        <tr><td><b>In flight</b></td><td><b>Rock the wings</b> (not on base or final turns)</td><td>Flash <b>landing lights twice</b> (or nav lights twice if no landing lights)</td></tr>
        <tr><td><b>On the ground</b></td><td>Move <b>ailerons or rudder</b></td><td>Flash <b>landing lights twice</b> (or nav lights twice)</td></tr>
      </table>
      <h2>Signals FROM an aircraft</h2>
      <table class="ref"><tr><th>Signal</th><th>Meaning</th></tr>
        <tr><td>Repeated switching on/off of <b>landing lights</b>, or irregular flashing of nav lights</td><td><b>Urgency</b> — difficulties compel the aircraft to land, but it doesn't need immediate assistance</td></tr>
        <tr><td><b>Red pyrotechnic / red flare</b> fired by the aircraft</td><td><b>Distress</b> — immediate assistance required</td></tr>
      </table>
      <div class="sim-slot" data-sim="lights"></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Steady red in the air ≠ "don't land" — it means <b>give way and keep circling</b>. "Don't land" is <b>flashing</b> red.</li>
        <li>White flashes: in the air = land & go to the apron; on the ground = go back to the start.</li>
        <li>Never rock wings to acknowledge on base or final — you need the wings level.</li>
      </ul></div>
      <div class="callout law">Source: SERA Appendix 1 (signals) section 4.2; Rules of the Air Regulations 2015.</div>`,
    mnemonics: [
      { title: "Steady = Simple", text: "Steady GREEN = go (land / take off). Steady RED = stop (circle and give way / stop)." },
      { title: "Flashing = do something else", text: "Flashing GREEN = 'Get ready / come back' (return to land · taxi). Flashing RED = 'Get out of here' (don't land here · taxi off the runway). Flashing WHITE = 'Go home' (land & go to apron · back to start)." },
      { title: "\"Red rocket, don't drop it\"", text: "Red pyrotechnic from the tower: don't land for now, whatever you were told before." },
      { title: "Day: rock & roll · Night: flash flash", text: "In the air by day, rock the wings; on the ground by day, wiggle the ailerons/rudder. At night, flash the landing lights twice." }
    ]
  },
  {
    num: 5, lesson: "l3", title: "Declared Distances", tag: "Performance",
    summary: "TORA, TODA, ASDA (EDA) and LDA — what each runway distance includes, with an interactive runway.",
    body: () => `
      <table class="ref"><tr><th>Distance</th><th>Definition</th><th>Formula</th></tr>
        <tr><td><b>TORA</b><br>Take-Off Run Available</td><td>Length of runway declared available and suitable for the <b>ground run</b> of an aeroplane taking off.</td><td class="mono">Runway</td></tr>
        <tr><td><b>TODA</b><br>Take-Off Distance Available</td><td>TORA plus any <b>clearway</b> — the distance for the take-off run AND initial climb (to screen height).</td><td class="mono">TORA + clearway</td></tr>
        <tr><td><b>ASDA</b> (UK also: <b>EDA</b>)<br>Accelerate-Stop / Emergency Distance Available</td><td>TORA plus any <b>stopway</b> — distance to accelerate and then stop after an abandoned take-off.</td><td class="mono">TORA + stopway</td></tr>
        <tr><td><b>LDA</b><br>Landing Distance Available</td><td>Length of runway available and suitable for the <b>ground run of a landing</b> aeroplane. Starts at the (possibly displaced) threshold.</td><td class="mono">Runway − displaced threshold</td></tr>
      </table>
      <h3>Clearway vs stopway</h3>
      <ul>
        <li><b>Clearway</b>: a defined area beyond the end of the TORA, on the ground or water, under the aerodrome's control, <b>free of obstacles</b>, over which an aeroplane can make part of its initial climb. It doesn't need to be able to bear the aircraft's weight. Normally no longer than <b>half the TORA</b>.</li>
        <li><b>Stopway</b>: a prepared rectangular area beyond the end of the TORA, able to <b>support the aircraft</b> if a take-off is abandoned. Not for normal take-off or landing (often marked with yellow chevrons).</li>
        <li>A <b>displaced threshold</b> reduces the <b>LDA</b> (in that direction) but the displaced section is usually still available for <b>take-off</b>, so TORA is unaffected.</li>
      </ul>
      <div class="sim-slot" data-sim="declared"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>TODA ≥ TORA and ASDA ≥ TORA always. LDA ≤ runway length.</li>
        <li>Clear<b>way</b> = <b>air</b>borne part (climb). Stop<b>way</b> = <b>stop</b>ping part (ground).</li>
        <li>UK uses <b>EDA</b> for the same thing as ASDA.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 14; CAP 168; UK AIP AD 2 aerodrome entries (declared distances table).</div>`,
    mnemonics: [
      { title: "\"Clearway Climbs, Stopway Stops\"", text: "Clearway is added to TORA to give TODA (you're climbing over it). Stopway is added to TORA to give ASDA (you're braking on it)." },
      { title: "TODA = TORA + 'Open Air'", text: "The extra letters in TODA hint at Distance in the air → clearway." },
      { title: "\"Displaced threshold, Damaged LDA\"", text: "A displaced threshold only shortens the Landing Distance Available." }
    ]
  },
  {
    num: 6, lesson: "l3", title: "Ground Right-of-Way Rules", tag: "Rules",
    summary: "Who gives way when aircraft (and vehicles) meet on the manoeuvring area.",
    body: () => `
      ${groundRightOfWayDiagram()}
      <h2>Aircraft taxiing on the manoeuvring area</h2>
      <table class="ref"><tr><th>Situation</th><th>Rule</th></tr>
        <tr><td><b>Head-on</b> (or approximately)</td><td>Both <b>stop</b>, or where practicable <b>alter course to the right</b> so as to keep well clear.</td></tr>
        <tr><td><b>Converging</b></td><td>The aircraft that has the other <b>on its right</b> gives way.</td></tr>
        <tr><td><b>Overtaking</b></td><td>The aircraft being overtaken has right of way; the <b>overtaking</b> aircraft keeps <b>well clear</b>.</td></tr>
        <tr><td>Aircraft taking off / landing</td><td>A taxiing aircraft <b>gives way</b> to aircraft taking off, about to take off, or landing.</td></tr>
        <tr><td>Runway-holding positions</td><td><b>Stop and hold</b> at all runway-holding positions unless ATC clears you further.</td></tr>
        <tr><td>Stop bars</td><td><b>Stop and hold at a lit stop bar</b>; proceed only when the lights are switched off (and you're cleared).</td></tr>
      </table>
      <h2>UK order of priority on the ground</h2>
      <ol>
        <li>Aircraft <b>taking off or landing</b></li>
        <li>Aircraft <b>taxiing</b></li>
        <li><b>Vehicles towing aircraft</b></li>
        <li>Other vehicles and persons (give way to all of the above)</li>
      </ol>
      <p>Emergency vehicles responding to an emergency should be given priority over all other surface traffic.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Ground and air share the same three geometry rules: head-on → right; converging → give way to the one on your right; overtaken has priority.</li>
        <li>On the ground, head-on also allows "<b>stop</b>".</li>
      </ul></div>
      <div class="callout law">Source: SERA.3210(d)(4); Rules of the Air Regulations 2015.</div>`,
    mnemonics: [
      { title: "\"Right is might\"", text: "Converging: whoever is on the RIGHT has right of way." },
      { title: "\"Planes before trains (of tugs) before cars\"", text: "Take-off/landing aircraft → taxiing aircraft → vehicles towing aircraft → other vehicles & people." }
    ]
  },
  {
    num: 7, lesson: "l3", title: "Airfield Signage", tag: "Signs",
    summary: "Mandatory (red), location (black) and information/direction (yellow) signs on the manoeuvring area.",
    body: () => `
      <div class="gallery-wrap"><button class="btn small ghost gallery-toggle">🙈 Hide meanings — test yourself</button>
      <div class="gallery" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
        <figure class="sigcard"><div class="sign-row"><span class="sign mand">09-27</span></div><figcaption><b class="hideable">Runway designation sign (mandatory)</b><span class="meaning">White on red. Runway-holding position for runway 09/27 — do not enter without clearance.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign mand">B2</span></div><figcaption><b class="hideable">Holding position sign (mandatory)</b><span class="meaning">White on red. A designated holding point — stop here unless cleared beyond.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign mand">⊖</span></div><figcaption><b class="hideable">NO ENTRY sign (mandatory)</b><span class="meaning">White symbol on red. Entry to this area is prohibited.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign mand">CAT II</span></div><figcaption><b class="hideable">Category holding sign (mandatory)</b><span class="meaning">Holding position for ILS CAT II/III operations.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign loc">A</span></div><figcaption><b class="hideable">Location sign</b><span class="meaning">Yellow on black with a yellow border. "You are on taxiway A."</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign dir">← B</span><span class="sign dir">C ↗</span></div><figcaption><b class="hideable">Direction signs</b><span class="meaning">Black on yellow with arrows. Show the direction to other taxiways.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign loc">A</span><span class="sign dir">← B</span></div><figcaption><b class="hideable">Location + direction (combined)</b><span class="meaning">You are on A; B is to the left.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign dir">APRON →</span></div><figcaption><b class="hideable">Destination sign</b><span class="meaning">Black on yellow. Direction to a destination (apron, fuel, cargo…).</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign dir">B ↘</span></div><figcaption><b class="hideable">Runway exit sign</b><span class="meaning">Black on yellow. Identifies the exit taxiway from the runway.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign dir" style="padding:4px 10px"><svg width="56" height="26" viewBox="0 0 56 26"><line x1="2" y1="5" x2="54" y2="5" stroke="#111" stroke-width="2.5" stroke-dasharray="5 4"/><line x1="2" y1="11" x2="54" y2="11" stroke="#111" stroke-width="2.5" stroke-dasharray="5 4"/><line x1="2" y1="17" x2="54" y2="17" stroke="#111" stroke-width="2.5"/><line x1="2" y1="23" x2="54" y2="23" stroke="#111" stroke-width="2.5"/></svg></span></div><figcaption><b class="hideable">Runway vacated sign</b><span class="meaning">Black holding-marking symbol on yellow. Seen when leaving the runway: once past it you're clear of the runway / ILS sensitive area.</span></figcaption></figure>
        <figure class="sigcard"><div class="sign-row"><span class="sign dist">3</span></div><figcaption><b class="hideable">Runway distance remaining</b><span class="meaning">White on black beside the runway: thousands of feet (or metres) of runway left.</span></figcaption></figure>
      </div></div>
      <table class="ref"><tr><th>Type</th><th>Colours</th><th>Meaning</th></tr>
        <tr><td><b>Mandatory instruction</b></td><td>White on <b>red</b></td><td>Must be obeyed — do not proceed beyond without ATC clearance.</td></tr>
        <tr><td><b>Location</b></td><td>Yellow on <b>black</b> (yellow border)</td><td>Where you are.</td></tr>
        <tr><td><b>Information / direction / destination</b></td><td>Black on <b>yellow</b></td><td>Where to go.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Red = rule (mandatory). Black = "you are here". Yellow = "go that way".</li>
        <li>Mandatory signs sit on the <b>left</b> side of the taxiway (and sometimes both sides) at the holding position.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 14 Chapter 5; CAP 637.</div>`,
    mnemonics: [
      { title: "\"Red Rules, Yellow Yonder, Black is Base\"", text: "Red signs are mandatory rules, yellow signs point yonder (directions), black signs tell you your base location." },
      { title: "\"Black box — you're in the box\"", text: "A location sign (black with yellow border) is like a box drawn around where you are." }
    ]
  },
  {
    num: 8, lesson: "l3", title: "ICAO Aerodrome Markings", tag: "Markings",
    summary: "Runway designators, thresholds, displaced thresholds, chevrons, holding positions and closed areas.",
    body: () => `
      ${markingsDiagram()}
      <p class="diagram-cap">Runway markings are <b>white</b>; taxiway markings are <b>yellow</b>.</p>
      <h2>Runway markings</h2>
      <ul>
        <li><b>Designator</b>: magnetic direction of the runway to the nearest 10°, divided by 10 (e.g. 087°M → 09). Parallel runways add L / C / R.</li>
        <li><b>Threshold markings ("piano keys")</b>: longitudinal white stripes; the number of stripes indicates runway width (e.g. 4 for 18 m, 6 for 23 m, 8 for 30 m, 12 for 45 m, 16 for 60 m).</li>
        <li><b>Aiming point</b>: two large white rectangles — the visual aiming point.</li>
        <li><b>Touchdown zone markings</b>: pairs of white bars at intervals from the threshold.</li>
        <li><b>Centreline</b>: white dashes. <b>Side stripes</b> mark runway edges.</li>
      </ul>
      <h2>Displaced thresholds and pre-threshold areas</h2>
      ${thresholdDiagram()}
      <h2>Other markings</h2>
      ${gallery(
        markingCard("patternA", "Runway-holding position — Pattern A", "Two solid + two dashed yellow lines. STOP on the solid side. Dashed side faces the runway — you can cross from the dashed side to vacate.") +
        markingCard("patternB", "Runway-holding position — Pattern B", "Ladder pattern. ILS / CAT II/III holding position, further from the runway than Pattern A.") +
        markingCard("intermediate", "Intermediate holding position", "Single dashed yellow line across a taxiway (e.g. at taxiway intersections). Hold here if instructed.") +
        markingCard("closedRunway", "White cross on a runway", "Runway (or part of it) CLOSED / unfit for use.") +
        markingCard("closedTaxiway", "Yellow cross on a taxiway", "Taxiway (or part of it) CLOSED.") +
        markingCard("grassMarkers", "White markers on grass", "Edge/boundary markers of an unpaved (grass) runway.")
      )}
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>White arrows before a threshold bar = displaced threshold: <b>taxi and take off OK, don't land</b> on it.</li>
        <li>Yellow chevrons = <b>not usable</b> for normal movement (blast pad / stopway).</li>
        <li>Pattern A: <b>solid lines = stop</b> side. Pattern B: ILS holding point.</li>
        <li>White X = runway closed, yellow X = taxiway closed.</li>
      </ul></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Runway designators use <b>magnetic</b>, not true, direction.</li>
        <li>Arrows (displaced threshold) vs chevrons (unusable) — don't mix them up.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 14 Chapter 5; CAP 637.</div>`,
    mnemonics: [
      { title: "\"Solid = Stop, Dashed = Dash across\"", text: "At a Pattern A holding position you stop at the solid lines. From the runway side you may dash across the dashed lines to vacate." },
      { title: "\"Arrows = Allowed (to roll), Chevrons = Can't\"", text: "Displaced threshold arrows: you can taxi/take off. Yellow chevrons: can't use it at all normally." },
      { title: "\"White for wings, yellow for wheels\"", text: "Runway markings are white (where you fly from); taxiway markings yellow (where you roll)." }
    ]
  },
  {
    num: 9, lesson: "l2", title: "Aircraft Log Books", tag: "Documents",
    summary: "Airframe, engine and propeller log books — what's in them and how long they're kept.",
    body: () => `
      <p>Every UK-registered aircraft must have its maintenance history recorded in log books, kept by the <b>operator/owner</b>:</p>
      <table class="ref"><tr><th>Log book</th><th>Records</th></tr>
        <tr><td><b>Aircraft (airframe) log book</b></td><td>Aircraft type, constructor, serial number, nationality & registration marks, operator; maintenance, inspections, modifications, repairs, defects rectified and flying hours.</td></tr>
        <tr><td><b>Engine log book</b> — one per engine</td><td>Engine type & serial number, hours, overhauls, maintenance and modifications.</td></tr>
        <tr><td><b>Variable-pitch propeller log book</b> — one per VP propeller</td><td>As above for the propeller. (Fixed-pitch props are recorded in the aircraft log book.)</td></tr>
        <tr><td><b>Technical log</b> (where required)</td><td>Defects, rectification and certificates of release to service between flights — used mainly for commercial operations.</td></tr>
        <tr><td><b>Journey log</b> (Part-NCO)</td><td>Record of each flight: date, crew, departure/arrival places and times, flight time, nature of flight, incidents/remarks.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Log books must be kept until <b>2 years after</b> the aircraft, engine or VP propeller has been <b>destroyed or permanently withdrawn from use</b>.</li>
        <li>Entries must be made <b>as soon as practicable</b> after the event (maintenance entries within days, not weeks).</li>
        <li>Separate log books for the <b>aircraft</b>, <b>each engine</b> and <b>each variable-pitch propeller</b>.</li>
        <li>After maintenance, a <b>Certificate of Release to Service (CRS)</b> must be issued before the aircraft flies.</li>
      </ul></div>
      <div class="callout law">Source: Air Navigation Order 2016; UK Part-M / Part-ML; Part-NCO.GEN.135 (documents to be carried).</div>`,
    mnemonics: [
      { title: "\"A-E-P: Airframe, Engine, Prop\"", text: "Three kinds of log book: aircraft, each engine, each variable-pitch prop." },
      { title: "\"Logs live 2 years after death\"", text: "Aircraft log books are kept until 2 years after the aircraft/engine/prop is destroyed or withdrawn." }
    ]
  },
  {
    num: 10, lesson: "l2", title: "Weight Schedules", tag: "Documents",
    summary: "The document giving the aircraft's basic weight and centre of gravity, and how long it's kept.",
    body: () => `
      <p>Every aircraft with a C of A must have been <b>weighed</b> and its <b>centre of gravity determined</b>. The results go into a <b>weight schedule</b>, which the operator must keep.</p>
      <h3>The weight schedule shows</h3>
      <ul>
        <li><b>Basic weight</b> (basic empty weight): the aircraft + its basic equipment + <b>unusable fuel</b> and <b>unusable oil</b> (for most light piston aircraft).</li>
        <li><b>Centre of gravity position</b> at that basic weight.</li>
        <li>A list of the <b>basic equipment</b> included, and the date of weighing.</li>
      </ul>
      <h3>When to re-weigh</h3>
      <p>When the CAA requires it, and after modifications/repairs that significantly change the weight or CG. A new schedule is then produced.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Keep the weight schedule until <b>6 months after the NEXT occasion the aircraft is weighed</b>.</li>
        <li>It's the <b>operator's</b> responsibility to keep it.</li>
        <li>Basic weight <b>excludes</b> crew, passengers, baggage and usable fuel — those are added for each flight's load sheet.</li>
      </ul></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>"6 months after the next weighing" — not "6 months after issue", and not "2 years" (that's log books).</li>
      </ul></div>
      <div class="callout law">Source: Air Navigation Order 2016 (weighing of aircraft and weight schedules).</div>`,
    mnemonics: [
      { title: "\"Logs Two, Weights Six\"", text: "Log books: 2 years after withdrawal. Weight schedules: 6 months after the next weighing." },
      { title: "\"Basic = empty + undrinkable\"", text: "Basic weight includes the fuel and oil you can't actually use." }
    ]
  },
  {
    num: 11, lesson: "l2", title: "Night Navigation Lights & Collision Avoidance", tag: "Lights",
    summary: "Red, green and white navigation lights, their arcs, anti-collision lights, and reading other aircraft at night.",
    body: () => `
      <svg class="diagram" style="max-width:520px;margin:10px auto;background:#0a1430" viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Navigation light arcs">
        <path d="M200 180 L${200 - 160 * Math.sin(110 * Math.PI / 180)} ${180 + 160 * Math.cos(110 * Math.PI / 180)} A160 160 0 0 1 200 20 Z" fill="rgba(255,59,59,.35)" stroke="#ff3b3b"/>
        <path d="M200 180 L200 20 A160 160 0 0 1 ${200 + 160 * Math.sin(110 * Math.PI / 180)} ${180 + 160 * Math.cos(110 * Math.PI / 180)} Z" fill="rgba(61,255,138,.3)" stroke="#3dff8a"/>
        <path d="M200 180 L${200 + 160 * Math.sin(110 * Math.PI / 180)} ${180 + 160 * Math.cos(110 * Math.PI / 180)} A160 160 0 0 1 ${200 - 160 * Math.sin(110 * Math.PI / 180)} ${180 + 160 * Math.cos(110 * Math.PI / 180)} Z" fill="rgba(255,255,255,.18)" stroke="#fff"/>
        ${aircraftIcon(200, 180, 0, "#c8d2ea", 2.2)}
        <circle cx="167" cy="186" r="4" fill="#ff3b3b"/><circle cx="233" cy="186" r="4" fill="#3dff8a"/><circle cx="200" cy="211" r="4" fill="#fff"/>
        <g font-family="Inter,sans-serif" font-size="13" font-weight="700">
          <text x="100" y="90" fill="#ff8a8a">RED (left / port)</text><text x="100" y="106" fill="#ff8a8a" font-weight="400">110° from dead ahead</text>
          <text x="226" y="90" fill="#8affb8">GREEN (right / starboard)</text><text x="226" y="106" fill="#8affb8" font-weight="400">110° from dead ahead</text>
          <text x="200" y="318" text-anchor="middle" fill="#fff">WHITE (tail) — 140° arc</text><text x="200" y="334" text-anchor="middle" fill="#ddd" font-weight="400">70° either side of dead astern</text>
        </g>
      </svg>
      <ul>
        <li><b>Navigation (position) lights</b>: red on the left wingtip, green on the right wingtip, white at the tail. Their arcs together cover 360°.</li>
        <li><b>Anti-collision lights</b>: red or white <b>flashing</b> (beacon / strobes) to attract attention. Required at night, and on the ground when engines are running (beacon).</li>
        <li>Lights must be displayed between <b>sunset and sunrise</b>. UK <b>"night"</b> for licensing/logging is <b>from 30 minutes after sunset until 30 minutes before sunrise</b>.</li>
        <li>A pilot may switch off or reduce flashing lights if they adversely affect the pilot's duties or dazzle an observer.</li>
      </ul>
      <h2>Reading other aircraft at night</h2>
      <table class="ref"><tr><th>You see…</th><th>What it means</th><th>Action</th></tr>
        <tr><td><span class="swatch" style="background:#e53935"></span>Red only</td><td>You're on its <b>left</b>. If converging, it's on <b>your right</b>.</td><td><b>You give way</b> — normally turn right and pass behind it.</td></tr>
        <tr><td><span class="swatch" style="background:#2ecc71"></span>Green only</td><td>You're on its <b>right</b> — it has you on its right.</td><td>It should give way. <b>Maintain heading & speed</b>, keep watching.</td></tr>
        <tr><td><span class="swatch" style="background:#e53935"></span>+<span class="swatch" style="background:#2ecc71"></span> Red & green</td><td><b>Head-on</b>.</td><td>Both <b>alter heading to the right</b>.</td></tr>
        <tr><td><span class="swatch" style="background:#fff"></span>White only</td><td>You're <b>behind</b> it (in its tail arc).</td><td>If closing: you're overtaking → <b>keep clear, alter right</b>.</td></tr>
      </table>
      <div class="sim-slot" data-sim="navlights"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Red & green arcs are <b>110°</b> each; white is <b>140°</b>. 110 + 110 + 140 = 360.</li>
        <li>A constant relative bearing with the light getting brighter = <b>collision course</b>.</li>
      </ul></div>
      <div class="callout law">Source: SERA.3215 (lights to be displayed by aircraft); ANO 2016 (definition of night).</div>`,
    mnemonics: [
      { title: "\"There's a little red PORT LEFT in the bottle\"", text: "Port = Left = Red. So starboard = right = green." },
      { title: "\"Red: you're in its way — give way. Green: you've got the green light\"", text: "Seeing its red light on your right means you give way. Seeing green means it should give way to you (but stay alert)." },
      { title: "110 + 110 + 140 = 360", text: "Red and green each cover 110°, white covers the rear 140°." },
      { title: "\"Thirty-thirty night\"", text: "UK night = 30 min after sunset to 30 min before sunrise." }
    ]
  },
  {
    num: 12, lesson: "l2", title: "In-Flight Right-of-Way Rules", tag: "Rules",
    summary: "Head-on, converging, overtaking, landing — plus the category hierarchy that beats the 'on your right' rule.",
    body: () => `
      <p>The aircraft that has the right of way <b>maintains its heading and speed</b> — but is never relieved of the duty to avoid a collision. The aircraft giving way should avoid passing <b>over, under or in front</b> of the other unless well clear (and allowing for wake turbulence).</p>
      <table class="ref"><tr><th>Situation</th><th>Rule</th></tr>
        <tr><td><b>Head-on</b> (or nearly)</td><td><b>Each</b> aircraft alters heading to the <b>right</b>.</td></tr>
        <tr><td><b>Converging</b> at about the same level</td><td>The aircraft that has the other <b>on its right</b> gives way — <i>except</i> for the category hierarchy below.</td></tr>
        <tr><td><b>Overtaking</b></td><td>The aircraft being overtaken has right of way. The overtaking aircraft keeps out of the way by altering heading to the <b>right</b> (climbing, descending or level), and keeps clear until entirely past. <i>UK: a glider overtaking another glider may alter heading left or right.</i></td></tr>
        <tr><td><b>Landing</b></td><td>Aircraft in flight or on the ground give way to aircraft <b>landing or on final approach</b>. If two aircraft approach to land, the <b>higher gives way to the lower</b>, but the lower must not cut in front of one on final or overtake it.</td></tr>
        <tr><td><b>Emergency landing</b></td><td>Give way to any aircraft known to be <b>compelled to land</b>.</td></tr>
        <tr><td><b>Taking off</b></td><td>Taxiing aircraft give way to aircraft taking off or about to take off.</td></tr>
      </table>
      <h2>Category hierarchy (converging)</h2>
      <svg class="diagram" style="max-width:760px" viewBox="0 0 760 130" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="130" fill="var(--panel-2)"/>
        ${[["🎈 Balloons", "most priority"], ["🪂 Gliders", ""], ["Airships", ""], ["Towing aircraft", "(power-driven, seen towing)"], ["✈ Powered aircraft", "least priority"]].map(([label, note], index) => `
          <rect x="${10 + index * 150}" y="30" width="135" height="60" rx="10" fill="${["#1d5bd6", "#2b72e0", "#3b88e8", "#5aa0ef", "#7fb6f2"][index]}"/>
          <text x="${77 + index * 150}" y="64" text-anchor="middle" fill="#fff" font-weight="800" font-size="14" font-family="Inter,sans-serif">${label}</text>
          <text x="${77 + index * 150}" y="110" text-anchor="middle" fill="var(--muted)" font-size="11" font-family="Inter,sans-serif">${note}</text>`).join("")}
        <text x="380" y="20" text-anchor="middle" fill="var(--muted)" font-size="12" font-weight="700" font-family="Inter,sans-serif">← everyone to the right gives way to everyone to their left →</text>
      </svg>
      <ul>
        <li>Power-driven heavier-than-air aircraft give way to <b>airships, gliders and balloons</b>.</li>
        <li>Airships give way to <b>gliders and balloons</b>.</li>
        <li>Gliders give way to <b>balloons</b>.</li>
        <li>Power-driven aircraft give way to aircraft <b>seen to be towing</b> other aircraft or objects (gliders, banners).</li>
      </ul>
      <h2>Overtaking — definition</h2>
      <p>An aircraft is <b>overtaking</b> when it approaches another from the rear on a line forming an angle of less than <b>70°</b> with the other's plane of symmetry — i.e. it's in the other's <b>white tail-light arc</b> and at night couldn't see either nav light.</p>
      <h2>UK: Right-hand traffic rule</h2>
      <p>An aircraft flying in sight of the ground and following a road, railway, canal, coastline or other line feature should keep that feature on its <b>left</b> (so opposite traffic passes safely).</p>
      <div class="sim-slot" data-sim="rightofway"></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>The hierarchy <b>beats</b> the "on your right" rule: a glider on your left still has priority over your powered aircraft.</li>
        <li>Overtaking → alter to the <b>right</b> (not left) — except gliders overtaking gliders in the UK.</li>
        <li>Landing: the <b>lower</b> aircraft has priority.</li>
      </ul></div>
      <div class="callout law">Source: SERA.3210 (right-of-way); Rules of the Air Regulations 2015 (UK right-hand traffic rule and glider overtaking).</div>`,
    mnemonics: [
      { title: "\"Balloons Glide Above Planes\"", text: "Priority order: Balloons → Gliders → Airships → Powered (with towing aircraft above other powered). Least manoeuvrable gets priority." },
      { title: "\"Right is might\"", text: "Converging, same category: the aircraft on the right has right of way." },
      { title: "\"Always go right\"", text: "Head-on: both go right. Overtaking: overtaker goes right. Following a line feature: keep it on your left (so you're on the right)." },
      { title: "\"Low goes first\"", text: "Two aircraft landing: the lower one has priority — but mustn't cut in." }
    ]
  },
  {
    num: 13, lesson: "l2", title: "Certificate of Airworthiness (C of A)", tag: "Documents",
    summary: "What a C of A is, how it stays valid (ARC, maintenance, flight manual limits) and the Permit to Fly alternative.",
    body: () => `
      <p>A <b>Certificate of Airworthiness</b> is issued by the State of Registry (the <b>CAA</b> for G-registered aircraft) when an aircraft conforms to its approved <b>type design</b> and is in a condition for safe operation. A UK-registered aircraft must not fly without a valid C of A — or a <b>Permit to Fly</b> where it doesn't qualify for one.</p>
      <h2>How it stays valid</h2>
      <ul>
        <li>For most certified light aircraft the C of A itself <b>doesn't expire</b>, but it is only valid with a current <b>Airworthiness Review Certificate (ARC)</b>, valid for <b>12 months</b>.</li>
        <li>The aircraft must be <b>maintained</b> in accordance with its approved maintenance programme, with a <b>Certificate of Release to Service (CRS)</b> after maintenance.</li>
        <li>Only <b>approved</b> modifications and repairs may be carried out.</li>
        <li>It must be operated within the limits of its <b>flight manual / POH</b> (which forms part of the basis of the C of A).</li>
        <li>Defects affecting airworthiness must be rectified (or deferred in accordance with approved procedures) before flight.</li>
      </ul>
      <h2>Types</h2>
      <table class="ref"><tr><th>Document</th><th>Used for</th></tr>
        <tr><td><b>Standard C of A</b></td><td>Type-certificated aircraft meeting ICAO standards — valid for international flight.</td></tr>
        <tr><td><b>Restricted C of A</b></td><td>Aircraft that don't fully meet standard requirements — operating restrictions apply.</td></tr>
        <tr><td><b>Permit to Fly</b></td><td>Aircraft without a C of A (e.g. many LAA homebuilts, vintage/ex-military). Usually restricted to UK airspace unless foreign states accept it.</td></tr>
      </table>
      <h2>Documents to be carried (Part-NCO)</h2>
      <p>Certificate of Registration, C of A (and ARC), noise certificate (if applicable), radio licence, insurance certificate, AFM/POH, journey log, and crew licences/medicals. For flights that <b>take off and land at the same aerodrome</b>, the aircraft documents may be kept at that aerodrome instead.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>ARC = <b>A</b>nnual <b>R</b>eview <b>C</b>ertificate (valid 1 year).</li>
        <li>An <b>unapproved modification</b>, missed maintenance, or operating outside the flight manual limits <b>invalidates</b> the C of A.</li>
        <li>No C of A? You need a <b>Permit to Fly</b>.</li>
      </ul></div>
      <div class="callout law">Source: Air Navigation Order 2016; UK Part-21 & Part-M/ML; Part-NCO.GEN.135.</div>`,
    mnemonics: [
      { title: "\"No ARC, no spark\"", text: "C of A is only valid with a current ARC (12 months)." },
      { title: "\"MAD invalidates\"", text: "Maintenance missed, Alterations not approved, Defects not fixed — any one invalidates the C of A." }
    ]
  },
  {
    num: 14, lesson: "l2", title: "Crew Log Books", tag: "Documents",
    summary: "Your personal flying log — what to record, how flight time is defined, and how long to keep it.",
    body: () => `
      <p>Every pilot must keep a <b>reliable record</b> of all flights flown (personal flying log book).</p>
      <h3>What it must record</h3>
      <ul>
        <li>Holder's <b>name and address</b>.</li>
        <li>For each flight: <b>date</b>, <b>place and time of departure and arrival</b>, aircraft <b>type and registration</b>, <b>capacity</b> in which the holder acted (PIC, dual/student, co-pilot, instructor…), <b>flight time</b>, and conditions (e.g. night, instrument).</li>
        <li>Details of any flight tests/checks, and simulator time.</li>
      </ul>
      <h3>Flight time (aeroplanes)</h3>
      <p>From the moment an aircraft <b>first moves for the purpose of taking off</b> until the moment it <b>finally comes to rest at the end of the flight</b> ("chocks off to chocks on").</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Keep your log book for at least <b>2 years after the date of the last entry</b>.</li>
        <li>Produce it to an authorised person (e.g. CAA) on request within a reasonable time.</li>
        <li>Flight time = <b>first movement for take-off → finally comes to rest</b> (not wheels-up to wheels-down).</li>
      </ul></div>
      <div class="callout law">Source: UK Part-FCL FCL.050 (recording of flight time) and FCL.010 definitions; Air Navigation Order 2016.</div>`,
    mnemonics: [
      { title: "\"Last entry + 2\"", text: "Personal log: 2 years after the LAST entry. Aircraft logs: 2 years after WITHDRAWAL." },
      { title: "\"Moves to rest\"", text: "Flight time runs from when it first moves to take off until it finally comes to rest." }
    ]
  },
  {
    num: 15, lesson: "l2", title: "Pilot's Operating Handbook (POH)", tag: "Documents",
    summary: "The standard POH/AFM sections, the approved limitations, and airspeed indicator markings.",
    body: () => `
      <p>The <b>Pilot's Operating Handbook (POH)</b> / <b>Aircraft Flight Manual (AFM)</b> contains the information needed to operate the aircraft safely. Its <b>limitations</b> are legally binding and form part of the conditions of the C of A. It must be <b>carried on board</b>.</p>
      <h2>Standard sections (GAMA format)</h2>
      <table class="ref"><tr><th>#</th><th>Section</th><th>Contents</th></tr>
        <tr><td>1</td><td>General</td><td>Dimensions, engine, propeller, fuel & oil grades/capacities, definitions & abbreviations</td></tr>
        <tr><td>2</td><td><b>Limitations</b> (approved)</td><td>Airspeed limits & markings, weight & CG limits, load factors, engine limits, placards, kinds of operation</td></tr>
        <tr><td>3</td><td>Emergency Procedures</td><td>Engine failure, fires, forced landings, checklists</td></tr>
        <tr><td>4</td><td>Normal Procedures</td><td>Checklists and speeds for normal operation</td></tr>
        <tr><td>5</td><td>Performance</td><td>Take-off & landing distances, climb, cruise, stall speeds, crosswind</td></tr>
        <tr><td>6</td><td>Weight & Balance / Equipment List</td><td>Loading, CG calculation, equipment</td></tr>
        <tr><td>7</td><td>Aircraft & Systems Description</td><td>How the systems work</td></tr>
        <tr><td>8</td><td>Handling, Servicing & Maintenance</td><td>Ground handling, servicing, owner maintenance</td></tr>
        <tr><td>9</td><td>Supplements</td><td>Optional equipment (avionics, etc.)</td></tr>
      </table>
      <h2>Airspeed indicator markings</h2>
      <div class="two-col" style="align-items:center">
        <div>${asiDiagram()}<p class="diagram-cap" style="text-align:center">Example values: Cessna 152 (KIAS)</p></div>
        <table class="ref"><tr><th>Marking</th><th>Meaning</th></tr>
          <tr><td><span class="swatch" style="background:#fff"></span><b>White arc</b></td><td>Flap operating range: <b>V<sub>SO</sub></b> (stall, landing config) → <b>V<sub>FE</sub></b> (max flap extended)</td></tr>
          <tr><td><span class="swatch" style="background:#2ecc71"></span><b>Green arc</b></td><td>Normal operating range: <b>V<sub>S1</sub></b> (stall, clean) → <b>V<sub>NO</sub></b> (max structural cruising)</td></tr>
          <tr><td><span class="swatch" style="background:#f1c40f"></span><b>Yellow arc</b></td><td>Caution range <b>V<sub>NO</sub> → V<sub>NE</sub></b> — smooth air only</td></tr>
          <tr><td><span class="swatch" style="background:#ff3030"></span><b>Red line</b></td><td><b>V<sub>NE</sub></b> — never exceed speed</td></tr>
        </table>
      </div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Section 2 <b>Limitations</b> is the approved, legally binding section.</li>
        <li>Stall speeds and take-off/landing distances → Section <b>5 Performance</b>. Emergencies → Section <b>3</b>.</li>
        <li>Bottom of white arc = V<sub>SO</sub>; bottom of green = V<sub>S1</sub>; top of green = V<sub>NO</sub>; red line = V<sub>NE</sub>.</li>
      </ul></div>
      <div class="callout law">Source: Part-NCO (AFM to be carried and complied with); GAMA Specification No. 1 (POH layout).</div>`,
    mnemonics: [
      { title: "\"Good Landings Every Night Prove Wise Student Habits Stick\"", text: "General · Limitations · Emergency · Normal · Performance · Weight & balance · Systems · Handling · Supplements." },
      { title: "\"White Wings (flaps), Green Go, Yellow Yikes, Red Rip\"", text: "White = flaps OK, green = normal, yellow = smooth air only, red = never exceed." },
      { title: "\"S-O = Stall Out (flaps out)\"", text: "VSO is stall with flaps Out (landing config, bottom of white). VS1 is stall clean (bottom of green)." }
    ]
  },
  {
    num: 16, lesson: "l2", title: "Low Flying Rules", tag: "Rules",
    summary: "Minimum heights over congested areas and elsewhere — and the UK's 500 ft 'bubble'.",
    body: () => `
      <svg class="diagram" style="max-width:820px" viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Low flying minima">
        <rect width="820" height="260" fill="#cfe3f5"/>
        <rect y="220" width="820" height="40" fill="#5b8a3c"/>
        ${[30, 60, 90, 120, 150, 180, 210, 240, 270].map((x, index) => `<rect x="${x}" y="${220 - (30 + (index % 3) * 18)}" width="22" height="${30 + (index % 3) * 18}" fill="#8d99ae"/>`).join("")}
        <rect x="140" y="140" width="10" height="80" fill="#5c677d"/>
        <line x1="40" y1="60" x2="300" y2="60" stroke="#d32f2f" stroke-width="2" stroke-dasharray="6 4"/>
        <line x1="145" y1="140" x2="145" y2="62" stroke="#1d5bd6" stroke-width="2"/><text x="152" y="104" font-size="13" font-weight="700" fill="#1d5bd6" font-family="Inter,sans-serif">1000 ft</text>
        <text x="40" y="50" font-size="13" font-weight="700" fill="#13203b" font-family="Inter,sans-serif">Congested area: ≥ 1000 ft above highest obstacle within 600 m</text>
        ${aircraftIcon(220, 55, 90, "#13203b", 1.1)}
        <text x="40" y="245" font-size="12" fill="#fff" font-family="Inter,sans-serif">+ must be able to land clear if the engine fails</text>
        <circle cx="620" cy="200" r="80" fill="rgba(211,47,47,.15)" stroke="#d32f2f" stroke-dasharray="6 4"/>
        <rect x="605" y="190" width="30" height="20" fill="#795548"/><circle cx="650" cy="212" r="5" fill="#13203b"/>
        <text x="620" y="105" text-anchor="middle" font-size="13" font-weight="700" fill="#d32f2f" font-family="Inter,sans-serif">UK: 500 ft "bubble"</text>
        <text x="620" y="88" text-anchor="middle" font-size="12" fill="#13203b" font-family="Inter,sans-serif">no closer than 500 ft to any person, vessel, vehicle or structure</text>
        ${aircraftIcon(760, 160, 90, "#13203b", 1.1)}
        <text x="440" y="40" font-size="13" font-weight="700" fill="#13203b" font-family="Inter,sans-serif">Elsewhere (open country)</text>
      </svg>
      <h2>The rules</h2>
      <p>Except when necessary for <b>take-off or landing</b>, or with CAA permission, a VFR flight must not be flown:</p>
      <table class="ref"><tr><th>Where</th><th>Minimum</th></tr>
        <tr><td>Over <b>congested areas</b> of cities, towns or settlements, or over an <b>open-air assembly of persons</b></td><td><b>1000 ft above the highest obstacle within 600 m</b> of the aircraft — and high enough to land clear without undue hazard to people or property if a power unit fails.</td></tr>
        <tr><td><b>Elsewhere</b> — SERA text</td><td>500 ft above the ground or water, or 500 ft above the highest obstacle within 150 m of the aircraft.</td></tr>
        <tr><td><b>Elsewhere — as applied in the UK</b></td><td>The UK applies an exemption to the SERA 500 ft rule: the aircraft must not be flown <b>closer than 500 ft to any person, vessel, vehicle or structure</b>.</td></tr>
        <tr><td><b>VFR at night</b></td><td>At least <b>1000 ft above the highest obstacle within 8 km</b> of the estimated position (except for take-off/landing).</td></tr>
      </table>
      <div class="sim-slot" data-sim="lowflying"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li><b>1000 ft / 600 m</b> over towns and crowds. <b>500 ft</b> from people, vessels, vehicles and structures elsewhere (UK).</li>
        <li>Over congested areas you must <b>also</b> be able to glide clear if the engine fails.</li>
        <li>Exception: <b>taking off and landing</b> in accordance with normal aviation practice.</li>
        <li>Regardless of minima, you must never fly in a way that is <b>negligent or reckless</b> and endangers people or property.</li>
      </ul></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>600 <b>metres</b> radius, 1000 <b>feet</b> height — the units are mixed on purpose.</li>
        <li>The UK 500 ft rule is a <b>distance from things</b>, not a height above the ground.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5005(f), SERA.3105, SERA.5005(c) (night VFR); UK CAA general exemption to SERA.5005(f)(2) — check the current version in your course material.</div>`,
    mnemonics: [
      { title: "\"Thousand for towns, five hundred for the rest\"", text: "1000 ft over congested areas/crowds (within 600 m); 500 ft elsewhere." },
      { title: "\"People Very Very Scared\"", text: "The UK 500 ft bubble: Persons, Vessels, Vehicles, Structures." },
      { title: "\"6-1-0: six hundred metres, one thousand feet, zero excuses\"", text: "Congested area rule: 600 m radius, 1000 ft above the highest obstacle." },
      { title: "\"Night: 1-8\"", text: "Night VFR: 1000 ft above the highest obstacle within 8 km." }
    ]
  },
  {
    num: 17, lesson: "l2", title: "Collision Avoidance Responsibility", tag: "Rules",
    summary: "The PIC is always responsible for avoiding collisions — whatever the right of way, airspace or ATC clearance.",
    body: () => `
      <ul>
        <li>Nothing in the rules relieves the <b>pilot-in-command</b> of the responsibility to take whatever action, including collision avoidance manoeuvres based on <b>ACAS resolution advisories</b>, will best avert a collision.</li>
        <li><b>Vigilance</b> (lookout) must not be relaxed on board an aircraft, <b>regardless of the type of flight or the class of airspace</b> — and also while operating on the movement area.</li>
        <li>An aircraft must not be operated in such <b>proximity</b> to other aircraft as to create a collision hazard. Formation flying only by prior arrangement.</li>
        <li>The aircraft with right of way <b>maintains heading and speed</b> — but must still act if a collision becomes likely.</li>
        <li>An <b>ATC clearance</b> doesn't remove the pilot's responsibility. In many classes (e.g. D, E, G) ATC don't separate VFR from VFR — they may only pass <b>traffic information</b>.</li>
      </ul>
      <h2>Lookout technique</h2>
      <ul>
        <li>Scan systematically in <b>sectors of about 10–15°</b>, pausing about <b>1 second</b> in each so your eyes can focus.</li>
        <li>Clear blind spots: lift a wing before turning; gentle S-turns or lowering the nose in a long climb.</li>
        <li><b>Empty-field myopia</b>: with nothing to focus on (haze, clear sky) your eyes relax to a short focus — focus deliberately on distant objects.</li>
        <li>An aircraft on a collision course appears <b>stationary</b> on the windscreen, then grows rapidly at the last moment ("blossoming").</li>
      </ul>
      <div class="sim-slot" data-sim="collision"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Ultimate responsibility for collision avoidance: <b>the pilot-in-command</b>.</li>
        <li>Constant relative bearing + decreasing range = <b>collision risk</b>.</li>
        <li>Follow an <b>ACAS RA</b> even if it conflicts with ATC instructions (for equipped aircraft).</li>
      </ul></div>
      <div class="callout law">Source: SERA.3201, SERA.3205, SERA.3210(a)–(b); SERA.2010 (responsibilities of the PIC).</div>`,
    mnemonics: [
      { title: "\"Right of way is not a right to collide\"", text: "Having priority never removes your duty to avoid the other aircraft." },
      { title: "\"Still and growing — get going\"", text: "If another aircraft doesn't move on your windscreen but gets bigger, you're on a collision course — act now." },
      { title: "\"10 degrees, 1 second\"", text: "Scan in ~10° sectors, ~1 second each." }
    ]
  }
];
