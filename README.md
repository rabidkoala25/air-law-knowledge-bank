# PPL(A) UK Air Law Knowledge Bank

Interactive study site for the UK PPL(A) Air Law exam: topic notes, diagrams, simulators, mnemonics, a question bank, flashcards and a timed 16-question / 35-minute mock exam.

Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Structure

```
index.html              page shell + script tags
css/styles.css          all styling
js/utils.js             localStorage wrapper and shared helpers
js/diagrams.js          SVG signals, lighting, markings, ASI and other diagrams
js/data/topics.js       lessons and topic notes (one object per topic)
js/data/questions.js    question bank
js/data/numbers.js      key figures for the Numbers cheat sheet
js/simulators.js        interactive simulators + the SIMULATORS registry
js/quiz.js              practice quiz
js/exam.js              timed mock exam
js/flashcards.js        flashcards
js/app.js               routing, views and event handling (loads last)
```

Scripts are classic (non-module) scripts sharing globals, so the order of the `<script>` tags in `index.html` matters.

## Deploy to GitHub Pages

1. Create a repository and push the contents of this folder to the `main` branch (with `index.html` at the root).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/<repository>/` after a minute or so.

The `.nojekyll` file stops GitHub Pages from running Jekyll over the files.

To run locally: `python3 -m http.server` in this folder, then open `http://localhost:8000`.

## Adding a topic

1. **Lesson** — if it's a new lesson, add it to `LESSONS` and `LESSON_ORDER` in `js/data/topics.js`.
2. **Topic** — add an object to `TOPICS` in `js/data/topics.js`, in the position it appears on the tracker. Topic numbers are worked out from the order of the array, so inserting a topic renumbers the rest automatically. The `id` is permanent — saved progress and questions are linked to it, so never change an existing one:

   ```js
   {
     id: "new-topic", lesson: "l4", title: "New Topic", tag: "Rules",
     summary: "One-line summary.",
     body: () => `<p>Notes as HTML…</p>`,
     mnemonics: [{ title: "Memory aid", text: "How it works." }]
   }
   ```

3. **Questions** — add lines to `QUESTIONS` in `js/data/questions.js`. The correct answer goes first (index `0`); options are shuffled when shown:

   ```js
   Q("new-topic", "Question text?", ["Correct answer", "Wrong", "Wrong", "Wrong"], 0, "Explanation."),
   ```

4. **Simulator (optional)** — write a `mountSomething(element)` function in `js/simulators.js`, register it in `SIMULATORS` with `topicId: "new-topic"`, and put `<div class="sim-slot" data-sim="something"></div>` in the topic body.

Progress (confident topics, saved mistakes, mock exam history) lives in the browser's localStorage.

## Sources

SERA (UK Reg (EU) 923/2012), Air Navigation Order 2016, Rules of the Air Regulations 2015, CAP 637, CAP 168, ICAO Annex 14, Part-FCL, Part-NCO. Cross-check against current CAA publications and course material.

## Question style guide

Questions copy the style of the real UK PPL Air Law exam. Every new or edited question should follow these rules:

- **Four options, all parallel.** They match in grammar and length, and the correct answer must never stand out by being the longest or most detailed.
- **Same-template distractors.** Where possible, options repeat the same clause and change only one value (e.g. "…less than 70 / 45 / 10 / 110 degrees…").
- **Near-miss numbers.** Numeric distractors come from the same family of real values (90°/110°/140°/180°; 6/12/24/60 months; 150 m/600 m; 500 ft/1,000 ft).
- **Stem patterns:**
  - Sentence completion ending in `:` or `The:` with lowercase continuations, e.g. `Who is responsible for…? The:` → `pilot-in-command`.
  - Direct recall: `Through what angle is … visible?`, `What colour are …?`
  - Text-only sign descriptions: `What does a square sign showing a black C on a yellow background indicate?`
  - Scenarios: `[situation]. What should the pilot do?`
  - Reverse definitions: `What is the name of [definition]? The:`
  - Premise + definition: `[rule], but how is "[term]" defined?`
  - Calculations with off-by-one or wrong-rule distractors (dates, hours, distances).
  - Yes/No + qualifier: `No` vs. three `Yes, but/as long as…` options.
- **Inverse pairs.** Test signals and definitions both ways (meaning → signal, and signal → meaning).
- **Word-association traps.** A plausible wrong answer that sounds right (C = "Customs", "Class C").
- **Explanations.** One or two sentences: why the answer is right, and which trap the distractors set.
