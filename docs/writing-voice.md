# Writing voice — portfolio essays

A reference for writing portfolio essays on this site in the register of
Karri Saarinen's *Output isn't design*. Came out of working on the
minicart and add-to-cart pieces. The living example is at
`/writings/minicart` — the version of my own work that landed in this
register.

This is one register, not the only register. The Medium pieces (CSS
grid, WCAG, Figma vs Sketch) are written warmer and more first-person.
That register has its place. The rules below are specifically for
essays where the goal is to make an argument the reader carries away,
not to teach them a technique.

---

## The principle

Essays here are arguments, not build logs. The reader should close the
tab with a position, not a tutorial. The work being written about is
evidence for the position. It is not the subject.

If a draft reads as "first I did X, then I did Y, then I did Z" — it
is a build log. Rewrite it as "the version of X that does A is making
a different claim than the version of X that does B."

---

## Shape

- **Length:** aim for ~450–600 words; up to ~900 is fine for a piece
  that earns it. Past ~1,200 it is two essays or a tutorial. (An audit
  of Karri's own craft essays found most of his best argument pieces
  run 800–950 — the tight 530-word *Output isn't design* is the
  exception, not his norm.)
- **A header or two is allowed**, if the argument genuinely turns on a
  hinge. Default to none — subheads turn an argument into something the
  reader scans, which kills the rhetorical build — but one or two
  load-bearing headers won't break the register.
- **No pull-quote boxes inside the body.** The aphoristic moment is
  reserved for the closing.
- **No code snippets.** The essay is the argument. Implementation
  belongs on the experiments page or in a small artifact at the end.
- **Cite one outside reference — strongly recommended.** Doherty,
  Tognazzini, Bret Victor, Norman, Alexander, Tufte — borrowed
  authority is faster than performed insight. Karri's other essays
  mostly skip this; it's still the single biggest lever for making a
  piece read as argument rather than build log, so reach for it.
