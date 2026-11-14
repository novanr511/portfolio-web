# NOVANDRI Personal Publication — Broader Pillar Production Ledger

**Last Updated:** 2026-11-14
**Scope:** Articles outside the 32-chapter Technical SEO series, produced against the eight publication pillars in `docs/technical-seo-knowledge-hub-plan.md`. The Technical SEO series keeps its own ledger in `docs/technical-seo-production-ledger.md`.
**Editorial standard:** Evidence-Based Editorial — no unsupported claims, fabricated facts, or unverified citations.
**Language:** English only across the publication, as decided by the owner.
**Master Prompt Reference:** `docs/technical-seo-article-generation-prompt.md`
**Total Planned:** Open — the idea bank in the knowledge hub plan is a seed list, not an approved backlog.
**Current Progress:** 5 Drafted (all pending source re-review)

---

## Production Ledger Table

| ID | Title | Pillar | Format | Status | File Path | Last Action Date | Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P-01** | Certificate Transparency: What the Public Logs Prove, and What They Don't | Technology & The Digital World | Deep Dive | `Drafted` | `src/content/articles/certificate-transparency-what-the-public-logs-prove.mdx` | 2026-11-14 | Re-check CT log list figures (live daily document) and Chrome policy wording before publishing |
| **P-02** | Chinchilla and the Scaling Laws: Why "Just Make It Bigger" Stopped Being the Rule | Artificial Intelligence & Future Innovation | Analysis | `Drafted` | `src/content/articles/chinchilla-and-the-scaling-laws-why-bigger-stopped-being-the-rule.mdx` | 2026-11-14 | Confirm Appendix D.3 token/parameter pairings against the published table before publishing |
| **P-03** | Cache-Control Is a Contract, Not a Suggestion: Reading HTTP Freshness Correctly | Technology & The Digital World | Deep Dive | `Drafted` | `src/content/articles/cache-control-is-a-contract-not-a-suggestion.mdx` | 2026-11-14 | Re-capture the live header samples; header values change per request |
| **P-04** | Open Source Is a License Term, Not a Vibe: Reading OSD, OSAID, and BSL | Business, Strategy & Entrepreneurship | Analysis | `Drafted` | `src/content/articles/open-source-is-a-license-term-not-a-vibe.mdx` | 2026-11-14 | Confirm licence texts are current versions; BUSL parameters are licensor-specific |
| **P-05** | Data Centre Electricity: Reading the IEA Forecasts Without Fooling Yourself | Markets, Economics & Emerging Industries | Analysis | `Drafted` | `src/content/articles/data-centre-electricity-reading-the-iea-forecasts-honestly.mdx` | 2026-11-14 | Re-verify figures against the current IEA editions before publishing; treat scope labels as version-specific |
| **P-06** | Simpson's Paradox in Your Own Data: Why a Single Correlation Can Reverse Its Sign | Data, Analytics & Decision Science | Deep Dive | `Drafted` | `src/content/articles/simpsons-paradox-why-a-single-correlation-can-reverse-its-sign.mdx` | 2026-11-14 | Re-run the snippet against the pinned Zenodo CSV version before publishing |

---

## Status policy

`Drafted` means the file exists and every cited source was inspected in its original form during drafting. It does **not** mean the article has passed the master prompt's quality gate, and it does not mean it is `Ready`. An article becomes `Ready` only when its key citations have been re-checked in original sources for exact support, context, methodology/date, and limitations, its examples carry honest provenance, and it scores at least 17/20 with no zero in Accuracy, Evidence integrity, Intent, or CMS readiness.

`Reviewed` means an independent pass has checked the draft against the quality gates and returned a pass decision without expanding scope.

## Scope notes for this batch

- The five drafts span five different pillars deliberately, since the Technical SEO series already occupies the Technology and Growth-adjacent ground and a sixth SEO chapter would contradict the 32-chapter plan.
- Two drafts cite documents that change over time (the Chrome CT log list, the Chrome CT policy) or are licensor-specific (BUSL parameters). These are flagged in the "Next Action" column and must be re-verified at publication, not treated as permanently cached facts.
- P-06 is the only draft whose central claim rests on an original computation by the author. The computation is fully reproducible from a pinned dataset version and the snippet is included in the article, but it still requires a re-run before publication.

## Batch Execution Log

- **Batch A (Pillar expansion, run 1 — 2026-11-14):** P-01, P-02, P-03, P-04, P-05, P-06 drafted in a single session at the owner's explicit request for five drafts. This exceeds the master prompt's default of two full articles per run; the owner's instruction took precedence, and the quality gates were applied per article rather than per batch. Sources were fetched directly from publishers (rfc-editor.org, IETF datatracker, Chrome/Certificate Transparency policy pages, gstatic CT log list, arXiv, IEA PDFs, OSI, Zenodo) because the web search tool was returning HTTP 402 throughout the session.
- **Next Up:** Review pass on P-01 through P-06; then decide whether the broader pillar queue should be formalised in the knowledge hub plan before further drafting.
