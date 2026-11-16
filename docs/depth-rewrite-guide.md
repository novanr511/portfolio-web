# Depth Rewrite Guide — turning outline articles into publishable ones

This guide records the method used to rewrite the short, bullet-shaped articles
produced in the P-101–P-170 batches into articles that meet the editorial
standard in `docs/technical-seo-article-generation-prompt.md`. It exists so the
rewrite is repeatable rather than a matter of taste.

## What went wrong

The batch-produced articles shared a shape: an opening, a **Direct answer**
paragraph, five or six `##` sections of bullet lists, two internal links, and a
`References & Further Reading` section whose text explicitly said it cited
nothing. Audited in 2026-11-16, 144 of the 206 published articles sat below the
editorial word band and 137 carried a reference section with zero URLs.

Two separate defects were involved, and they need different fixes.

| Defect | Symptom | Fix |
|---|---|---|
| **Depth** | 400–700 words, bullet lists, no mechanism, no numbers, no test | Rewrite the body. This guide. |
| **Evidence** | Reference section that names no source | Replace with a verified reading list. `docs/further-reading-registry.json`. |

The evidence fix was largely automated and is now enforced by CI. The depth fix
is editorial work and cannot be automated.

## The target shape

Every rewritten article in the first batch follows the same skeleton. It is not
a template to fill in — it is the order in which a reader's questions arrive.

1. **Opening (2–4 sentences).** The problem, concretely. No throat-clearing.
2. **Direct answer (40–70 words).** The answer plus the boundary of the answer.
3. **Mechanism.** How the thing actually works, with at least one specific
   result quoted from a source. This is where the bulk of the words go.
4. **The interesting caveat.** The most useful section in the article: where the
   cited result does *not* generalise, what the source itself says about its
   own limits, or what the counter-argument is.
5. **A decision or test the reader can run.** Numbered. Something they can do on
   Monday. This is what the master prompt's quality gate calls "practicality".
6. **Internal links (2–3).** To genuinely related articles, in context.
7. **`References & Further Reading`.** Generated from the registry — never
   hand-written.

## How to research a rewrite

Sources are already in `docs/further-reading-registry.json` and each one has
been verified by `scripts/verify-sources.mjs`. The rule is simple: **read the
source before you write the sentence that cites it.**

Concretely:

1. Run `node scripts/verify-sources.mjs` and confirm your sources still verify.
2. Fetch the source and extract the specific claims you intend to make. For
   papers, the abstract is usually enough for the headline numbers — but fetch
   it, do not recall it. During the first batch, twenty-plus arXiv identifiers
   written from memory turned out to point at unrelated papers; the verification
   step is what caught them.
3. Prefer a primary source over a summary of it. A paper, a standard, a
   regulator's own text, an official dataset page.
4. If a canonical source is paywalled or bot-blocked, use an open version from
   a venue that publishes freely — NeurIPS proceedings, CVF Open Access,
   PMLR, JMLR, arXiv, official documentation. If nothing open and citable
   exists, do not cite the topic from memory: pick a different source and
   write about that instead.
5. Record the source's own caveats in the article. A result quoted without the
   limitation the authors stated is being misrepresented.

## What to write

- **Numbers, with their denominator.** "Accuracy" is meaningless without the
  task, the sample, and the baseline.
- **Mechanism, not taxonomy.** "Here are the categories" is not depth. "Here is
  what each one is good at, and here is what it costs" is.
- **A negative result.** The strongest sections in the rewritten batch quote
  results that complicate the popular story: a model that is slower than the
  status quo, a model that loses to a trivial rule, a feature set that makes
  results worse.
- **Honest scope.** Say what the evidence covers and what it does not. The
  master prompt requires this, and it is also what makes an article worth
  citing.
- **No padding.** If the complete answer is 900 words, stop at 900. Do not
  pad to hit a number. The word band in the plan is an editorial working
  bound, not a target to inflate towards.

## What not to write

- Bullet lists where an argument belongs.
- A number you did not read in a source.
- A quote you cannot attribute.
- "AI is transforming everything" as an analytical move.
- A personal experience, experiment, or result you did not produce.
- An FAQ section added for search rather than to answer a real follow-up.

## Checklist before the article leaves draft

The gate in `scripts/check-articles.mjs` enforces the mechanical parts:

```bash
node scripts/check-mdx.mjs          # every article compiles
node scripts/check-articles.mjs      # quality gate, no regressions
node scripts/apply-further-reading.mjs --check   # reading list matches the registry
node scripts/verify-sources.mjs      # every registered source still resolves
npm run build
```

The editorial parts are yours:

- [ ] Does the opening name a real problem?
- [ ] Is the direct answer correct *and* bounded?
- [ ] Does the mechanism section explain rather than list?
- [ ] Is every number traceable to a source you read?
- [ ] Have you included the source's own caveat?
- [ ] Can the reader run the test you offer?
- [ ] Do the internal links point at articles that exist and are relevant?
- [ ] Is the reference list generated from the registry rather than typed?
- [ ] Would you publish this with your name on it?

## Finishing

When an article passes both the gate and the editorial checklist, update its
row in `docs/broader-pillar-production-ledger.md` to `Ready` with a next
action naming what was re-checked, and record the batch in the execution log.