- **First person used sparingly.** Once, maybe twice, and usually only
  when describing my own practice ("That is the part I keep coming
  back to.").

---

## The Karri skeleton

The minicart essay was built on this paragraph order. It is a useful
starting frame:

1. **The common view, plainly stated.** What people usually think the
   thing is.
2. **"That is the misunderstanding."** Name the reframe and what is
   actually true.
3. **The citation paragraph.** One outside thinker. Name, year, paper
   title, the specific finding, in one paragraph.
4. **Evidence — bad case.** What the world looks like when the
   misunderstanding is in effect.
5. **Evidence — better case.** What changes when the reframe is
   applied.
6. **Evidence — best case (optional).** A third turn of the screw.
7. **Stepping back.** What is the same across all the evidence, and
   what changes.
8. **Personal note.** One sentence with "I" in it, owning the position.
9. **Restate, don't summarize.** Close on the position itself, not a
   recap of what was said. A short final paragraph that bites is the
   goal — the one-sentence form is no longer required.

Not all essays need step 6. Some need a different shape. The
skeleton is a draft frame, not a template.

---

## Opening

- Start with the world's claim, then break it. Not with what I built.
- One declarative sentence, or a short paragraph of plain
  observations. Example from the minicart piece: "A cart on the web is
  usually built as a list of rows. Add something, the list grows.
  Remove something, the list shrinks. The mechanics are solved. The
  interaction stays flat."
- Avoid clever openings. Karri opens his piece with "Design keeps
  being misunderstood in our industry." Six words, declarative, no
  setup.

---

## Citing

- One citation per essay. The citation should map exactly to the
  thesis, not decorate it.
- Format: name + year + paper title + the specific finding, in one
  paragraph. Example:

  > In 1982, an IBM researcher named Walter Doherty published a paper
  > called *The Economic Value of Rapid Response Time*. Its central
  > finding was that human productivity does not rise smoothly with
  > system speed. It rises sharply, at a specific threshold of around
  > 400 milliseconds.

- After citing, collapse the reference into "that line" or "the
  threshold" so the reader carries it forward without re-citation.

---

## Embedded figures (when an essay has live demos)

When the artifact pays for itself — the reader can *feel* something
the prose can't carry alone — drop an inline figure right after the
paragraph that introduces it.

Rules:

- Caption above the figure, not below: `Fig. 01 — Silent cart`.
- Top and bottom dashed rules. No full bordered card.
- Background `#0d0d0d`, min-height around 360px.
- No "Live preview" header chrome. The prose already said what the
  reader is looking at.
- Figures are evidence. If a figure could be cut without breaking the
  argument, cut it.

Three figures is roughly the upper limit. More than that and the
piece starts reading as a gallery with captions.

---

## Closing

- Close on the position itself, not a recap of what was said.
- A short, biting final paragraph is the goal. The two-single-sentence
  form is one way to do it, not a requirement — use it when it lands,
  drop it when it feels forced.
- Example from the minicart piece (the one-sentence form, still a fine
  option):

  > An interface that says nothing is not neutral.
  >
  > It is a position.

- Avoid: "In conclusion," "So to wrap up," a hiring/CTA sign-off, or a
  final pull-quote box. Karri's weaker pieces close on roadmap or
  recruiting; the strong ones leave the reader with the position and
  nothing to do but carry it.

---

## Things that broke the first drafts

These are the specific failure modes that came up in v1 of the two
articles. Worth checking against every draft.

- **Build-log structure.** "Iteration 01 — Classic" / "Detail 02 —
  Scramble." Tutorial framing.
- **Pull quotes every section.** Dilutes the aphoristic close. If
  every section has a quotable line, none of them are quotable.
- **Borrowed lines.** "Output isn't the design. The cart is the
  design." is too on-the-nose with Karri's title. Riff once, you owe
  homage; riff twice, you're a tribute act.
- **"I" overload.** "I built three versions" / "I wanted to push on"
  / "I keep coming back to this" / "I could have used a spinning SVG."
  Read as portfolio voice, not essay voice.
- **Code in the prose.** Every `<motion.div>` snippet drops the reader
  out of the argument and back into a tutorial.
- **Clever sentences straining.** "That assembly is a small tax the
  interface charges the user for not paying attention to them." A
  plain sentence ("The user has to assemble the result themselves.")
  lands harder.
- **Register pendulum.** Swinging from very specific (260×48 pixel
  slot) to very abstract (a button answers back). Pick one and stay.
- **Resolved endings.** "The work was deciding that a button could
  carry that much" tells the reader they have arrived. Karri's
  endings leave the reader unsettled.

---

## Self-check before shipping

Run through these:

1. Is the first paragraph about the world, not about me? (Non-negotiable.)
2. If there are headers, is each one load-bearing — could a reader skip
   them and still get the argument? If a header is just scannable
   decoration, cut it. Two is the ceiling.
3. Has one outside thinker been cited, by name and year? Strongly
   recommended — if there's no citation, is the argument carrying its
   own authority, or just asserting?
4. Has the word "I" appeared more than twice? If yes, cut.
5. Does the piece end on a position, not a summary or a CTA? Position wins.
6. If the page had no demos, would the essay still stand? It should.
7. Is there a `<Pull>` box anywhere inside the body? If yes, remove it.
8. Is it under ~900 words? Past ~1,200, split it.

---

## When to break the rules

- For a tutorial — a real, code-led teach — the warmer Medium
  register is correct. Code blocks, "I'm going to show you," friendly
  close. Two different jobs.
- For a short note (~150 words) — pure observation, no argument — the
  Karri shape is overkill. Just write the note.
- When breaking a rule, do it once, on purpose, in service of the
  argument. Two broken rules in one piece is drift.

---

## Reference essays

- **Karri Saarinen, *Output isn't design*** — the target voice.
  Linear blog. ~500 words, no headers, one citation (Christopher
  Alexander), aphoristic close.
- **`/writings/minicart`** — the version of my own work that landed in
  this register. Use as a structural reference.
- **`/writings/add-to-cart`** — the tutorial example for when the
  warmer code-led register is the right call instead. Same site,
  different job.
- **My own Medium pieces** (CSS grid, WCAG, Figma vs Sketch) — the
  warmer register, for tutorials and personal posts. Keep them
  separate from the essays here.
