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
