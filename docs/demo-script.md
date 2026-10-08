# Five-minute demo walkthrough

Use the deployed demo at `https://inpractise.cristiandeluxe.dev`. To rehearse
offline, run `pnpm build` followed by
`pnpm preview --host 127.0.0.1 --port 4173 --strictPort` and replace only the
origin in these URLs.

## What is on screen

Two public podcast interviews from _In Good Company_, hosted by Nicolai Tangen
for Norges Bank Investment Management: Roche CEO Thomas Schinecker (2024-11-20)
and Novartis CEO Vasant Narasimhan (2025-06-25). Both transcripts are automatic;
speaker labels are inferred from the audio and are not human-reviewed. They are
**not** In Practise expert interviews and not In Practise research. Say so in
the first sentence of the demo.

## Before the timer

Sign in at `https://inpractise.cristiandeluxe.dev/login` as
`me@cristiandeluxe.dev`. Obtain `DEMO_PASSWORD` privately and confirm the owner
has provisioned the identity; do not show it on screen. Open the URLs below as
bookmarks. Each explicit Ask consumes allowance; submit each question once and
never retry automatically. A follow-up in the Ask chat is rewritten into a
standalone question first, and the chat shows that rewrite above the answer.

Warm the Edge function before the timer starts with one throwaway search from
the signed-in session. Dated observations against the earlier corpus
(2026-09-14) put a cold first search near 6.4 s and warm searches near 2.3-3.0
s; the latency is a property of the function, not of the corpus, but re-measure
before quoting a number.

## Timed sequence - about five minutes

| Time      | Exact URL and action                                                                                                                                                               | Spoken words                                                                                                                                                                                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00-0:40 | `https://inpractise.cristiandeluxe.dev/`, then sign in and open `/app`. Open the Roche interview.                                                                                  | "This is an independent engineering demo over two public CEO podcasts. The transcripts are automatic and the speaker labels are inferred, so they are not In Practise research. Every source on screen says so."                                                                                                                  |
| 0:40-1:40 | Go to `/app/ask`. Paste the first question below and submit once. The evidence inspector reports each phase as it arrives.                                                         | "One standalone question about the Roche interview. The panel names each phase: allowance debited, candidates ranked, passages selected, citations rechecked."                                                                                                                                                                    |
| 1:40-2:40 | Open the returned citation and follow its exact reader link. The expected passage is `pod-roche-2024` `T030.1` (the AI-in-R&D answer); use the actual returned link if it differs. | "The claim points to an exact quotation with document, revision, passage, date and speaker. Opening it rechecks my access, and the passage shown is the one the answer used."                                                                                                                                                     |
| 2:40-3:20 | Stay at `/app/ask`. Paste the refusal question below and submit once.                                                                                                              | "Now something the interview does not contain: a revenue forecast. The answer is `not_found`: no claims, no citations, and nothing extrapolated from the passages that were found."                                                                                                                                               |
| 3:20-4:10 | `https://inpractise.cristiandeluxe.dev/app/transcripts`, then the memory view at `/app/memory`.                                                                                    | "Automatic transcripts contain errors. This is the transcript lab: an AI pass corrects the transcript and scores how reliable the result is, and a person only spot-checks the few uncertain words; what they confirm is learned and reused."                                                                                     |
| 4:10-5:00 | `https://inpractise.cristiandeluxe.dev/app/cost`, then `https://inpractise.cristiandeluxe.dev/connect`.                                                                            | "The cost view shows what this pipeline spends: the tokens of the AI cleanup pass, which runs on a subscription lane with no per-token charge, the priced Ask and embedding calls, and each episode's reliability. The same two transcripts are reachable through two read-only MCP tools with identical database authorization." |

Live answer question:

```text
How is Roche using AI in R&D?
```

Live refusal question:

```text
What will Roche's revenue be in 2030?
```

The refusal reads "The corpus could not establish an answer to this question."
If the live status differs, describe the actual result and use the fallback;
narrate what is on screen, never the expected result.

## The production lab

The transcript review lab (`/app/transcripts`, `/app/memory`, `/app/cost`) reads
Supabase under the signed-in member's session. Transcripts, learned memory and
audio exist there only after `pnpm lab:publish` has run; decisions are recorded
by reviewers only, and a member sees the same screens read-only. The cost page
shows this pipeline's own tokens, list-price USD, local recognition at no API
cost and reviewer minutes per audio hour, each labelled measured or estimated.
Reviews start empty on the deployed project, so the first reviewer decisions are
the ones the cost page measures.

## Access boundary to mention

The database lets readers see only documents of kind `public_interview`
(migration `20261008000017`). The earlier synthetic interviews and SEC filings
are still stored and immutable, but no policy, search function or inspection
path can surface them. The tests that cover it are
`tests/integration/rls.test.ts`, `tests/integration/database.test.ts` and
`tests/integration/mcpParity.test.ts`, which assert that a hidden passage is
refused through both the browser path and MCP, with the same `not_found`.

## Failure fallback inside the same time slots

Allow at most eight seconds for either Ask request or a passage read. On an
error or timeout, cancel if still pending, say that the live request failed and
describe what the page actually shows. Do not refresh into repeated provider
calls. If login or connectivity fails before starting, walk through
`docs/evals.md` and the tests named above and identify the walkthrough as
recorded. No extra troubleshooting time is added.

## Dated measurements from the earlier corpus

The request timings below were measured on 2026-09-14 and 2026-09-15 against the
earlier filings and synthetic-interview corpus, which readers can no longer see.
They bound the request path, not the podcasts: sign in 989 ms, search 6418 ms
cold and 2310-3017 ms warm, an answered Ask 4439 ms, a cited passage read 515
ms, a refusal Ask 3843 ms. The streaming path showed the first phase at 0.57 s
and the answer at 8.74 s on the warm function. No equivalent measurement exists
yet for the two podcasts; the retained screenshots from 13 September
(`live-ask-answered.png`, `live-ask-not_found.png`) show the earlier corpus and
must not be presented as podcast results.

The database enforces 100 Ask calls per member per UTC day before provider work.
A failure, refusal, no-evidence result or cancellation still costs one unit; the
browser renders exhaustion as `allowance_exhausted`. Search and Read do not
debit the Ask allowance. The search parity tests use controlled lexical
embeddings under live RLS; the podcasts are indexed in hybrid mode (full-text
plus `text-embedding-3-small` vectors), so Ask also embeds the question.

Other verification: `pnpm build`, the browser evidence in
[frontend-port.md](frontend-port.md) and the routing checks in
[deploy.md](deploy.md), both of which predate the podcast cut.
