# Two-minute demo walkthrough

Use the deployed demo at `https://inpractise.cristiandeluxe.dev`. To rehearse
offline, run `pnpm build` followed by
`pnpm preview --host 127.0.0.1 --port 4173 --strictPort` and replace only the
origin in these URLs.

## Before the timer

Sign in at `https://inpractise.cristiandeluxe.dev/login` as
`me@cristiandeluxe.dev`, the provisioned reviewer with premium access. Obtain
`DEMO_PASSWORD` privately and confirm the owner has provisioned the identity; do
not show it on screen. Open the URLs below as bookmarks. Keep the company
selector at all companies. Have the two questions ready to paste. Each question
is standalone and each explicit Ask consumes allowance; do not rehearse requests
repeatedly or retry automatically.

Warm the Edge function before the timer starts. Measured against the deployment
on 2026-09-14, the first `search` after an idle period took 6418ms while the
three that followed took 3017ms, 2562ms and 2310ms; the 8-second fallback below
is sized for a warm function, not a cold start. One throwaway search from the
signed-in session is enough.

Keep the retained U3 screenshots `live-ask-answered.png` and
`live-ask-not_found.png` open locally as a fallback. They are historical
live-run evidence, not current responses. Also open `docs/evals.md` for the F03
explanation and `tests/integration/rls.test.ts` for the premium-boundary test.
Check these artifacts are available before presenting.

## Timed sequence — 120 seconds total

| Time     | Exact URL and action                                                                                                                                                                                                                                                                 | Spoken words                                                                                                                                                                                                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0–12s    | `https://inpractise.cristiandeluxe.dev/`                                                                                                                                                                                                                                             | “This is an independent engineering demo. Its sources are public SEC filings and synthetic interviews about fictional companies. It uses no private In Practise research.”                                                                                                                                                                             |
| 12–25s   | `https://inpractise.cristiandeluxe.dev/app#research`. Show the reviewer library, select Ask, paste the question below and submit once.                                                                                                                                               | “The database scopes this library to my account. I’ll ask one standalone question about the synthetic Northstar interview.”                                                                                                                                                                                                                            |
| 25–47s   | Stay at `/app#research`. Open the returned citation, then follow its exact reader link. The prior live answer cited `https://inpractise.cristiandeluxe.dev/read/s1/ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94/P2`. Use the actual returned link if it differs. | “This claim points to an exact quotation, with document, revision, passage, date and speaker. Opening it rechecks my access. The interview is synthetic; the citation identifies the passage actually used.”                                                                                                                                           |
| 47–68s   | `https://inpractise.cristiandeluxe.dev/app#research`. Select Ask, paste the refusal question below and submit once.                                                                                                                                                                  | “Now I’ll ask for a forecast the corpus cannot establish. The recorded live result was not_found, with no claims or citations. Missing evidence should remain missing.”                                                                                                                                                                                |
| 68–83s   | `https://inpractise.cristiandeluxe.dev/read/s6/15160e34c3737894ed8c389ea682cd7f6109d11a614b8d581cd69e64a1bf4b54/P2`                                                                                                                                                                  | “This premium reviewer can read the exact passage. Direct RLS tests prove basic and MCP fixtures see no matching database rows; browser/MCP parity tests prove the read API returns not_found without leaking its title or quotation.”                                                                                                                 |
| 83–105s  | `https://inpractise.cristiandeluxe.dev/method`                                                                                                                                                                                                                                       | “Two fourteen-case runs matched thirteen statuses. All ten evidence cases were retrieved, but F03 failed selection: the document cap excluded Costco’s answering passage. We kept that failure. The inspection page shows the connected diagnostic report: which candidates were retrieved and which of them the selector actually sent to the model.” |
| 105–120s | `https://inpractise.cristiandeluxe.dev/connect`                                                                                                                                                                                                                                      | “The local MCP server exposes search_research and fetch_passage under database-enforced member access. The recorded session negotiated protocol 2025-11-25. Parity tests cover search order and the premium boundary.”                                                                                                                                 |

Live answer question:

```text
What makes a complex Northstar installation difficult to migrate?
```

Live refusal question:

```text
What will Northstar Workflow net retention be in 2027?
```

The premium reader **page** is a static HTTP 200 shell. For the reviewer, its
authenticated research request should return the passage. The denial is not a
live reviewer-demo step: `tests/integration/rls.test.ts` verifies empty passage
rows for the basic and MCP fixtures while the reviewer control reads the same
source. `tests/integration/mcpParity.test.ts` verifies `not_found` through the
browser and MCP read paths. The refusal should say “The corpus could not
establish an answer to this question.” If the live status differs, describe the
actual result and use the fallback; never narrate an expected result as
observed.

## Failure fallback inside the same time slots

Allow at most eight seconds for either Ask request or a passage read. On an
error or timeout, cancel if still pending, switch immediately to the
corresponding retained screenshot and say: “The live request failed. This is the
recorded run from 13 September, not a live answer.” Do not refresh into repeated
provider calls. If login or connectivity fails before starting, present the
screenshots and local evaluation document throughout and identify the
walkthrough as recorded. Keep the slot boundaries above; no extra
troubleshooting time is added.

The request timings in this script were measured against the deployment on
2026-09-14, signed in as the demo reviewer: sign in 989ms, search 6418ms cold
and 2310-3017ms warm, the answered Ask 4439ms returning one claim with the
diagnostic record, the cited passage read 515ms, the refusal Ask 3843ms
returning `not_found` with no claims, and `debug` 2007ms returning six recent
requests. Every step fits the 8-second budget below once the function is warm.
What has not been rehearsed is a person performing the narration inside the slot
boundaries; the numbers above bound the request time only, about 18 seconds of
the 120.

Other verification: `pnpm build`, the U3 browser evidence linked in
[frontend-port.md](frontend-port.md), and the local routing checks in
[deploy.md](deploy.md).

The database enforces 100 Ask calls per member per UTC day before provider work.
A failure, refusal, no-evidence result or cancellation still costs one unit; the
browser renders exhaustion as `allowance_exhausted`. Completion usage is
recorded from the response or left unknown. Search and Read do not debit the Ask
allowance. Search parity now uses controlled lexical embeddings with live RLS;
it does not establish deployed hybrid-provider determinism.
