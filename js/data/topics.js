const LESSONS = {
  l1: { name: "Lesson 1 — Legislation", short: "Lesson 1" },
  l3: { name: "Lesson 3 — Aerodromes", short: "Lesson 3" },
  l4: { name: "Lesson 4 — Altimeter Settings & Airspace", short: "Lesson 4" },
  l5: { name: "Lesson 5 — Air Traffic Management, Security, Customs & Immigration", short: "Lesson 5" },
  l6: { name: "Lesson 6 — Visual Flight Rules & Instrument Flight Rules", short: "Lesson 6" },
  l7: { name: "Lesson 7 — Pilot Licences", short: "Lesson 7" },
  l8: { name: "Lesson 8 — Operating an Aircraft", short: "Lesson 8" },
  l9: { name: "Lesson 9 — Distress, Urgency, Safety, Warning, SAR & Accidents", short: "Lesson 9" },
  l2: { name: "Lesson 2 — Registration, Airworthiness & Rules of the Air", short: "Lesson 2" }
};

const LESSON_ORDER = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

const TOPICS = [
  {
    id: "aics", lesson: "l1", title: "Aeronautical Information Circulars (AICs)", tag: "Information",
    summary: "Colour-coded circulars for information that belongs in neither the AIP nor a NOTAM.",
    body: () => `
      <p><b>Aeronautical Information Circulars (AICs)</b> are published by the UK Aeronautical Information Service (AIS, run by NATS for the CAA). They carry information that <b>does not qualify for the AIP or a NOTAM</b>:</p>
      <ul>
        <li>Advance notice of <b>major changes</b> in legislation, regulations, procedures or facilities.</li>
        <li>Purely <b>explanatory or advisory</b> information affecting flight safety (e.g. carburettor icing, wake turbulence).</li>
        <li>Explanatory information on <b>technical, legislative or administrative</b> matters.</li>
      </ul>
      <h2>Colour coding</h2>
      ${gallery(
        colourCard("#ffffff", "#13203b", "White", "Administrative matters — e.g. charges, exam dates, licensing admin.") +
        colourCard("#fdd835", "#13203b", "Yellow", "Operational matters, including ATS facilities and requirements.") +
        colourCard("#f8bbd0", "#13203b", "Pink", "Safety-related topics.") +
        colourCard("#ce93d8", "#13203b", "Mauve", "UK airspace restrictions (e.g. temporary restricted areas for displays).") +
        colourCard("#a5d6a7", "#13203b", "Green", "Maps and charts.")
      )}
      <p>Each AIC is numbered by colour letter, serial number and year (e.g. <span class="mono">P 012/2026</span> for a pink one). A checklist of current AICs is published periodically.</p>
      <h2>Where AICs fit in the UK aeronautical information system</h2>
      <table class="ref"><tr><th>Product</th><th>Used for</th></tr>
        <tr><td><b>AIP</b> (Aeronautical Information Publication)</td><td>Permanent information. Three parts: <b>GEN</b> (general), <b>ENR</b> (en route), <b>AD</b> (aerodromes).</td></tr>
        <tr><td><b>AIP Amendments</b></td><td>Permanent changes. Significant ones follow the <b>AIRAC</b> cycle (common effective dates every <b>28 days</b>).</td></tr>
        <tr><td><b>AIP Supplements</b></td><td>Temporary changes of long duration, or with lots of text/charts.</td></tr>
        <tr><td><b>NOTAM</b></td><td>Temporary or short-notice information essential to flight operations.</td></tr>
        <tr><td><b>AIC</b></td><td>Everything else: advance notice, advice, explanation, admin.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Pink = <b>safety</b>. Yellow = <b>operational</b> (incl. ATS). White = <b>administrative</b>. Mauve = <b>airspace restrictions</b>. Green = <b>maps/charts</b>.</li>
        <li>AICs give information that <b>doesn't qualify</b> for the AIP or a NOTAM.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 15; UK AIP GEN 3.1 (Aeronautical Information Services).</div>`,
    mnemonics: [
      { title: "\"Pink Peril, Yellow Yoke, White Wallet, Mauve Mind-the-airspace, Green Geography\"", text: "Pink = safety, Yellow = operational, White = admin (fees, money), Mauve = airspace restrictions, Green = maps." },
      { title: "\"AIP = Always, NOTAM = Now, AIC = Also\"", text: "AIP is permanent, NOTAMs are short-notice/temporary, AICs cover everything else." }
    ]
  },
  {
    id: "chicago-search", lesson: "l1", title: "Chicago Convention: Search of Aircraft and Inspection of Documents", tag: "Chicago Convention",
    summary: "Article 16 — states may search foreign aircraft on landing or departure and inspect their documents.",
    body: () => `
      <p>The <b>Convention on International Civil Aviation</b> was signed in <b>Chicago in 1944</b>. It created <b>ICAO</b> and set out the rights and duties of contracting states. Detailed Standards and Recommended Practices (SARPs) are in its <b>Annexes</b> (e.g. Annex 2 Rules of the Air, Annex 7 Registration Marks, Annex 8 Airworthiness, Annex 14 Aerodromes, Annex 15 AIS).</p>
      <h2>Article 16 — Search of aircraft</h2>
      <div class="callout key" style="margin-top:6px"><b class="title">The rule</b>The appropriate authorities of each contracting state have the right, <b>without unreasonable delay</b>, to <b>search</b> aircraft of the other contracting states <b>on landing or departure</b>, and to <b>inspect the certificates and other documents</b> prescribed by the Convention.</div>
      <h3>Related articles</h3>
      <table class="ref"><tr><th>Article</th><th>Says</th></tr>
        <tr><td><b>11</b> Applicability of air regulations</td><td>A state's laws on admission to, departure from and operation within its territory apply to aircraft of <b>all</b> contracting states <b>without distinction of nationality</b>.</td></tr>
        <tr><td><b>13</b> Entry and clearance regulations</td><td>A state's rules on admission/departure of <b>passengers, crew and cargo</b> (immigration, passports, customs, quarantine) must be complied with.</td></tr>
        <tr><td><b>29</b> Documents carried</td><td>The documents the inspecting authority can ask to see — see the "Documents Carried on International Flights" topic.</td></tr>
      </table>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Search is allowed on <b>landing or departure</b> — not "at any time in flight".</li>
        <li>It must be done "without <b>unreasonable delay</b>".</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Articles 11, 13, 16.</div>`,
    mnemonics: [
      { title: "\"Sixteen: Search the Scene\"", text: "Article 16 = search aircraft and inspect documents, on landing or departure, without unreasonable delay." }
    ]
  },
  {
    id: "chicago-customs-duty", lesson: "l1", title: "Chicago Convention: Customs Duty Exemptions", tag: "Chicago Convention",
    summary: "Article 24 — fuel, oil, spares, equipment and stores kept on board are free of customs duty.",
    body: () => `
      <h2>Article 24 — Customs duty</h2>
      <ul>
        <li>An aircraft flying to, from or across another contracting state is <b>admitted temporarily free of duty</b> (subject to that state's customs regulations).</li>
        <li><b>Fuel, lubricating oils, spare parts, regular equipment and aircraft stores</b> on board on arrival, and <b>retained on board</b> on leaving, are <b>exempt from customs duty, inspection fees</b> and similar charges.</li>
        <li>The exemption does <b>not</b> apply to quantities or articles <b>unloaded</b> (except in accordance with customs regulations, which may require them to be kept under customs supervision).</li>
        <li><b>Spare parts and equipment imported</b> for installation in, or use by, an aircraft engaged in international air navigation are also admitted free of duty.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>The key words are "<b>retained on board</b>". Unload it and the exemption normally no longer applies.</li>
        <li>Covers <b>fuel, oil, spares, regular equipment, stores</b> — not passengers' goods or cargo.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Article 24.</div>`,
    mnemonics: [
      { title: "\"24-hour shop: FOSES stays on board\"", text: "Article 24 — Fuel, Oil, Spares, Equipment, Stores are duty-free as long as they stay on board." }
    ]
  },
  {
    id: "chicago-rules-of-air", lesson: "l1", title: "Chicago Convention: Rules of the Air Compliance", tag: "Chicago Convention",
    summary: "Article 12 — obey the rules of the state you're flying over; over the high seas, ICAO Annex 2 applies.",
    body: () => `
      ${sovereigntyDiagram()}
      <h2>Article 12 — Rules of the air</h2>
      <ul>
        <li>Each state ensures that every aircraft <b>flying over its territory</b>, and every aircraft <b>carrying its nationality mark wherever it is</b>, complies with the rules and regulations on flight and manoeuvre of aircraft <b>in force there</b>.</li>
        <li>States keep their own rules as uniform as possible with those established under the Convention.</li>
        <li><b>Over the high seas</b>, the rules in force are those established under the Convention — <b>ICAO Annex 2 (Rules of the Air)</b>, with no national differences.</li>
        <li>Each state undertakes to ensure the <b>prosecution</b> of all persons violating the regulations.</li>
      </ul>
      <h2>Article 38 — Departures from ICAO standards</h2>
      <p>A state <b>may</b> adopt rules that differ from ICAO standards, but it must <b>notify ICAO</b> of the differences, and they are <b>published</b>. The UK lists its differences in <b>AIP GEN 1.7</b>. Over the high seas, no differences are allowed.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>A G-registered aircraft flying over France follows <b>French</b> rules.</li>
        <li>Over international waters: <b>Annex 2</b>.</li>
        <li>States may differ from ICAO rules <b>as long as the differences are notified and published</b> (Article 38).</li>
        <li>The UK uses <b>SERA</b> (Standardised European Rules of the Air), retained in UK law, plus the UK Rules of the Air Regulations 2015.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Article 12; ICAO Annex 2.</div>`,
    mnemonics: [
      { title: "\"When in Rome, fly as the Romans fly\"", text: "Article 12: obey the rules of the state you are over. At sea, use ICAO's Annex 2." },
      { title: "\"Twelve miles of water, Twelve's the article\"", text: "Territorial waters are normally 12 nm, and Article 12 decides whose rules apply." }
    ]
  },
  {
    id: "radio-licensing", lesson: "l1", title: "Aircraft Radio Station and Operator Licensing", tag: "Licensing",
    summary: "Article 30 — the radio needs a licence from the state of registry, and so does the person using it.",
    body: () => `
      <h2>Article 30 — Aircraft radio equipment</h2>
      <ul>
        <li>Aircraft of each contracting state may carry <b>radio transmitting apparatus</b> in other states only if a <b>licence to install and operate</b> it has been issued by the <b>state of registration</b>.</li>
        <li>Radio used in another state's territory must be used <b>in accordance with that state's regulations</b>.</li>
        <li>Radio transmitting apparatus may be used only by <b>members of the flight crew</b> who hold a <b>special licence</b> for the purpose, issued by the <b>state of registration</b>.</li>
      </ul>
      <h2>In the UK</h2>
      <table class="ref"><tr><th>Licence</th><th>Covers</th><th>Issued by</th></tr>
        <tr><td><b>Aircraft Radio Licence</b> (radio station licence)</td><td>The <b>equipment</b> installed in the aircraft</td><td><b>Ofcom</b></td></tr>
        <tr><td><b>FRTOL</b> — Flight Radiotelephony Operator's Licence</td><td>The <b>person</b> operating the radio</td><td><b>CAA</b></td></tr>
      </table>
      <p>A student pilot may use the radio during flight training under the supervision of an instructor before holding an FRTOL.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Two licences: one for the <b>station</b> (aircraft), one for the <b>operator</b> (pilot).</li>
        <li>Both are issued under the authority of the <b>state of registration</b>.</li>
        <li>The radio licence is one of the documents carried on international flights (if radio is fitted).</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Article 30; Air Navigation Order 2016; Wireless Telegraphy Act 2006.</div>`,
    mnemonics: [
      { title: "\"Box and Brain\"", text: "The box (radio station) needs an Ofcom licence; the brain (operator) needs a CAA FRTOL." },
      { title: "\"Thirty — talk dirty? Need a licence\"", text: "Article 30: radio needs licensing by the state of registration." }
    ]
  },
  {
    id: "chicago-customs-airports", lesson: "l1", title: "Chicago Convention: Landing at Customs Airports", tag: "Chicago Convention",
    summary: "Article 10 — when entering or leaving a state, land at and depart from a designated customs airport.",
    body: () => `
      <h2>Article 10 — Landing at customs airport</h2>
      <ul>
        <li>Except where permitted to cross a territory without landing, every aircraft <b>entering</b> a contracting state must, if that state's regulations require, <b>land at an airport designated by that state</b> for customs and other examination.</li>
        <li>On <b>departure</b> from the territory, the aircraft must depart from a similarly <b>designated customs airport</b>.</li>
        <li>States <b>publish</b> the particulars of their designated customs airports (in the UK, in the AIP).</li>
      </ul>
      <h2>UK practice</h2>
      <ul>
        <li>International GA flights normally need advance notice to Border Force (the <b>General Aviation Report</b>, GAR) and may be restricted to airports with customs/immigration arrangements. Check the current requirements before any international flight.</li>
        <li>Related: Article <b>13</b> — passengers, crew and cargo must comply with immigration, customs and quarantine rules.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Entering a state: land at a <b>designated customs airport</b>. Leaving: depart from one.</li>
        <li>Unless the state allows you to cross without landing.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Articles 10 and 13; UK AIP GEN 1.2.</div>`,
    mnemonics: [
      { title: "\"Ten: in and out through the customs door\"", text: "Article 10: arrive at and depart from a designated customs airport." }
    ]
  },
  {
    id: "international-documents", lesson: "l1", title: "Documents Carried on International Flights", tag: "Documents",
    summary: "Article 29 — the seven documents every aircraft engaged in international navigation must carry.",
    body: () => `
      <h2>Article 29 — Documents carried in aircraft</h2>
      <table class="ref"><tr><th></th><th>Document</th><th>When</th></tr>
        <tr><td>1</td><td><b>Certificate of Registration</b></td><td>Always</td></tr>
        <tr><td>2</td><td><b>Certificate of Airworthiness</b></td><td>Always</td></tr>
        <tr><td>3</td><td>Appropriate <b>licences for each crew member</b></td><td>Always</td></tr>
        <tr><td>4</td><td><b>Journey log book</b></td><td>Always</td></tr>
        <tr><td>5</td><td><b>Aircraft radio station licence</b></td><td>If equipped with radio</td></tr>
        <tr><td>6</td><td><b>List of passengers</b> — names, places of embarkation and destination</td><td>If carrying passengers</td></tr>
        <tr><td>7</td><td><b>Cargo manifest</b> and detailed declarations</td><td>If carrying cargo</td></tr>
      </table>
      <h3>Related articles</h3>
      <ul>
        <li><b>Art 31</b>: every aircraft in international navigation has a C of A issued or rendered valid by the <b>state of registration</b>.</li>
        <li><b>Art 32</b>: crew licences are issued or rendered valid by the state of registration.</li>
        <li><b>Art 33</b>: other states <b>recognise</b> certificates and licences that meet ICAO minimum standards.</li>
        <li><b>Art 34</b>: a <b>journey log book</b> is kept for every aircraft in international navigation, recording the aircraft, crew and each journey.</li>
      </ul>
      <p>In practice you'll also carry the <b>insurance certificate</b>, <b>noise certificate</b> (if applicable), <b>flight manual/POH</b> and crew <b>medicals</b> — required by UK/European rules (Part-NCO) rather than by Article 29.</p>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>The pilot's <b>personal log book</b> and the <b>weight schedule</b> are <b>not</b> Article 29 documents.</li>
        <li>Radio licence, passenger list and cargo manifest are <b>conditional</b>.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Articles 29, 31–34; Part-NCO.GEN.135.</div>`,
    mnemonics: [
      { title: "\"Real Airmen Love Journeys — Radio, People, Packages\"", text: "Registration, Airworthiness, Licences, Journey log — always. Radio licence, Passenger list, cargo manifest (Packages) — when applicable." },
      { title: "\"29 = 7 documents\"", text: "Article 29 lists seven documents: four always, three conditional." }
    ]
  },
  {
    id: "chicago-non-scheduled", lesson: "l1", title: "Chicago Convention: Right of Non-Scheduled Flight", tag: "Chicago Convention",
    summary: "Article 5 — non-scheduled flights may enter, overfly and make technical stops without prior permission.",
    body: () => `
      <h2>Article 5 — Right of non-scheduled flight</h2>
      <ul>
        <li>Aircraft of other contracting states <b>not engaged in scheduled international air services</b> have the right to fly <b>into</b> or <b>in transit non-stop across</b> a state's territory, and to make <b>stops for non-traffic purposes</b>, <b>without obtaining prior permission</b>.</li>
        <li>This is <b>subject to the right of the state flown over to require landing</b>.</li>
        <li>For safety, a state may require aircraft wishing to fly over <b>regions which are inaccessible or without adequate air navigation facilities</b> to follow <b>prescribed routes</b> or obtain special permission.</li>
        <li>Non-scheduled aircraft carrying passengers, cargo or mail <b>for remuneration or hire</b> may also do so, subject to the regulations the state may impose.</li>
      </ul>
      <p><b>Non-traffic purposes</b> = e.g. refuelling, repairs, weather — <b>not</b> taking on or putting down passengers, cargo or mail.</p>
      <h3>Related articles</h3>
      <table class="ref"><tr><th>Article</th><th>Says</th></tr>
        <tr><td><b>6</b> Scheduled air services</td><td>No scheduled international air service may operate over or into a state <b>without special permission</b> or authorisation.</td></tr>
        <tr><td><b>7</b> Cabotage</td><td>A state may refuse foreign aircraft permission to carry passengers, mail or cargo for hire <b>between two points within its own territory</b>.</td></tr>
        <tr><td><b>9</b> Prohibited areas</td><td>States may restrict or prohibit flight over certain areas for military or public safety reasons.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Non-scheduled (e.g. private GA) flights: <b>no prior permission</b> needed to overfly or make technical stops.</li>
        <li>Scheduled services: <b>need permission</b> (Art 6).</li>
        <li>The state can still <b>require you to land</b>.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Articles 5, 6, 7, 9.</div>`,
    mnemonics: [
      { title: "\"Five: free to fly (and fuel)\"", text: "Article 5: non-scheduled aircraft can enter, overfly and stop for non-traffic purposes without prior permission." },
      { title: "\"Six needs a ticket\"", text: "Article 6: scheduled services need special permission." }
    ]
  },
  {
    id: "chicago-sovereignty", lesson: "l1", title: "Chicago Convention: Sovereignty of Airspace", tag: "Chicago Convention",
    summary: "Article 1 — every state has complete and exclusive sovereignty over the airspace above its territory.",
    body: () => `
      ${sovereigntyDiagram()}
      <h2>Article 1 — Sovereignty</h2>
      <div class="callout key" style="margin-top:6px"><b class="title">The rule</b>The contracting states recognise that <b>every state has complete and exclusive sovereignty over the airspace above its territory</b>.</div>
      <h3>Related articles</h3>
      <table class="ref"><tr><th>Article</th><th>Says</th></tr>
        <tr><td><b>2</b> Territory</td><td>A state's territory = its <b>land areas and the territorial waters adjacent</b> to them.</td></tr>
        <tr><td><b>3</b> Civil and state aircraft</td><td>The Convention applies <b>only to civil aircraft</b>. <b>State aircraft</b> (military, customs, police) are excluded, and may not fly over or land in another state without authorisation.</td></tr>
        <tr><td><b>9</b> Prohibited areas</td><td>A state may establish prohibited areas for military necessity or public safety, applied without distinction of nationality.</td></tr>
        <tr><td><b>17</b> Nationality</td><td>Aircraft have the <b>nationality of the state in which they are registered</b>.</td></tr>
        <tr><td><b>18</b> Dual registration</td><td>An aircraft <b>cannot be validly registered in more than one state</b> (but registration can be changed).</td></tr>
        <tr><td><b>20</b> Display of marks</td><td>Aircraft in international navigation must bear their nationality and registration marks (e.g. <span class="mono">G-ABCD</span>).</td></tr>
      </table>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>"Complete <b>and exclusive</b>" — both words matter.</li>
        <li>Territory includes <b>territorial waters</b>, not just land.</li>
        <li>Military, police and customs aircraft are <b>state aircraft</b> — outside the Convention.</li>
      </ul></div>
      <div class="callout law">Source: Chicago Convention 1944, Articles 1, 2, 3, 9, 17, 18, 20.</div>`,
    mnemonics: [
      { title: "\"Article One: the sky is our own\"", text: "Article 1: complete and exclusive sovereignty over the airspace above a state's territory." },
      { title: "\"Two adds the water, Three drops the soldiers\"", text: "Art 2: territory includes territorial waters. Art 3: Convention covers civil aircraft only — not military/police/customs." }
    ]
  },
  {
    id: "notams", lesson: "l1", title: "Notice to Airmen (NOTAMs)", tag: "Information",
    summary: "Short-notice and temporary information essential to flight — how to read the format and why you must check it.",
    body: () => `
      <p>A <b>NOTAM</b> is a notice distributed by telecommunication containing information about the <b>establishment, condition or change of any aeronautical facility, service, procedure or hazard</b>, the timely knowledge of which is <b>essential</b> to personnel concerned with flight operations.</p>
      <p>Before every flight, the pilot-in-command must become familiar with <b>all available information</b> appropriate to the intended operation — that includes up-to-date <b>weather</b> and NOTAMs (in the UK, via NATS AIS Pre-flight Information Bulletins or flight-planning apps).</p>
      <h2>NOTAM format</h2>
      <table class="ref"><tr><th>Field</th><th>Contains</th></tr>
        <tr><td class="mono">Q)</td><td><b>Qualifier line</b>: FIR / NOTAM code / traffic (I, V, IV) / purpose / scope / lower / upper limits (flight levels) / coordinates + radius (nm)</td></tr>
        <tr><td class="mono">A)</td><td><b>Location</b> — ICAO indicator of the aerodrome or FIR affected (e.g. EGTK)</td></tr>
        <tr><td class="mono">B)</td><td><b>Start</b> of validity — <span class="mono">YYMMDDHHMM</span> in <b>UTC</b></td></tr>
        <tr><td class="mono">C)</td><td><b>End</b> of validity — UTC, <b>EST</b> (estimated) or <b>PERM</b> (permanent)</td></tr>
        <tr><td class="mono">D)</td><td><b>Schedule</b> if active only at certain times (e.g. <span class="mono">0800-1600 DAILY</span>)</td></tr>
        <tr><td class="mono">E)</td><td><b>Plain-language text</b> (abbreviated)</td></tr>
        <tr><td class="mono">F) G)</td><td><b>Lower and upper limits</b> (for navigation warnings/airspace)</td></tr>
      </table>
      <p>The NOTAM code always starts with <b>Q</b>: letters 2–3 give the <b>subject</b> (e.g. FA aerodrome, MR runway), letters 4–5 the <b>condition</b> (e.g. LC closed, AS unserviceable). So <span class="mono">QMRLC</span> = runway closed.</p>
      <div class="sim-slot" data-sim="notam"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>NOTAM times are always <b>UTC</b>.</li>
        <li>NOTAMs are for <b>temporary or short-notice</b> information; permanent changes go into the <b>AIP</b> (significant ones on the <b>28-day AIRAC</b> cycle).</li>
        <li>Field <b>A</b> = where, <b>B</b> = from, <b>C</b> = until, <b>E</b> = what.</li>
        <li>Checking NOTAMs is the <b>PIC's responsibility</b>.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 15 and PANS-AIM; SERA.2010(b) (pre-flight action); UK AIP GEN 3.1.</div>`,
    mnemonics: [
      { title: "\"A Bee Can Eat\"", text: "A = where, B = begins, C = ceases, E = explanation." },
      { title: "\"Q-code: Subject then State\"", text: "Letters 2–3 = what it is (subject), letters 4–5 = what's happened to it (condition). QFALC = aerodrome closed." },
      { title: "\"NOTAM time is Zulu time\"", text: "Every NOTAM time is UTC — convert to local (BST = UTC+1 in summer)." }
    ]
  },
  {
    id: "aircraft-log-books", lesson: "l2", title: "Aircraft Log Books", tag: "Documents",
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
    id: "weight-schedules", lesson: "l2", title: "Weight Schedules", tag: "Documents",
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
    id: "night-navigation-lights", lesson: "l2", title: "Night Navigation Lights & Collision Avoidance", tag: "Lights",
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
        <li><b>If a required light fails at night</b>, the aircraft must <b>land as soon as it can safely do so</b>, unless ATC authorises it to continue. An aircraft with a failed light must not take off at night.</li>
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
    id: "in-flight-right-of-way", lesson: "l2", title: "In-Flight Right-of-Way Rules", tag: "Rules",
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
    id: "certificate-of-airworthiness", lesson: "l2", title: "Certificate of Airworthiness (C of A)", tag: "Documents",
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
    id: "crew-log-books", lesson: "l2", title: "Crew Log Books", tag: "Documents",
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
    id: "poh", lesson: "l2", title: "Pilot's Operating Handbook (POH)", tag: "Documents",
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
    id: "low-flying", lesson: "l2", title: "Low Flying Rules", tag: "Rules",
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
    id: "collision-avoidance", lesson: "l2", title: "Collision Avoidance Responsibility", tag: "Rules",
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
  },
  {
    id: "crs", lesson: "l2", title: "Certificate of Release to Service (CRS)", tag: "Maintenance",
    summary: "The signature that says maintenance was done properly and the aircraft can fly again.",
    body: () => `
      <p>A <b>Certificate of Release to Service (CRS)</b> is issued after maintenance. It certifies that the work was <b>carried out in accordance with the applicable requirements and approved data</b>, and that the aircraft is <b>fit for release to service</b> (in respect of that work).</p>
      <h2>Key points</h2>
      <ul>
        <li>An aircraft must <b>not fly after maintenance until a CRS has been issued</b>.</li>
        <li>Issued by <b>appropriately authorised certifying staff</b> — a licensed aircraft maintenance engineer, or an approved maintenance organisation (e.g. Part-145 / Part-CAO).</li>
        <li>Under <b>Part-ML</b>, a <b>pilot-owner</b> may carry out limited <b>pilot-owner maintenance</b> tasks on their own light aircraft and issue the CRS for those tasks.</li>
        <li>The CRS includes basic details of the work, the date, and the identity and authorisation reference of the person certifying it.</li>
        <li>It's recorded in the aircraft's maintenance records (log book and/or technical log).</li>
      </ul>
      <h2>CRS vs other certificates</h2>
      <table class="ref"><tr><th>Document</th><th>What it shows</th></tr>
        <tr><td><b>CRS</b></td><td>Specific <b>maintenance</b> was completed correctly</td></tr>
        <tr><td><b>ARC</b></td><td>The aircraft passed its <b>airworthiness review</b> (valid 12 months)</td></tr>
        <tr><td><b>C of A</b></td><td>The aircraft conforms to its <b>type design</b> and is airworthy</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>No CRS after maintenance = <b>not airworthy</b> — don't fly.</li>
        <li>Pilot-owners may certify only the limited tasks they're permitted to do.</li>
        <li>Check the CRS is signed when doing your pre-flight document checks.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-ML (ML.A.801), Part-M (M.A.801), Part-145; Air Navigation Order 2016.</div>`,
    mnemonics: [
      { title: "\"No signature, no departure\"", text: "After any maintenance the aircraft needs a signed CRS before it flies." },
      { title: "\"CRS = Can Resume Service\"", text: "A Certificate of Release to Service means the aircraft can resume service after the work." }
    ]
  },
  {
    id: "preflight-docs", lesson: "l2", title: "Pre-Flight Maintenance Documentation Checks", tag: "Maintenance",
    summary: "What the PIC must check in the paperwork before accepting an aircraft for flight.",
    body: () => `
      <p>The pilot-in-command must not start a flight unless satisfied that the aircraft is <b>airworthy</b>, its <b>documents are valid</b> and its required equipment is serviceable. Before flight, check:</p>
      <table class="ref"><tr><th>Check</th><th>Look for</th></tr>
        <tr><td><b>C of A + ARC</b> (or Permit to Fly)</td><td>Valid; ARC not expired</td></tr>
        <tr><td><b>Maintenance due</b></td><td>Hours and calendar time to the next scheduled check (e.g. 50-hour / annual). Will your flight take it over the limit?</td></tr>
        <tr><td><b>CRS</b></td><td>Signed for the last maintenance carried out</td></tr>
        <tr><td><b>Technical / defect log</b></td><td>Any <b>open defects</b>? Deferred defects properly recorded and acceptable for your flight?</td></tr>
        <tr><td><b>Airworthiness Directives</b></td><td>Complied with (normally tracked by the maintenance organisation)</td></tr>
        <tr><td><b>Certificate of Registration</b></td><td>Current</td></tr>
        <tr><td><b>Insurance</b></td><td>Valid and covers your flight and you as pilot</td></tr>
        <tr><td><b>Flight manual / POH</b></td><td>On board, correct for the aircraft</td></tr>
      </table>
      <p>After the paperwork comes the <b>physical pre-flight inspection</b> ("walk-round") using the POH checklist. Anything found that affects airworthiness must be resolved — and recorded — before flight.</p>
      <div class="sim-slot" data-sim="preflight"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>The <b>PIC</b> is responsible for being satisfied the aircraft is airworthy before flight.</li>
        <li>Check <b>hours to next check</b> against your planned flight time.</li>
        <li>Expired ARC, unsigned CRS or an open airworthiness defect = <b>no-go</b>.</li>
      </ul></div>
      <div class="callout law">Source: Part-NCO.GEN.105 (PIC responsibilities) and NCO.GEN.135; Part-ML; SERA.2010.</div>`,
    mnemonics: [
      { title: "\"A-M-C-D: Airworthy, Maintenance due, CRS, Defects\"", text: "ARC valid? Maintenance not overdue (including this flight)? CRS signed? Defects cleared?" },
      { title: "\"Paper before propeller\"", text: "Check the documents before you walk round — and long before you start the engine." }
    ]
  },
  {
    id: "landing-right-of-way", lesson: "l2", title: "Landing Right-of-Way Rules", tag: "Rules",
    summary: "Priority for aircraft landing, the higher-gives-way-to-lower rule, gliders, and emergencies.",
    body: () => `
      ${landingPriorityDiagram()}
      <table class="ref"><tr><th>Situation</th><th>Rule</th></tr>
        <tr><td>Aircraft landing / on final</td><td>An aircraft <b>in flight, or operating on the ground or water</b>, gives way to aircraft <b>landing or in the final stages of an approach</b> to land.</td></tr>
        <tr><td>Two or more aircraft approaching to land</td><td>The aircraft at the <b>higher level gives way</b> to the one at the lower level.</td></tr>
        <tr><td>…but</td><td>The <b>lower</b> aircraft must <b>not take advantage</b> of this to <b>cut in front</b> of another in the final stages of approach, or to <b>overtake</b> it.</td></tr>
        <tr><td>Gliders</td><td><b>Power-driven</b> heavier-than-air aircraft give way to <b>gliders</b> (sailplanes) approaching to land — regardless of height.</td></tr>
        <tr><td>Emergency landing</td><td>An aircraft aware that another is <b>compelled to land</b> gives way to it.</td></tr>
        <tr><td>Taking off</td><td>An aircraft taxiing on the manoeuvring area gives way to aircraft <b>taking off or about to take off</b>.</td></tr>
      </table>
      <p>After landing, vacate the runway as soon as practicable. At UK aerodromes with ATC you'll normally need a landing clearance — "Land after…" clearances may be given in some conditions.</p>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>The <b>lower</b> aircraft has priority — not the faster, not the one on the right.</li>
        <li>A glider has priority over a powered aircraft <b>even if the glider is higher</b>.</li>
      </ul></div>
      <div class="callout law">Source: SERA.3210(d)(3) (landing), SERA.3210(d)(4) (taking off).</div>`,
    mnemonics: [
      { title: "\"Low goes first — but no queue-jumping\"", text: "Higher gives way to lower; the lower must not cut in or overtake." },
      { title: "\"Gliders can't go around\"", text: "Powered aircraft give way to landing gliders — they have no engine for a second attempt." },
      { title: "\"Mayday beats everyone\"", text: "Any aircraft compelled to land gets priority." }
    ]
  },
  {
    id: "technical-log", lesson: "l2", title: "Aircraft Technical Log", tag: "Documents",
    summary: "The day-to-day record linking flights, defects and maintenance — check it before you fly, write in it after.",
    body: () => `
      <p>The <b>technical log</b> is the aircraft's working record between scheduled maintenance. It's required for commercial operations and used by most clubs and training organisations; for private non-complex aircraft, Part-ML calls for an equivalent <b>continuing airworthiness record</b> system.</p>
      <h2>Typical contents</h2>
      <ul>
        <li><b>Aircraft details</b> and maintenance status — hours/date when the <b>next check is due</b>.</li>
        <li><b>Flight records</b>: date, pilot, times, flight hours, landings, fuel and oil uplifted.</li>
        <li><b>Defect reports</b> entered by the pilot, with the <b>rectification</b> and its <b>CRS</b>.</li>
        <li><b>Deferred defects</b> — defects allowed to be carried forward under approved procedures, with limits.</li>
      </ul>
      <h2>The pilot's part</h2>
      <table class="ref"><tr><th>When</th><th>What you do</th></tr>
        <tr><td><b>Before flight</b></td><td>Check for <b>open/deferred defects</b>, last CRS, and hours remaining to the next check.</td></tr>
        <tr><td><b>After flight</b></td><td>Record the flight (times, hours, landings) and <b>enter any defect</b> found, so the next pilot and the engineers know.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Defects found in flight are entered in the technical log by the <b>PIC</b> at the end of the flight.</li>
        <li>Rectification of a defect is certified with a <b>CRS</b> in the tech log.</li>
        <li>It's the first place to check before flying an aircraft that others have flown.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-M (M.A.306 technical log system); Part-ML (ML.A.305 aircraft continuing airworthiness record system).</div>`,
    mnemonics: [
      { title: "\"Read it before, write it after\"", text: "Read the tech log before flight for defects and hours; write your flight and any defects in it afterwards." },
      { title: "\"Defect → Entry → Fix → CRS\"", text: "Every defect's journey through the tech log ends with a signed CRS (or an approved deferral)." }
    ]
  },
  {
    id: "right-of-way-obligations", lesson: "l2", title: "Right-of-Way Obligations (Maintaining Speed and Heading)", tag: "Rules",
    summary: "What the stand-on aircraft must do, what the give-way aircraft must do — and why.",
    body: () => `
      ${standOnDiagram()}
      <h2>The two roles</h2>
      <table class="ref"><tr><th>Aircraft</th><th>Obligation</th></tr>
        <tr><td><b>Has the right of way</b> (stand-on)</td><td><b>Maintains its heading and speed.</b></td></tr>
        <tr><td><b>Must give way</b></td><td>Keeps out of the way. Avoids passing <b>over, under or in front</b> of the other, unless passing <b>well clear</b> and taking into account <b>wake turbulence</b>.</td></tr>
      </table>
      <h2>Why maintain heading and speed?</h2>
      <p>The give-way pilot plans an avoiding manoeuvre based on where the stand-on aircraft is going. If the stand-on aircraft also manoeuvres, both pilots may turn into each other. Being <b>predictable</b> is what makes the system work.</p>
      <h2>But you're never off the hook</h2>
      <p>Nothing in the rules relieves the PIC of the responsibility to take whatever action <b>best avoids a collision</b>. If the give-way aircraft isn't giving way, the stand-on aircraft must act.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Right of way → <b>maintain heading AND speed</b> (both).</li>
        <li>Giving way → don't pass over, under or ahead unless well clear; allow for wake.</li>
        <li>Collision avoidance remains <b>everyone's</b> responsibility.</li>
      </ul></div>
      <div class="callout law">Source: SERA.3210(a)–(b); SERA.3201.</div>`,
    mnemonics: [
      { title: "\"Stand on, stay on\"", text: "The stand-on aircraft stays on its heading and speed." },
      { title: "\"Give way = go behind\"", text: "The give-way aircraft normally passes behind — never over, under or in front unless well clear." },
      { title: "\"Predictable is survivable\"", text: "You hold heading and speed so the other pilot can plan around you." }
    ]
  },
  {
    id: "registration-marks", lesson: "l2", title: "Aircraft Registration and Nationality Marks", tag: "Registration",
    summary: "Registering a UK aircraft, the Certificate of Registration, and where and how big the marks must be.",
    body: () => `
      <ul>
        <li>UK aircraft are registered by the <b>CAA</b>, which issues a <b>Certificate of Registration</b> (C of R). An aircraft can only be registered in <b>one state</b> at a time.</li>
        <li>UK marks: nationality mark <b>G</b>, a hyphen, then four letters — e.g. <span class="mono">G-ABCD</span>.</li>
        <li>The CAA must be told about a change of ownership; the registration may then be cancelled or changed.</li>
        <li>Aircraft must carry a fireproof <b>identification plate</b> with the nationality and registration marks.</li>
      </ul>
      <h2>Marks on aeroplanes</h2>
      <table class="ref"><tr><th>Where</th><th>Minimum height of letters</th></tr>
        <tr><td><b>Underside of the wings</b> (lower surface)</td><td><b>50 cm</b></td></tr>
        <tr><td><b>Fuselage</b> or <b>vertical tail</b> surfaces</td><td><b>30 cm</b></td></tr>
      </table>
      <p>Marks must be painted or fixed permanently, kept clean and visible, and in a colour contrasting with the background.</p>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Under the wings: <b>50 cm</b>. On the fuselage/tail: <b>30 cm</b>. They're swapped in answer options.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 7; ANO 2016 Part 2 and Schedule 3 (registration and marking).</div>`,
    mnemonics: [
      { title: "\"Wings are wide — 50; body's thinner — 30\"", text: "Underwing marks at least 50 cm high; fuselage/tail marks at least 30 cm." }
    ]
  },
  {
    id: "signal-area", lesson: "l3", title: "Aerodrome Signal Area", tag: "Signals",
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
        signalCard("letterC", "Black letter C on yellow", "The pilot reporting point — the ATS reporting office where pilots book in/out. Not customs, not Class C airspace.") +
        signalCard("checker", "Red & yellow chequered flag/board", "Aircraft may move on the manoeuvring area and apron only with ATC permission.") +
        signalCard("runwayBoard", "Black numbers on a yellow board", "Shows the runway in use (direction for take-off), displayed on/near the tower.")
      )}
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li><b>One</b> diagonal = take care. <b>Two</b> diagonals (cross) = do not land.</li>
        <li>Plain dumb-bell = <b>everything</b> on hard surfaces. Striped dumb-bell = <b>only take-off/landing</b> on runways.</li>
        <li>Landing T: land along the shaft <b>towards the cross-arm</b> (like the T is pointing at you on finals — the cross-arm is the far end).</li>
        <li>Glider ops: white double cross (ground) or two red balls (mast).</li>
        <li>"C" = the <b>pilot reporting point</b> (ATS reporting office) — not Customs, not Class C. Chequered board = ATC permission needed to move.</li>
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
    id: "notification-of-arrival", lesson: "l3", title: "Notification of Arrival", tag: "Procedures",
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
    id: "aerodrome-lighting", lesson: "l3", title: "Aerodrome Lighting", tag: "Lighting",
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
    id: "light-signals", lesson: "l3", title: "Aerodrome Light Signals", tag: "Signals",
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
    id: "declared-distances", lesson: "l3", title: "Declared Distances", tag: "Performance",
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
    id: "ground-right-of-way", lesson: "l3", title: "Ground Right-of-Way Rules", tag: "Rules",
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
    id: "airfield-signage", lesson: "l3", title: "Airfield Signage", tag: "Signs",
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
    id: "aerodrome-markings", lesson: "l3", title: "ICAO Aerodrome Markings", tag: "Markings",
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
    id: "altimeter-settings", lesson: "l4", title: "Altimeter Setting Procedures (QNH, QFE, 1013)", tag: "Altimetry",
    summary: "What each pressure setting makes your altimeter read, and when to use it.",
    body: () => `
      ${altimeterDiagram()}
      <table class="ref"><tr><th>Setting</th><th>Altimeter reads</th><th>Used</th></tr>
        <tr><td><b>QFE</b></td><td><b>Height</b> above the aerodrome (reads zero on the runway)</td><td>In the circuit, if preferred</td></tr>
        <tr><td><b>QNH</b></td><td><b>Altitude</b> above mean sea level</td><td>At and below the transition altitude; terrain clearance; in controlled airspace below TA</td></tr>
        <tr><td><b>Regional Pressure Setting (RPS)</b></td><td>Altitude (conservatively low)</td><td>Outside controlled airspace below TA — it's the <b>lowest forecast QNH</b> for an Altimeter Setting Region, issued <b>hourly</b></td></tr>
        <tr><td><b>Standard pressure 1013 hPa</b></td><td><b>Flight level</b> (pressure altitude ÷ 100)</td><td>Above the transition altitude/level; for vertical separation en route</td></tr>
      </table>
      <ul>
        <li>1 hPa ≈ <b>27–30 ft</b>. Setting a higher pressure makes the altimeter read higher.</li>
        <li>Flying from high to low pressure without resetting, the altimeter <b>over-reads</b> — you're lower than indicated: "<b>High to low, look out below</b>".</li>
        <li>Because the RPS is the lowest forecast QNH, using it gives a reading that's equal to or below your true altitude — a safety margin over terrain.</li>
      </ul>
      <div class="sim-slot" data-sim="altimeter"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>QFE → height; QNH → altitude; 1013 → flight level.</li>
        <li>RPS = lowest forecast QNH in the region for the hour.</li>
      </ul></div>
      <div class="callout law">Source: UK AIP ENR 1.7 (altimeter setting procedures).</div>`,
    mnemonics: [
      { title: "\"QFE = Field Elevation zero, QNH = Nautical Height\"", text: "QFE gives height above the field; QNH gives height above the sea (altitude)." },
      { title: "\"High to low, look out below\"", text: "Flying into lower pressure (or colder air) without resetting: you're lower than the altimeter says." }
    ]
  },
  {
    id: "transition", lesson: "l4", title: "Transition Altitude, Level and Layer", tag: "Altimetry",
    summary: "Where you swap between QNH altitudes and 1013 flight levels — climbing and descending.",
    body: () => `
      <table class="ref"><tr><th>Term</th><th>Meaning</th></tr>
        <tr><td><b>Transition altitude (TA)</b></td><td>The altitude <b>at or below</b> which vertical position is given as <b>altitude (QNH)</b>. In the UK normally <b>3,000 ft</b>, higher in and around some major controlled airspace (shown on charts).</td></tr>
        <tr><td><b>Transition level (TL)</b></td><td>The <b>lowest flight level available</b> for use above the TA. It changes with QNH.</td></tr>
        <tr><td><b>Transition layer</b></td><td>The airspace <b>between</b> the TA and the TL. Don't cruise in it.</td></tr>
      </table>
      <h3>When to change setting</h3>
      <ul>
        <li><b>Climbing</b>: set <b>1013</b> when passing the <b>transition altitude</b>.</li>
        <li><b>Descending</b>: set <b>QNH</b> when passing the <b>transition level</b> (unless ATC says otherwise).</li>
        <li>Low QNH = the TL is higher (the layer gets thicker); high QNH = the TL may be lower.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Climb: change at the TA. Descent: change at the TL.</li>
        <li>Below TA → altitude; above TL → flight level; in between → transition layer.</li>
      </ul></div>
      <div class="callout law">Source: UK AIP ENR 1.7.</div>`,
    mnemonics: [
      { title: "\"Altitude Ascending, Level Lowering\"", text: "Change to 1013 at the transition Altitude on the way up; change to QNH at the transition Level on the way down." }
    ]
  },
  {
    id: "cruising-levels", lesson: "l4", title: "Cruising Levels (Semicircular Rule)", tag: "Altimetry",
    summary: "Which flight levels to cruise at, based on magnetic track — for IFR and VFR.",
    body: () => `
      ${cruisingLevelDiagram()}
      <table class="ref"><tr><th>Magnetic track</th><th>IFR</th><th>VFR</th></tr>
        <tr><td><b>000°–179°</b></td><td>Odd thousands: FL30, 50, 70…</td><td>Odd thousands + 500: FL35, 55, 75…</td></tr>
        <tr><td><b>180°–359°</b></td><td>Even thousands: FL40, 60, 80…</td><td>Even thousands + 500: FL45, 65, 85…</td></tr>
      </table>
      <ul>
        <li>Based on <b>magnetic track</b> (not heading).</li>
        <li>VFR cruising levels apply when cruising <b>above 3,000 ft above the ground</b> (or a higher datum set by the authority) — in the UK, in practice, above the transition altitude.</li>
        <li>The UK used a <b>quadrantal rule</b> until 2015; it now uses the SERA <b>semicircular</b> rule.</li>
        <li>In controlled airspace, ATC may assign other levels.</li>
      </ul>
      <div class="sim-slot" data-sim="levels"></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Magnetic <b>track</b>, not heading or true track.</li>
        <li>VFR adds <b>500 ft</b> to the IFR level.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5005(g), SERA.5015(b) and Appendix 3 (table of cruising levels).</div>`,
    mnemonics: [
      { title: "\"East is Odd, West is Even (Weird)\"", text: "000°–179° (easterly): odd levels. 180°–359° (westerly): even levels." },
      { title: "\"VFR = Very Five-hundred Roofs\"", text: "VFR flies 500 ft above the IFR level for its direction." }
    ]
  },
  {
    id: "airspace-classes", lesson: "l4", title: "Airspace Classifications", tag: "Airspace",
    summary: "UK airspace classes A, C, D, E and G — who may fly there, and what ATC provides.",
    body: () => `
      <table class="ref"><tr><th>Class</th><th>Flights allowed</th><th>ATC clearance</th><th>Separation / service</th></tr>
        <tr><td><b>A</b></td><td>IFR only</td><td>Required</td><td>All aircraft separated</td></tr>
        <tr><td><b>C</b></td><td>IFR and VFR</td><td>Required for all</td><td>IFR separated from IFR and VFR; VFR separated from IFR, and given traffic info on other VFR</td></tr>
        <tr><td><b>D</b></td><td>IFR and VFR</td><td>Required for all</td><td>IFR separated from IFR; traffic info to IFR on VFR and to VFR on all traffic</td></tr>
        <tr><td><b>E</b></td><td>IFR and VFR</td><td>Required for IFR only</td><td>IFR separated from IFR; traffic info as far as practicable</td></tr>
        <tr><td><b>G</b></td><td>IFR and VFR</td><td>Not required</td><td>No separation — uncontrolled; FIS on request</td></tr>
      </table>
      <ul>
        <li>The UK does <b>not</b> currently use Class B or Class F.</li>
        <li>Classes A–E are <b>controlled airspace</b>; Class G is <b>uncontrolled</b>.</li>
        <li>Two-way radio is required in C and D (and for IFR in E).</li>
        <li>Most UK airspace from FL195 upward is Class C; airways below that are mostly Class A.</li>
      </ul>
      <div class="sim-slot" data-sim="airspace"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>No VFR in <b>Class A</b>.</li>
        <li>VFR in C and D needs an <b>ATC clearance</b>; VFR in E doesn't.</li>
        <li>In D, ATC do <b>not</b> separate VFR from VFR — you see and avoid.</li>
      </ul></div>
      <div class="callout law">Source: SERA.6001 and Appendix 4; UK AIP ENR 1.4.</div>`,
    mnemonics: [
      { title: "\"A = All IFR, C = Clearance for Clearly everyone, D = Do get a clearance, E = Easy for VFR, G = Go-as-you-please\"", text: "A: IFR only. C & D: clearance for all. E: clearance for IFR only. G: uncontrolled." }
    ]
  },
  {
    id: "controlled-airspace-structures", lesson: "l4", title: "Controlled Airspace Structures (CTR, CTA, TMA, Airways)", tag: "Airspace",
    summary: "The shapes controlled airspace comes in, and how they fit together.",
    body: () => `
      <table class="ref"><tr><th>Structure</th><th>What it is</th></tr>
        <tr><td><b>Control Zone (CTR)</b></td><td>Controlled airspace from the <b>surface</b> up to a specified upper limit, around one or more aerodromes.</td></tr>
        <tr><td><b>Control Area (CTA)</b></td><td>Controlled airspace from a specified <b>base above the surface</b> up to an upper limit.</td></tr>
        <tr><td><b>Terminal Control Area (TMA)</b></td><td>A CTA at the confluence of routes near one or more major aerodromes.</td></tr>
        <tr><td><b>Airway</b></td><td>A CTA in the form of a <b>corridor</b> (normally 10 nm wide in the UK), mostly Class A.</td></tr>
        <tr><td><b>Upper airspace</b></td><td>In the UK, FL195 and above — Class C.</td></tr>
      </table>
      <ul>
        <li>Lower limits shown as an <b>altitude</b> (e.g. 2,500 ft) are on QNH; those shown as a <b>flight level</b> (e.g. FL55) are on 1013.</li>
        <li>You can fly <b>underneath</b> a CTA or airway in Class G without a clearance — but not into a CTR.</li>
        <li>Low-level routes, VRPs (visual reference points) and Special VFR help VFR traffic cross CTRs.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>CTR starts at the <b>surface</b>; CTA starts at a <b>base</b> above the surface.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 11; UK AIP ENR 2.1.</div>`,
    mnemonics: [
      { title: "\"Zone = ground Zero\"", text: "A control Zone goes down to the ground; a control Area floats above it." }
    ]
  },
  {
    id: "atz", lesson: "l4", title: "Aerodrome Traffic Zones (ATZ)", tag: "Airspace",
    summary: "The 2 or 2.5 nm, 2,000 ft zone around aerodromes — and how to enter one.",
    body: () => `
      ${atzDiagram()}
      <h2>Dimensions</h2>
      <ul>
        <li>A circle centred on the <b>midpoint of the longest runway</b>, radius <b>2 nm</b> (longest runway ≤ 1,850 m) or <b>2.5 nm</b> (longest runway &gt; 1,850 m).</li>
        <li>From the <b>surface to 2,000 ft above aerodrome level</b>.</li>
        <li>Active during the aerodrome's notified hours. An ATZ inside a CTR takes the CTR's classification.</li>
      </ul>
      <h2>Rules for flying in an ATZ</h2>
      <table class="ref"><tr><th>Aerodrome service</th><th>You must</th></tr>
        <tr><td><b>ATC</b> (e.g. "Tower")</td><td>Obtain <b>permission</b> from ATC</td></tr>
        <tr><td><b>AFIS</b> ("Information") or <b>AGCS</b> ("Radio")</td><td>Obtain <b>information</b> to allow the flight to be made safely</td></tr>
      </table>
      <p>And in all cases: maintain a <b>listening watch</b> on the frequency, and report position and height on <b>entering</b> and <b>leaving</b> the ATZ (if radio-equipped).</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>2 nm / 2.5 nm radius, 2,000 ft aal, centred on the longest runway.</li>
        <li>ATC → permission. AFIS/AGCS → information.</li>
      </ul></div>
      <div class="callout law">Source: Rules of the Air Regulations 2015, Rule 11; UK AIP ENR 2.2.</div>`,
    mnemonics: [
      { title: "\"Two, two-and-a-half, two thousand\"", text: "ATZ radius 2 or 2.5 nm, up to 2,000 ft above the aerodrome." },
      { title: "\"Tower = Ticket, Info/Radio = Information\"", text: "ATC gives permission; AFIS and AGCS give information." }
    ]
  },
  {
    id: "special-use-airspace", lesson: "l4", title: "Prohibited, Restricted & Danger Areas, MATZ, RMZ & TMZ", tag: "Airspace",
    summary: "Airspace with special rules or hazards — what each type means for a VFR pilot.",
    body: () => `
      <table class="ref"><tr><th>Area</th><th>Chart example</th><th>Meaning</th></tr>
        <tr><td><b>Prohibited (P)</b></td><td class="mono">EG P111</td><td>Flight <b>prohibited</b>.</td></tr>
        <tr><td><b>Restricted (R)</b></td><td class="mono">EG R157</td><td>Flight <b>restricted</b> in accordance with specified conditions.</td></tr>
        <tr><td><b>Danger (D)</b></td><td class="mono">EG D201</td><td>Activities <b>dangerous to flight</b> may exist at specified times (firing, etc.). Not illegal to enter in most cases — but very unwise. Use the <b>DACS/DAAIS</b> services to check activity.</td></tr>
        <tr><td><b>Restricted Area (Temporary) — RA(T)</b></td><td>—</td><td>Temporary restriction (air displays, major events), promulgated by NOTAM / mauve AIC.</td></tr>
        <tr><td><b>MATZ</b> (Military ATZ)</td><td>—</td><td>5 nm radius, surface to 3,000 ft aal, with stubs. Penetration service is <b>not mandatory</b> for civil pilots, but strongly recommended. The ATZ inside it is mandatory.</td></tr>
        <tr><td><b>RMZ</b> (Radio Mandatory Zone)</td><td>—</td><td>Must carry a radio, call and maintain a listening watch.</td></tr>
        <tr><td><b>TMZ</b> (Transponder Mandatory Zone)</td><td>—</td><td>Must carry and operate a suitable transponder.</td></tr>
      </table>
      <p>On UK charts, the figure after the slash is the <b>upper limit</b> in thousands of feet (e.g. <span class="mono">D201/5.5</span> = up to 5,500 ft). A solid boundary means active during the published hours; a pecked (dashed) boundary means activated by NOTAM. Activity times are in the AIP.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>P = prohibited, R = restricted, D = danger.</li>
        <li>MATZ: 5 nm / 3,000 ft aal + stubs; penetration not compulsory for civil aircraft.</li>
      </ul></div>
      <div class="callout law">Source: UK AIP ENR 5.1 (P, R and D areas), ENR 2.2 (MATZ, RMZ, TMZ).</div>`,
    mnemonics: [
      { title: "\"P-R-D: Prison, Rules, Danger\"", text: "Prohibited = never; Restricted = only under conditions; Danger = activity might kill you." }
    ]
  },
  {
    id: "speed-limits", lesson: "l4", title: "Airspace Speed Limits", tag: "Airspace",
    summary: "The 250 kt rule below FL100 — where it applies and where it doesn't.",
    body: () => `
      <table class="ref"><tr><th>Class</th><th>IFR</th><th>VFR</th></tr>
        <tr><td><b>A</b></td><td>No limit</td><td>— (no VFR)</td></tr>
        <tr><td><b>C</b></td><td>No limit</td><td><b>250 kt IAS</b> below FL100</td></tr>
        <tr><td><b>D</b></td><td><b>250 kt IAS</b> below FL100</td><td><b>250 kt IAS</b> below FL100</td></tr>
        <tr><td><b>E</b></td><td><b>250 kt IAS</b> below FL100</td><td><b>250 kt IAS</b> below FL100</td></tr>
        <tr><td><b>G</b></td><td><b>250 kt IAS</b> below FL100</td><td><b>250 kt IAS</b> below FL100</td></tr>
      </table>
      <ul>
        <li>The limit doesn't depend on the exact level — FL70 or 2,000 ft, it's still <b>250 kt</b> if below FL100.</li>
        <li>ATC can approve exceptions (e.g. aircraft that can't safely fly that slowly).</li>
        <li>Separate speed limits: <b>140 kt</b> for Special VFR and for the UK reduced VMC minima.</li>
      </ul>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>A question naming a specific FL below 100 and a class (e.g. "FL70 in Class D") — the answer is still <b>250 kt</b>.</li>
        <li>Don't confuse 250 kt (airspace) with 140 kt (SVFR / reduced minima).</li>
      </ul></div>
      <div class="callout law">Source: SERA.6001 Appendix 4 (Table S6-1).</div>`,
    mnemonics: [
      { title: "\"Below 100, no more than 250\"", text: "Below FL100, 250 kt IAS — except IFR in Class A and C." }
    ]
  },
  {
    id: "air-traffic-services", lesson: "l5", title: "Air Traffic Services & UK Flight Information Services", tag: "ATM",
    summary: "ATC, FIS and alerting service — plus the four UK FIS services outside controlled airspace.",
    body: () => `
      <h2>The three air traffic services</h2>
      <table class="ref"><tr><th>Service</th><th>Purpose</th></tr>
        <tr><td><b>Air traffic control service</b></td><td>Prevent collisions and expedite the flow of traffic — issues <b>clearances</b>.</td></tr>
        <tr><td><b>Flight information service</b></td><td>Advice and information useful for safe and efficient flight.</td></tr>
        <tr><td><b>Alerting service</b></td><td>Notify the right organisations about aircraft needing search and rescue, and assist them.</td></tr>
      </table>
      <h2>UK Flight Information Services (outside controlled airspace)</h2>
      <table class="ref"><tr><th>Service</th><th>What you get</th><th>Who avoids collisions?</th></tr>
        <tr><td><b>Basic Service</b></td><td>Information useful for safe flight (weather, aerodrome info). Traffic information not normally given — may be if the controller sees a definite risk.</td><td>You</td></tr>
        <tr><td><b>Traffic Service</b></td><td>Surveillance-based <b>traffic information</b>. No deconfliction advice.</td><td>You</td></tr>
        <tr><td><b>Deconfliction Service</b></td><td>Traffic information <b>plus deconfliction advice</b> (headings/levels).</td><td>You decide whether to follow the advice</td></tr>
        <tr><td><b>Procedural Service</b></td><td>Non-surveillance (no radar): deconfliction between participating aircraft using reported positions.</td><td>You</td></tr>
      </table>
      <p>In all UK FIS services, the pilot remains responsible for collision avoidance and terrain clearance. Services are agreed by a request and acknowledgement on the radio.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>ATC → clearances. FIS → information. Alerting → SAR.</li>
        <li>Only the Deconfliction Service gives <b>avoiding action advice</b>; it's never an instruction.</li>
      </ul></div>
      <div class="callout law">Source: SERA Section 7; ICAO Annex 11; CAP 774 (UK Flight Information Services).</div>`,
    mnemonics: [
      { title: "\"Basic, Traffic, Deconfliction, Procedural = Bread, Toast, Double-toast, Plate\"", text: "Each surveillance service adds more: info → traffic → traffic + avoiding advice. Procedural works without radar." }
    ]
  },
  {
    id: "aerodrome-services", lesson: "l5", title: "Aerodrome Services: ATC, AFIS and AGCS", tag: "ATM",
    summary: "Who's on the radio at the aerodrome, what they can tell you to do, and their call signs.",
    body: () => `
      <table class="ref"><tr><th>Service</th><th>Call sign</th><th>Can they…</th></tr>
        <tr><td><b>Air Traffic Control</b></td><td>"…<b>Tower</b>", "…<b>Ground</b>", "…<b>Approach</b>"</td><td>Issue <b>instructions and clearances</b> (e.g. "cleared to land")</td></tr>
        <tr><td><b>Aerodrome Flight Information Service (AFIS)</b></td><td>"…<b>Information</b>"</td><td>Give <b>information</b> (runway in use, traffic, weather) — no clearances to aircraft in flight. Pilots decide ("land at your discretion").</td></tr>
        <tr><td><b>Air/Ground Communication Service (AGCS)</b></td><td>"…<b>Radio</b>"</td><td>Give <b>basic information</b> only. The operator may not be qualified — no instructions.</td></tr>
        <tr><td>No service (SafetyCom)</td><td>"…<b>Traffic</b>"</td><td>Pilots broadcast their intentions to each other on 135.480 MHz.</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Tower = ATC; Information = AFIS; Radio = AGCS.</li>
        <li>In an ATZ: ATC gives <b>permission</b>; AFIS/AGCS give <b>information</b>.</li>
      </ul></div>
      <div class="callout law">Source: CAP 413 (Radiotelephony Manual); CAP 797 (AFIS); CAP 452 (AGCS).</div>`,
    mnemonics: [
      { title: "\"Tower Tells, Information Informs, Radio Relays\"", text: "ATC instructs; AFIS informs; AGCS just passes on basic information." }
    ]
  },
  {
    id: "flight-plans", lesson: "l5", title: "Flight Plans", tag: "ATM",
    summary: "When you must file one, how far in advance, delays, and closing it.",
    body: () => `
      <h2>A flight plan must be submitted for</h2>
      <ul>
        <li>Any flight (or part) provided with an <b>air traffic control service</b> (in the UK, VFR zone transits can use an <b>abbreviated flight plan</b> passed by radio).</li>
        <li>Any IFR flight within advisory airspace.</li>
        <li>Any flight <b>crossing international borders</b> (unless the states agree otherwise).</li>
        <li>Any flight at <b>night</b> leaving the vicinity of an aerodrome (SERA).</li>
        <li>Flights where the authority requires one (e.g. to help SAR).</li>
      </ul>
      <h2>Timings</h2>
      <table class="ref"><tr><th>Rule</th><th>Time</th></tr>
        <tr><td>File at least</td><td><b>60 minutes</b> before departure</td></tr>
        <tr><td>Delay — amend or refile if late by</td><td><b>30 minutes</b> (controlled flight) / <b>1 hour</b> (uncontrolled flight) beyond the estimated off-block time</td></tr>
        <tr><td>Divert / land elsewhere — tell ATS within</td><td><b>30 minutes</b> of your ETA at the planned destination</td></tr>
      </table>
      <ul>
        <li>Times in flight plans are <b>UTC</b>. EOBT = estimated off-block time.</li>
        <li>Close the flight plan on arrival (see Notification of Arrival).</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>60 min before departure. Delay: 30 min controlled / 60 min uncontrolled.</li>
        <li>Crossing an international border → flight plan.</li>
      </ul></div>
      <div class="callout law">Source: SERA.4001, SERA.4015, SERA.4020; UK AIP ENR 1.10.</div>`,
    mnemonics: [
      { title: "\"60 to file, 30 or 60 late, 30 to call\"", text: "File 60 min before; amend if 30 min (controlled) or 60 min (uncontrolled) late; report within 30 min of ETA if you land elsewhere." }
    ]
  },
  {
    id: "transponder-codes", lesson: "l5", title: "Transponder (SSR) Codes and Modes", tag: "ATM",
    summary: "The special squawk codes every pilot must know, and what each transponder mode sends.",
    body: () => `
      <table class="ref"><tr><th>Code</th><th>Meaning</th></tr>
        <tr><td class="mono"><b>7700</b></td><td><b>Emergency</b></td></tr>
        <tr><td class="mono"><b>7600</b></td><td><b>Radio failure</b></td></tr>
        <tr><td class="mono"><b>7500</b></td><td><b>Unlawful interference</b> (hijack)</td></tr>
        <tr><td class="mono"><b>7000</b></td><td><b>Conspicuity</b> code — UK default when not assigned a code</td></tr>
        <tr><td class="mono"><b>2000</b></td><td>Entering an FIR from an area where no code was assigned</td></tr>
      </table>
      <table class="ref"><tr><th>Mode</th><th>Transmits</th></tr>
        <tr><td><b>A</b></td><td>The 4-digit <b>identity</b> code</td></tr>
        <tr><td><b>C</b></td><td>Identity + <b>pressure altitude</b> (always referenced to 1013 hPa)</td></tr>
        <tr><td><b>S</b></td><td>Selective — identity, altitude and a unique <b>aircraft address</b> (plus extra data)</td></tr>
      </table>
      <ul>
        <li>When changing code, avoid passing through 7500, 7600 or 7700 by mistake (or switch to standby first, as advised by your instructor).</li>
        <li>"Squawk ident" = press the IDENT button once.</li>
      </ul>
      <div class="sim-slot" data-sim="codes"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>75 = taken alive, 76 = radio fix, 77 = going to heaven.</li>
      </ul></div>
      <div class="callout law">Source: UK AIP ENR 1.6; CAP 413.</div>`,
    mnemonics: [
      { title: "\"75 — man with a knife, 76 — radio's in a fix, 77 — going to heaven\"", text: "7500 hijack, 7600 radio failure, 7700 emergency." },
      { title: "\"Seven-thousand: just be seen\"", text: "7000 = conspicuity in the UK." }
    ]
  },
  {
    id: "customs-immigration", lesson: "l5", title: "Customs, Immigration and Health", tag: "Border",
    summary: "General Aviation Reports, the Common Travel Area, police notification and public health rules.",
    body: () => `
      <h2>General Aviation Report (GAR)</h2>
      <ul>
        <li>International GA flights <b>into or out of the UK</b> (to/from outside the <b>Common Travel Area</b>) must submit information about the flight and everyone on board to <b>Border Force</b>.</li>
        <li>Submit it <b>no earlier than 48 hours and no later than 2 hours</b> before the expected time of departure — for <b>both arrivals and departures</b>.</li>
        <li>It must be submitted <b>online</b> (Submit-a-GAR or an approved app) — not by email. Changes must be resubmitted at least 2 hours before departure.</li>
        <li>The responsible person can be fined for missing or wrong information.</li>
      </ul>
      <h2>Common Travel Area (CTA) and police notification</h2>
      <ul>
        <li>The CTA = the UK, Ireland, the Channel Islands and the Isle of Man.</li>
        <li>Flights between Great Britain/Northern Ireland and other parts of the CTA using an aerodrome <b>not designated for police purposes</b> must notify the police <b>12 hours</b> before departure or arrival.</li>
        <li>International flights may be limited to designated (customs/immigration) aerodromes or need special arrangements.</li>
      </ul>
      <h2>Health</h2>
      <ul>
        <li>Chicago Convention <b>Article 14</b>: states take measures to prevent the spread of disease by air navigation.</li>
        <li>The PIC must report any suspected communicable disease on board, and passengers and crew must comply with public health/quarantine rules (Article 13).</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>GAR window: <b>48 h → 2 h</b> before departure, online.</li>
        <li>Non-designated aerodrome within the CTA: police notice <b>12 h</b> before.</li>
      </ul></div>
      <div class="callout law">Source: UK Home Office/Border Force GA guidance (General Aviation Regulations 2024); Terrorism Act 2000; Chicago Convention Articles 13–14.</div>`,
    mnemonics: [
      { title: "\"48 to 2, then you're through\"", text: "Submit the GAR between 48 and 2 hours before departure." },
      { title: "\"Police need half a day\"", text: "12 hours' notice to the police for non-designated aerodromes within the CTA." }
    ]
  },
  {
    id: "aviation-security", lesson: "l5", title: "Aviation Security", tag: "Border",
    summary: "Keeping aircraft secure, prohibited items, and what to do if something looks wrong.",
    body: () => `
      <ul>
        <li>The <b>PIC</b> is responsible for the security of the aircraft and its occupants during flight.</li>
        <li><b>Secure unattended aircraft</b>: lock it, remove keys, use control locks — and check for interference during the pre-flight inspection.</li>
        <li>Know your passengers and check their baggage on private flights: you are responsible for what is carried.</li>
        <li><b>Weapons, munitions of war and dangerous goods</b> must not be carried without the required permission/compliance (ICAO Technical Instructions; CAA permission for munitions of war).</li>
        <li>Report suspicious activity at an aerodrome to the police (e.g. via Project Pegasus / "Airport Watch" schemes for GA).</li>
        <li>In flight, unlawful interference → squawk <b>7500</b>.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Security of the aircraft in flight is the <b>PIC's</b> responsibility.</li>
        <li>Unlawful interference: <b>7500</b>.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 17; Aviation Security Act 1982; ANO 2016 (munitions of war and dangerous goods).</div>`,
    mnemonics: [
      { title: "\"Lock it, check it, know who's in it\"", text: "Secure the aircraft, inspect for interference, and know your passengers and their bags." }
    ]
  },
  {
    id: "vmc-minima", lesson: "l6", title: "VMC Minima (Visibility and Distance from Cloud)", tag: "VFR",
    summary: "The weather a VFR flight needs in each class of airspace — including the UK's 140 kt alternatives.",
    body: () => `
      <table class="ref"><tr><th>Level band</th><th>Airspace</th><th>Flight visibility</th><th>Distance from cloud</th></tr>
        <tr><td>At/above <b>FL100</b></td><td>A*–E, G</td><td><b>8 km</b></td><td>1,500 m horizontally, 1,000 ft vertically</td></tr>
        <tr><td>Below FL100, above 3,000 ft AMSL (or 1,000 ft above terrain, whichever is higher)</td><td>A*–E, G</td><td><b>5 km</b></td><td>1,500 m horizontally, 1,000 ft vertically</td></tr>
        <tr><td>At/below 3,000 ft AMSL (or 1,000 ft above terrain)</td><td>C, D, E</td><td><b>5 km</b></td><td>1,500 m horizontally, 1,000 ft vertically</td></tr>
        <tr><td>At/below 3,000 ft AMSL (or 1,000 ft above terrain)</td><td>F, G</td><td><b>5 km</b></td><td><b>Clear of cloud, surface in sight</b></td></tr>
      </table>
      <p style="font-size:13px;color:var(--muted)">*VFR isn't permitted in Class A; the minima are listed for completeness.</p>
      <h2>UK alternatives (at/below 3,000 ft AMSL or 1,000 ft above terrain)</h2>
      <table class="ref"><tr><th>Airspace</th><th>Conditions</th><th>Minima</th></tr>
        <tr><td><b>Class D</b></td><td>Day only, <b>140 kt IAS or less</b></td><td><b>5 km</b>, clear of cloud, surface in sight</td></tr>
        <tr><td><b>Class F and G</b></td><td>Day only, <b>140 kt IAS or less</b></td><td><b>1,500 m</b>, clear of cloud, surface in sight</td></tr>
      </table>
      <div class="sim-slot" data-sim="vmc"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>8 km at/above FL100; 5 km below.</li>
        <li>"1,500 m and 1,000 ft" from cloud in controlled airspace and higher up.</li>
        <li>UK Class G, day, ≤140 kt, low level: <b>1,500 m</b>, clear of cloud, surface in sight.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5001 (Table S5-1); UK CAA SERA guidance (Aviation Safety (Amendment) Regulations 2021).</div>`,
    mnemonics: [
      { title: "\"Eight up high, five below\"", text: "8 km flight visibility at/above FL100; 5 km below." },
      { title: "\"1,500 and 1,000 — one-and-a-half by one\"", text: "1,500 m horizontally, 1,000 ft vertically from cloud." },
      { title: "\"Slow and low in G: 1,500 m and see the ground\"", text: "UK Class F/G, day, ≤140 kt, at/below 3,000 ft: 1,500 m, clear of cloud, surface in sight." }
    ]
  },
  {
    id: "special-vfr", lesson: "l6", title: "Special VFR", tag: "VFR",
    summary: "An ATC clearance to fly in a control zone when the weather is below VMC.",
    body: () => `
      <p><b>Special VFR (SVFR)</b> is an ATC clearance allowing a VFR flight to operate <b>within a control zone</b> in meteorological conditions below VMC.</p>
      <h2>Requirements</h2>
      <ul>
        <li>Only in a <b>control zone (CTR)</b>, and only with an <b>ATC clearance</b>.</li>
        <li>Remain <b>clear of cloud</b> and with the <b>surface in sight</b>.</li>
        <li>Flight visibility at least <b>1,500 m</b> (800 m for helicopters).</li>
        <li>Fly at <b>140 kt IAS or less</b>.</li>
        <li>For take-off and landing at an aerodrome in the CTR, ground visibility and cloud ceiling must meet the minimum the authority sets (normally 1,500 m and 600 ft).</li>
        <li>ATC separates SVFR flights from each other and from IFR flights.</li>
      </ul>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>SVFR speed limit is <b>140 kt</b> — not 125 kt, not 250 kt.</li>
        <li>SVFR minimum flight visibility is <b>1,500 m</b> — not 5 km or 8 km (those are VMC values).</li>
        <li>SVFR is only for <b>control zones</b>.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5010; UK AIP ENR 1.2.</div>`,
    mnemonics: [
      { title: "\"Special = 15-14: 1,500 m, 140 kt\"", text: "SVFR: flight visibility 1,500 m, max 140 kt IAS, clear of cloud, surface in sight, in a CTR with clearance." }
    ]
  },
  {
    id: "vfr-rules", lesson: "l6", title: "VFR Operating Rules (incl. Night VFR)", tag: "VFR",
    summary: "Where VFR may and may not fly, clearances, radio, and the extra rules for VFR at night.",
    body: () => `
      <ul>
        <li>VFR flights must not operate <b>above FL195</b> or at transonic/supersonic speeds (unless authorised), and are <b>not permitted in Class A</b>.</li>
        <li>VFR in Class <b>C and D</b>: needs an ATC <b>clearance</b> and two-way radio.</li>
        <li>VFR must stay in <b>VMC</b>; if VMC can't be maintained, consider SVFR (in a CTR), turning back or diverting.</li>
        <li>Minimum heights: see the Low Flying Rules topic.</li>
      </ul>
      <h2>VFR at night (SERA)</h2>
      <ul>
        <li>If leaving the vicinity of the aerodrome, a <b>flight plan</b> is required (the UK applies some alternative arrangements — check the current AIP ENR 1.2).</li>
        <li>Establish two-way radio communication with ATS when available.</li>
        <li>Minimum <b>1,000 ft above the highest obstacle within 8 km</b> (except take-off/landing).</li>
        <li>A UK PPL holder needs a <b>night rating</b> (or IR) to fly at night.</li>
        <li>Aircraft lights must be displayed; a failed required light means landing as soon as safely possible.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>No VFR in Class A or above FL195.</li>
        <li>VFR in C and D needs a clearance.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5005; UK AIP ENR 1.2.</div>`,
    mnemonics: [
      { title: "\"VFR stops at 195\"", text: "No VFR above FL195." }
    ]
  },
  {
    id: "ifr-rules", lesson: "l6", title: "Instrument Flight Rules", tag: "IFR",
    summary: "Minimum IFR levels, cruising levels, changing between IFR and VFR, and who may fly IFR.",
    body: () => `
      <ul>
        <li><b>Minimum level</b> (except take-off/landing or when authorised): at least <b>1,000 ft above the highest obstacle within 8 km</b> of the estimated position — <b>2,000 ft</b> over high terrain or mountainous areas.</li>
        <li>Cruising levels: semicircular rule (odd FLs for 000°–179°, even for 180°–359°), unless ATC assigns otherwise.</li>
        <li>IFR flights in controlled airspace need a <b>flight plan</b> and <b>clearance</b>.</li>
        <li><b>Changing IFR → VFR</b>: only when the flight is in VMC and expected to remain so. Tell ATS "<b>cancelling my IFR flight</b>". ATC don't suggest it.</li>
        <li>To fly under IFR you need an <b>instrument rating</b> — in the UK, the national <b>IR(R)</b> (Instrument Rating (Restricted), formerly the IMC rating) allows IFR in UK airspace outside Class A.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>IFR minimum: 1,000 ft within 8 km (2,000 ft in mountains).</li>
        <li>IR(R) = UK only, not Class A.</li>
      </ul></div>
      <div class="callout law">Source: SERA.5015, SERA.5025; UK ANO 2016 (IR(R)).</div>`,
    mnemonics: [
      { title: "\"1-8, 2 in the mountains\"", text: "IFR minimum: 1,000 ft above obstacles within 8 km — 2,000 ft over high terrain." }
    ]
  },
  {
    id: "ppl-privileges", lesson: "l7", title: "PPL(A) Privileges and Conditions", tag: "Licensing",
    summary: "What a PPL lets you do, cost sharing, minimum ages, and what you must carry.",
    body: () => `
      <ul>
        <li><b>Privileges</b>: act <b>without remuneration</b> as PIC or co-pilot of aeroplanes in <b>non-commercial operations</b> (within your class/type ratings).</li>
        <li><b>Cost sharing</b> is allowed: the <b>direct costs</b> of the flight shared by <b>all occupants, including the pilot</b>, with a maximum of <b>6 people</b> on board.</li>
        <li>Minimum age: <b>16</b> for first solo; <b>17</b> to hold a PPL(A).</li>
        <li>A Part-FCL PPL is issued for life (<b>no expiry date</b>); you keep using it through valid <b>ratings</b> and a valid <b>medical</b>.</li>
        <li>A PPL issued to ICAO Annex 1 standards is recognised by other ICAO states (when flying an aircraft registered in the issuing state).</li>
        <li>Extra privileges need extra ratings/certificates, e.g. instructing (FI), towing, aerobatics, night, IR(R).</li>
      </ul>
      <h2>Documents to carry when flying</h2>
      <p>Your valid <b>licence</b>, valid <b>medical certificate</b>, and a <b>personal identification document with a photo</b>.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>No remuneration — but equal cost sharing with up to 6 on board is fine.</li>
        <li>17 for the licence, 16 for first solo.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-FCL FCL.205.A, FCL.100, FCL.045; Air Operations Regulation (cost-sharing flights).</div>`,
    mnemonics: [
      { title: "\"Share it, don't earn it — six max\"", text: "Cost sharing among up to 6 occupants including the pilot; no profit." },
      { title: "\"Sweet sixteen solos, seventeen's licensed\"", text: "First solo at 16, PPL at 17." }
    ]
  },
  {
    id: "medical-certificates", lesson: "l7", title: "Medical Certificates", tag: "Licensing",
    summary: "Class 2 and LAPL medical validity by age, and when you must stop flying and seek advice.",
    body: () => `
      <h2>Class 2 medical validity</h2>
      <table class="ref"><tr><th>Age when examined</th><th>Valid for</th><th>But ends at</th></tr>
        <tr><td>Under 40</td><td><b>60 months</b></td><td>Your <b>42nd</b> birthday if issued before 40</td></tr>
        <tr><td>40 to 49</td><td><b>24 months</b></td><td>Your <b>51st</b> birthday if issued before 50</td></tr>
        <tr><td>50 and over</td><td><b>12 months</b></td><td>—</td></tr>
      </table>
      <h2>LAPL medical validity</h2>
      <p><b>60 months</b> until age 40 (ending at the 42nd birthday if issued before 40), then <b>24 months</b>.</p>
      <h2>Decrease in medical fitness</h2>
      <p>Don't fly if you know of any decrease in your medical fitness that might make you unable to fly safely, or if you're taking medication or treatment likely to affect safe flying. Seek aeromedical advice <b>without undue delay</b> after:</p>
      <ul>
        <li>a surgical operation or invasive procedure</li>
        <li>starting regular use of any medication</li>
        <li>significant injury or illness, or admission to hospital</li>
        <li><b>pregnancy</b></li>
        <li>first needing corrective lenses</li>
      </ul>
      <div class="sim-slot" data-sim="dates"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Class 2 at age 43 → <b>24 months</b>.</li>
        <li>60 → 24 → 12 months as you pass 40 and 50.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-MED MED.A.020, MED.A.045.</div>`,
    mnemonics: [
      { title: "\"60-24-12 at 40-50\"", text: "Class 2: 60 months under 40, 24 months 40–49, 12 months 50+." }
    ]
  },
  {
    id: "class-ratings", lesson: "l7", title: "Class Ratings (SEP) — Validity and Revalidation", tag: "Licensing",
    summary: "How long an SEP rating lasts, how its expiry date is worked out, and the two ways to revalidate.",
    body: () => `
      <ul>
        <li>An <b>SEP (single-engine piston)</b> class rating is valid for <b>2 years</b>, counted from the <b>end of the calendar month</b> in which you passed the skill test.</li>
        <li>Example: skill test on <b>10 March 2025</b> → rating expires at the end of <b>31 March 2027</b>.</li>
      </ul>
      <h2>Revalidation (before it expires)</h2>
      <table class="ref"><tr><th>Option</th><th>Requirements</th></tr>
        <tr><td><b>By proficiency check</b></td><td>Pass a proficiency check with an examiner within the <b>3 months</b> before the expiry date.</td></tr>
        <tr><td><b>By experience</b></td><td>Within the <b>12 months</b> before expiry: <b>12 hours</b> of flight time in the class, including <b>6 hours as PIC</b>, <b>12 take-offs and 12 landings</b>, and a <b>1-hour refresher training flight</b> with an instructor.</td></tr>
      </table>
      <h2>Renewal (after it expires)</h2>
      <p>If the rating lapses, you can't fly as PIC on that class until it's renewed — normally refresher training as required plus a <b>proficiency check</b>.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>SEP: 24 months from the end of the test month.</li>
        <li>Experience route: 12 h / 6 h PIC / 12 T/O & landings / 1 h with an instructor, in the last 12 months.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-FCL FCL.740, FCL.740.A; CAA SEP rating guidance.</div>`,
    mnemonics: [
      { title: "\"12-6-12-1\"", text: "Revalidation by experience: 12 hours, 6 as PIC, 12 take-offs and landings, 1 hour with an instructor." },
      { title: "\"Ratings run to the month's end\"", text: "Validity counts from the end of the calendar month of the test." }
    ]
  },
  {
    id: "recency", lesson: "l7", title: "Recent Experience for Carrying Passengers", tag: "Licensing",
    summary: "The 3-in-90-days rule, and the extra night requirement.",
    body: () => `
      <ul>
        <li>To carry <b>passengers</b> as PIC or co-pilot, you must have made at least <b>3 take-offs, approaches and landings</b> as the <b>sole manipulator of the controls</b> in an aircraft of the <b>same type or class</b> in the preceding <b>90 days</b>.</li>
        <li>To carry passengers <b>at night</b>: at least <b>one</b> of those 3 must have been <b>at night</b> (unless you hold an IR).</li>
        <li>No passengers? These recency rules don't stop you flying solo (but your rating must still be valid).</li>
      </ul>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>90 <b>days</b>, not 3 months or 60 days.</li>
        <li>Take-offs <b>and</b> landings — touch-and-goes count for both.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-FCL FCL.060(b).</div>`,
    mnemonics: [
      { title: "\"3 in 90 — 1 in the dark\"", text: "3 take-offs and landings in 90 days; one at night to carry passengers at night." }
    ]
  },
  {
    id: "other-ratings", lesson: "l7", title: "Night Rating and Other Ratings", tag: "Licensing",
    summary: "What the night rating needs, and the UK IR(R).",
    body: () => `
      <h2>Night rating (aeroplanes)</h2>
      <ul>
        <li>Theory instruction, plus at least <b>5 hours</b> of flight time at night, including <b>3 hours dual</b> (with at least <b>1 hour of cross-country navigation</b>, including a dual cross-country of at least 50 km), and <b>5 solo take-offs and 5 solo full-stop landings</b>.</li>
        <li>Required for a PPL holder to fly VFR at night (without an IR).</li>
      </ul>
      <h2>IR(R) — Instrument Rating (Restricted)</h2>
      <ul>
        <li>A UK national rating (formerly the IMC rating) allowing flight in IMC and under IFR in <b>UK airspace</b>, but <b>not in Class A</b>.</li>
        <li>Has to be revalidated by test periodically.</li>
      </ul>
      <h2>Others</h2>
      <p>Aerobatic, towing (sailplane/banner), mountain and flight instructor ratings/certificates add specific privileges.</p>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Night rating: 5 h night incl. 3 h dual (1 h nav), 5 solo take-offs and full-stop landings.</li>
      </ul></div>
      <div class="callout law">Source: UK Part-FCL FCL.810 (night rating); UK ANO 2016 (IR(R)).</div>`,
    mnemonics: [
      { title: "\"Night: 5-3-1-5\"", text: "5 hours at night, 3 dual, 1 navigation, 5 solo full-stop landings." }
    ]
  },
  {
    id: "pic-responsibilities", lesson: "l8", title: "Pilot-in-Command Authority and Responsibilities", tag: "Operations",
    summary: "What the PIC is responsible for — before, during and after flight.",
    body: () => `
      <ul>
        <li>The PIC is responsible for the <b>safety</b> of the aircraft, all crew and passengers and cargo on board, and for the operation of the aircraft — and has <b>final authority</b> over its disposition while in command.</li>
        <li>All persons on board must obey the PIC's lawful commands for safety.</li>
        <li>Before flight the PIC must become familiar with <b>all available information</b> (weather, NOTAMs, fuel, alternatives, performance) and be satisfied the aircraft is airworthy and its documents valid.</li>
        <li>The PIC may <b>refuse to carry</b> (or disembark) anyone or anything that may endanger the aircraft.</li>
        <li>In an emergency the PIC may take any action needed for safety, departing from rules where necessary — and must report it afterwards.</li>
        <li>The PIC must not fly if unfit (illness, fatigue, alcohol, drugs).</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Weather, NOTAMs, fuel, airworthiness — all PIC responsibilities.</li>
      </ul></div>
      <div class="callout law">Source: SERA.2010; Part-NCO.GEN.105.</div>`,
    mnemonics: [
      { title: "\"The buck stops in the left seat\"", text: "Every pre-flight and in-flight responsibility comes back to the PIC." }
    ]
  },
  {
    id: "fuel-planning", lesson: "l8", title: "Fuel Planning", tag: "Operations",
    summary: "Minimum fuel reserves for VFR flights in aeroplanes, day and night.",
    body: () => `
      <table class="ref"><tr><th>VFR flight in an aeroplane</th><th>Fuel required</th></tr>
        <tr><td><b>By day</b></td><td>Enough to fly to the aerodrome of intended landing <b>and then at least 30 minutes</b> at normal cruising altitude</td></tr>
        <tr><td><b>At night</b></td><td>Enough to fly to the aerodrome of intended landing <b>and then at least 45 minutes</b> at normal cruising altitude</td></tr>
      </table>
      <p>Also plan for: forecast winds and weather, expected ATC routings and delays, taxi fuel, contingencies and diversions — and check the fuel on board visually before flight.</p>
      <div class="sim-slot" data-sim="fuel"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Day VFR reserve: <b>30 min</b>. Night VFR reserve: <b>45 min</b>.</li>
      </ul></div>
      <div class="callout law">Source: Part-NCO.OP.125 (fuel and oil supply — aeroplanes).</div>`,
    mnemonics: [
      { title: "\"Day 30, night 45 — keep the engine alive\"", text: "VFR reserves: 30 minutes by day, 45 minutes at night." }
    ]
  },
  {
    id: "fitness-alcohol", lesson: "l8", title: "Fitness to Fly: Alcohol, Drugs and Fatigue", tag: "Operations",
    summary: "The legal alcohol limit for pilots in the UK, and other reasons not to fly.",
    body: () => `
      <ul>
        <li>UK legal limits for pilots (Railways and Transport Safety Act 2003): <b>20 mg of alcohol per 100 ml of blood</b> (9 µg per 100 ml of breath; 27 mg per 100 ml of urine) — about a quarter of the UK drink-drive limit.</li>
        <li>A pilot must not fly while <b>impaired</b> by alcohol or drugs, whatever the level.</li>
        <li>No-one may <b>enter an aircraft when drunk</b>, or be drunk on board.</li>
        <li>Don't fly with medication that may affect performance; seek aeromedical advice (see Medical Certificates).</li>
        <li>Avoid flying when fatigued, unwell, or soon after blood donation or scuba diving.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Pilot alcohol limit: <b>20 mg / 100 ml blood</b>.</li>
      </ul></div>
      <div class="callout law">Source: Railways and Transport Safety Act 2003 (Part 5); ANO 2016 (drunkenness in aircraft); Part-MED MED.A.020.</div>`,
    mnemonics: [
      { title: "\"Twenty is plenty — too much\"", text: "20 mg per 100 ml of blood is the pilot limit — a quarter of the drink-drive limit." }
    ]
  },
  {
    id: "passenger-safety", lesson: "l8", title: "Passenger Briefing and Safety", tag: "Operations",
    summary: "What passengers must be told, and when they must be strapped in.",
    body: () => `
      <ul>
        <li>Before flight, brief passengers on: <b>seat belts/harnesses</b>, <b>emergency exits</b> and how to open doors, <b>emergency equipment</b> (life jackets, fire extinguisher, ELT/PLB), the brace position, and smoking/PED rules.</li>
        <li>Each person on board must occupy a seat with the <b>seat belt fastened</b> during <b>taxi, take-off and landing</b>, and whenever the PIC considers it necessary (e.g. turbulence).</li>
        <li><b>Life jackets</b> are required for everyone on board when flying a single-engine landplane over water <b>beyond gliding distance from land</b>.</li>
        <li>The PIC may refuse to carry passengers who are drunk or behaving dangerously.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Belts: taxi, take-off, landing and turbulence.</li>
        <li>Life jackets: single-engine, beyond gliding distance from land.</li>
      </ul></div>
      <div class="callout law">Source: Part-NCO (passenger briefing; seats, safety belts and restraint systems; flight over water equipment).</div>`,
    mnemonics: [
      { title: "\"SEE-PB: Seat belts, Exits, Equipment, PEDs, Brace\"", text: "The core of every passenger briefing." }
    ]
  },
  {
    id: "endangering-safety", lesson: "l8", title: "Endangering Safety and Dropping Articles", tag: "Operations",
    summary: "The ANO offences of endangering aircraft, people and property — and what may be dropped.",
    body: () => `
      <ul>
        <li><b>Endangering safety of an aircraft</b>: a person must not <b>recklessly or negligently</b> act in a way likely to endanger an aircraft or anyone in it.</li>
        <li><b>Endangering persons or property</b>: a person must not recklessly or negligently cause or permit an aircraft to endanger any person or property.</li>
        <li><b>Dropping articles</b>: nothing may be dropped from an aircraft so as to endanger persons or property. Permitted examples include ballast (fine sand or water), fuel jettisoned in an emergency, tow ropes/banners at an aerodrome, and articles dropped to save life.</li>
        <li>Aerial work like <b>towing</b>, <b>parachuting</b>, <b>flying displays</b> and <b>aerobatics</b> need the appropriate permissions, ratings and conditions.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>The offence wording: "<b>recklessly or negligently</b>".</li>
        <li>Ballast may be dropped only as <b>fine sand or water</b>.</li>
      </ul></div>
      <div class="callout law">Source: Air Navigation Order 2016 (endangering safety, dropping articles and animals); SERA.3115.</div>`,
    mnemonics: [
      { title: "\"Sand and water, nothing harder\"", text: "Permitted ballast drops: fine sand or water only." }
    ]
  },
  {
    id: "oxygen-equipment", lesson: "l8", title: "Oxygen and Survival Equipment", tag: "Operations",
    summary: "When pilots must use oxygen, and emergency equipment requirements.",
    body: () => `
      <ul>
        <li><b>Supplemental oxygen</b> must be used by the pilot whenever the cabin pressure altitude exceeds <b>10,000 ft for more than 30 minutes</b>, and <b>always above 13,000 ft</b>.</li>
        <li>Aircraft must carry an <b>ELT</b>; small aeroplanes (up to 6 seats) may instead carry a <b>PLB</b> carried by a crew member or passenger.</li>
        <li><b>Life jackets</b>: single-engine landplanes over water beyond gliding distance from land.</li>
        <li>Additional survival and signalling equipment is needed over areas where search and rescue would be especially difficult.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Oxygen: <b>10,000 ft for more than 30 min</b>, or any time above <b>13,000 ft</b>.</li>
      </ul></div>
      <div class="callout law">Source: Part-NCO.OP.190 (use of supplemental oxygen); Part-NCO.IDE.A (ELT; flight over water).</div>`,
    mnemonics: [
      { title: "\"10 for 30, 13 for keeps\"", text: "Oxygen above 10,000 ft for more than 30 minutes; always above 13,000 ft." }
    ]
  },
  {
    id: "marshalling-signals", lesson: "l8", title: "Marshalling Signals", tag: "Signals",
    summary: "Hand signals from the pilot to the marshaller, and from the marshaller to the pilot.",
    body: () => `
      <h2>Pilot → marshaller (from the cockpit)</h2>
      <table class="ref"><tr><th>Meaning</th><th>Signal</th></tr>
        <tr><td><b>Brakes engaged</b></td><td>Raise arm and hand, with <b>fingers extended</b>, horizontally in front of face, then <b>clench fist</b>.</td></tr>
        <tr><td><b>Brakes released</b></td><td>Raise arm, with <b>fist clenched</b>, horizontally in front of face, then <b>extend fingers</b>.</td></tr>
        <tr><td><b>Insert chocks</b></td><td>Arms extended, palms outwards, move hands <b>inwards to cross</b> in front of face.</td></tr>
        <tr><td><b>Remove chocks</b></td><td>Hands crossed in front of face, palms outwards, move arms <b>outwards</b>.</td></tr>
        <tr><td><b>Ready to start engine(s)</b></td><td>Raise the number of fingers on one hand showing the number of the engine to be started.</td></tr>
      </table>
      <h2>Marshaller → pilot (selected)</h2>
      <table class="ref"><tr><th>Meaning</th><th>Signal</th></tr>
        <tr><td><b>Normal stop</b></td><td>Arms fully extended at 90° to the sides, slowly moved above the head until the wands cross.</td></tr>
        <tr><td><b>Emergency stop</b></td><td>Arms abruptly extended to the top of the head, wands crossed.</td></tr>
        <tr><td><b>Cut engines</b></td><td>Wand drawn across the throat in a slicing motion.</td></tr>
        <tr><td><b>Slow down</b></td><td>Extended arms moved downwards in a "patting" gesture, waist to knees.</td></tr>
        <tr><td><b>Chocks inserted</b></td><td>Arms fully extended above head, wands moved <b>inwards</b> in a jabbing motion until they touch.</td></tr>
        <tr><td><b>Chocks removed</b></td><td>Arms fully extended above head, wands moved <b>outwards</b> in a jabbing motion.</td></tr>
      </table>
      <div class="sim-slot" data-sim="marshalling"></div>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>Paired opposites: open → fist = brakes <b>on</b>; fist → open = brakes <b>off</b>.</li>
        <li>Hands moving in to cross = chocks <b>in</b>; crossed hands moving out = chocks <b>out</b>.</li>
      </ul></div>
      <div class="callout law">Source: SERA Appendix 1, Section 5 (marshalling signals); ICAO Annex 2 Appendix 1.</div>`,
    mnemonics: [
      { title: "\"Grab the brakes, let go to roll\"", text: "Closing your hand into a fist = brakes engaged; opening your fist = brakes released." },
      { title: "\"Chocks in, hands in\"", text: "Insert chocks: hands move in to cross. Remove chocks: crossed hands move out." }
    ]
  },
  {
    id: "distress-urgency", lesson: "l9", title: "Distress and Urgency Procedures", tag: "Emergencies",
    summary: "MAYDAY and PAN PAN calls, what to say, and where to say it.",
    body: () => `
      <table class="ref"><tr><th>Condition</th><th>Definition</th><th>Call</th></tr>
        <tr><td><b>Distress</b></td><td>Threatened by <b>grave and/or imminent danger</b> and requiring <b>immediate assistance</b></td><td><b>MAYDAY MAYDAY MAYDAY</b></td></tr>
        <tr><td><b>Urgency</b></td><td>A condition concerning the safety of an aircraft or person on board, but <b>not requiring immediate assistance</b></td><td><b>PAN PAN, PAN PAN, PAN PAN</b></td></tr>
      </table>
      <h2>Making the call</h2>
      <ul>
        <li>Use the frequency you're on first; if no reply, <b>121.5 MHz</b>. Squawk <b>7700</b>.</li>
        <li>Message content: station addressed, <b>call sign</b>, <b>aircraft type</b>, <b>nature of the emergency</b>, <b>intentions</b>, <b>position, level and heading</b>, pilot qualification, persons on board, and anything else useful.</li>
        <li>In the UK, the <b>Distress and Diversion</b> cell answers on 121.5 as "London Centre" (or "Scottish Centre"); you can make a <b>practice PAN</b> (training fix) when they're not busy.</li>
        <li>Visual distress signals include a <b>red flare</b> and SOS (···–––···) by light or sound.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>MAYDAY = distress (immediate assistance). PAN PAN = urgency.</li>
        <li>121.5 MHz and squawk 7700.</li>
      </ul></div>
      <div class="callout law">Source: SERA Appendix 1; CAP 413 Chapter 8.</div>`,
    mnemonics: [
      { title: "\"MAYDAY = may die; PAN = possible assistance needed\"", text: "Distress needs immediate help; urgency doesn't." },
      { title: "\"Mayday: Call, Type, Nature, Intentions, Position, POB\"", text: "Who you are, what you are, what's wrong, what you'll do, where you are, how many on board." }
    ]
  },
  {
    id: "emergency-phases", lesson: "l9", title: "Emergency Phases (Alerting Service)", tag: "Emergencies",
    summary: "Uncertainty, Alert and Distress phases — and what triggers each.",
    body: () => `
      <table class="ref"><tr><th>Phase</th><th>Code word</th><th>Typical triggers</th></tr>
        <tr><td><b>Uncertainty</b></td><td>INCERFA</td><td>No communication within <b>30 minutes</b> of when it should have been received, or the aircraft fails to arrive within <b>30 minutes of its ETA</b>.</td></tr>
        <tr><td><b>Alert</b></td><td>ALERFA</td><td>Attempts to contact it during the uncertainty phase have failed; or cleared to land and fails to land within <b>5 minutes</b> of the estimated landing time without contact; or its operating efficiency is impaired (but a forced landing isn't likely); or it's known/believed to be under unlawful interference.</td></tr>
        <tr><td><b>Distress</b></td><td>DETRESFA</td><td><b>Reasonable certainty</b> that the aircraft and occupants are threatened by <b>grave and imminent danger</b> or need immediate assistance; or fuel is considered exhausted; or a forced landing is likely or has happened.</td></tr>
      </table>
      <div class="callout trap"><b class="title">Exam traps</b><ul>
        <li>"Action phase" and "Urgency phase" are <b>not</b> alerting phases — the three are Uncertainty, Alert and Distress.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 11 Chapter 5; SERA Section 10.</div>`,
    mnemonics: [
      { title: "\"I-A-D: I'm Anxious, Disaster\"", text: "INCERFA → ALERFA → DETRESFA: uncertainty, alert, distress." }
    ]
  },
  {
    id: "interception", lesson: "l9", title: "Interception of Civil Aircraft", tag: "Emergencies",
    summary: "What an intercepting aircraft's signals mean and how to respond.",
    body: () => `
      <h2>If intercepted</h2>
      <ul>
        <li>Follow the intercepting aircraft's instructions and visual signals.</li>
        <li>Notify ATS if possible, and try to contact the interceptor on <b>121.5 MHz</b>.</li>
        <li>Select transponder <b>7700</b> (unless instructed otherwise).</li>
      </ul>
      <table class="ref"><tr><th>Interceptor does</th><th>Meaning</th><th>You respond</th></tr>
        <tr><td>Rocks wings and flashes lights from slightly above, ahead and normally to the <b>left</b>, then makes a slow level turn</td><td><b>You have been intercepted. Follow me.</b></td><td>Rock wings, flash lights, and follow</td></tr>
        <tr><td>Abrupt <b>break-away</b>: climbing turn of 90° or more without crossing your flight path</td><td><b>You may proceed.</b></td><td>Rock wings</td></tr>
        <tr><td>Lowers landing gear, shows steady landing lights, overflies the runway</td><td><b>Land at this aerodrome.</b></td><td>Lower gear (if possible), follow, and land</td></tr>
      </table>
      <div class="sim-slot" data-sim="signals"></div>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>121.5 MHz and squawk 7700.</li>
        <li>Rocking wings = "follow me"; break-away climbing turn = "you may proceed".</li>
      </ul></div>
      <div class="callout law">Source: SERA.11015 and Appendix 1 (interception signals).</div>`,
    mnemonics: [
      { title: "\"Rock = Follow, Break = Go, Gear = Land\"", text: "The three interception signals in order." }
    ]
  },
  {
    id: "warning-signals", lesson: "l9", title: "Warning Signals (Restricted and Danger Areas)", tag: "Emergencies",
    summary: "The ground signal that tells you you're about to infringe restricted airspace.",
    body: () => `
      <ul>
        <li>A <b>series of projectiles</b> fired from the ground at intervals of <b>10 seconds</b>, each bursting to show <b>red and green lights or stars</b>, means: you are flying in, or about to enter, a <b>restricted, prohibited or danger area</b> — take remedial action.</li>
        <li>Remedial action: turn away, check your position, contact ATS.</li>
        <li>Avoid infringements with good planning: check NOTAMs, use the <b>DACS/DAAIS</b> services for danger areas, and use a moving-map with airspace alerts.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Red and green stars every <b>10 seconds</b> = unauthorised flight in/near restricted airspace.</li>
      </ul></div>
      <div class="callout law">Source: SERA Appendix 1, 1.2 (signals for use in the event of interception / warning signals).</div>`,
    mnemonics: [
      { title: "\"Christmas lights every ten — turn round again\"", text: "Red and green stars at 10-second intervals: you're infringing — turn away." }
    ]
  },
  {
    id: "sar-signals", lesson: "l9", title: "Search and Rescue Signals", tag: "SAR",
    summary: "Ground-to-air signals used by survivors, and supply-dropping colour codes.",
    body: () => `
      <h2>Ground-to-air signals (used by survivors)</h2>
      <table class="ref"><tr><th>Symbol</th><th>Meaning</th></tr>
        <tr><td class="mono"><b>V</b></td><td>Require <b>assistance</b></td></tr>
        <tr><td class="mono"><b>X</b></td><td>Require <b>medical</b> assistance</td></tr>
        <tr><td class="mono"><b>N</b></td><td><b>No</b> or negative</td></tr>
        <tr><td class="mono"><b>Y</b></td><td><b>Yes</b> or affirmative</td></tr>
        <tr><td class="mono"><b>↑</b></td><td><b>Proceeding</b> in this direction</td></tr>
      </table>
      <p>Symbols should be at least <b>2.5 m (8 ft)</b> long and contrast with the background. An aircraft acknowledges by <b>rocking its wings</b> (day) or flashing its landing/navigation lights twice (night).</p>
      <h2>Dropped supplies — colour codes</h2>
      <table class="ref"><tr><th>Colour</th><th>Contents</th></tr>
        <tr><td><span class="swatch" style="background:#e53935"></span>Red</td><td>Medical supplies and first aid</td></tr>
        <tr><td><span class="swatch" style="background:#1e88e5"></span>Blue</td><td>Food and water</td></tr>
        <tr><td><span class="swatch" style="background:#fdd835"></span>Yellow</td><td>Blankets and protective clothing</td></tr>
        <tr><td><span class="swatch" style="background:#111"></span>Black</td><td>Miscellaneous equipment (stoves, axes, compasses…)</td></tr>
      </table>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>V = assistance; X = medical; N = no; Y = yes; ↑ = going this way.</li>
      </ul></div>
      <div class="callout law">Source: ICAO Annex 12 Appendix; SERA Appendix 1.</div>`,
    mnemonics: [
      { title: "\"V for Victim, X for eXamine (medical)\"", text: "V = require assistance; X = require medical assistance." },
      { title: "\"Red Bandage, Blue Bottle, Yellow Blanket, Black Box\"", text: "Supply drop colours: medical, food/water, clothing/blankets, equipment." }
    ]
  },
  {
    id: "accident-investigation", lesson: "l9", title: "Accident Reporting and Investigation", tag: "Accidents",
    summary: "What counts as an accident, who to tell, and what not to touch.",
    body: () => `
      <h2>Definitions</h2>
      <table class="ref"><tr><th>Term</th><th>Meaning</th></tr>
        <tr><td><b>Accident</b></td><td>An occurrence associated with the operation of an aircraft in which a person is <b>fatally or seriously injured</b>; or the aircraft sustains <b>damage or structural failure</b> affecting its strength, performance or flight characteristics that would normally need major repair; or the aircraft is <b>missing or inaccessible</b>.</td></tr>
        <tr><td><b>Serious incident</b></td><td>An incident where there was a <b>high probability of an accident</b>.</td></tr>
        <tr><td><b>Serious injury</b></td><td>e.g. hospitalisation for more than <b>48 hours</b> (starting within 7 days), most fractures (not simple fractures of fingers, toes or nose), serious burns or internal injuries.</td></tr>
        <tr><td><b>Fatal injury</b></td><td>Death within <b>30 days</b> of the accident.</td></tr>
      </table>
      <h2>What to do</h2>
      <ul>
        <li>Notify the <b>AAIB</b> (Air Accidents Investigation Branch) and the <b>local police</b> by the <b>quickest means</b>.</li>
        <li>Don't move or interfere with the wreckage, except to rescue people, prevent fire or further damage, or remove danger to the public or air navigation — or with AAIB permission.</li>
        <li>The AAIB investigates to <b>prevent future accidents</b> — not to apportion blame or liability.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>Report to the AAIB <b>and</b> the police, by the quickest means.</li>
        <li>AAIB purpose: prevention, not blame.</li>
      </ul></div>
      <div class="callout law">Source: UK Regulation 996/2010; Civil Aviation (Investigation of Air Accidents and Incidents) Regulations 2018; ICAO Annex 13.</div>`,
    mnemonics: [
      { title: "\"Hands off, phone the AAIB and the Bobby\"", text: "Don't touch the wreckage (except to save life or prevent further harm); tell the AAIB and the police." }
    ]
  },
  {
    id: "occurrence-reporting", lesson: "l9", title: "Mandatory and Voluntary Occurrence Reporting", tag: "Accidents",
    summary: "MORs to the CAA, the 72-hour rule, and confidential reporting.",
    body: () => `
      <ul>
        <li>Safety occurrences (incidents, hazards, defects, airspace infringements…) are reported through the <b>Mandatory Occurrence Reporting (MOR)</b> scheme to the <b>CAA</b>.</li>
        <li>Reports must be made within <b>72 hours</b> of becoming aware of the occurrence.</li>
        <li>Reporting works under a <b>"just culture"</b>: the aim is learning, and reporters aren't punished for honest mistakes (but gross negligence and wilful violations aren't protected).</li>
        <li><b>Voluntary reports</b> can also be made to the CAA, and confidential reports to <b>CHIRP</b>.</li>
        <li>Accidents and serious incidents still go to the <b>AAIB</b> as well.</li>
      </ul>
      <div class="callout key"><b class="title">Exam must-knows</b><ul>
        <li>MOR → CAA within <b>72 hours</b>.</li>
      </ul></div>
      <div class="callout law">Source: UK Regulation 376/2014 (occurrence reporting).</div>`,
    mnemonics: [
      { title: "\"Three days to tell the CAA\"", text: "MORs within 72 hours." }
    ]
  }
];

TOPICS.forEach((topic, index) => {
  topic.num = index + 1;
});
