# Two-minute demo walkthrough

Use the deployed demo at `https://inpractise.cristiandeluxe.dev`. To rehearse
offline, run `pnpm build` followed by
`pnpm preview --host 127.0.0.1 --port 4173 --strictPort` and replace only the
origin in these URLs.

## Before the timer

Sign in at `https://inpractise.cristiandeluxe.dev/login` as the provisioned
**basic** member. Obtain its password privately; do not show credentials on
screen. Open the URLs below as bookmarks. Keep the company selector at all
companies. Have the two questions ready to paste. Each question is standalone
and each explicit Ask consumes allowance; do not rehearse requests repeatedly or
retry automatically.

Keep the retained U3 screenshots open locally as a fallback:
`/tmp/lovable-work/live-ask-answered.png`, `live-ask-not_found.png` and
`live-premium-not-found.png`. They are historical live-run evidence, not current
responses. Also open `docs/evals.md` for the F03 explanation. Check the
screenshots are available before presenting.

## Timed sequence — 120 seconds total

| Time     | Exact URL and action                                                                                                                                                                                                                                                                 | Spoken words                                                                                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–12s    | `https://inpractise.cristiandeluxe.dev/`                                                                                                                                                                                                                                             | “This is an independent engineering demo. Its sources are public SEC filings and synthetic interviews about fictional companies. It uses no private In Practise research.”                                                                        |
| 12–25s   | `https://inpractise.cristiandeluxe.dev/app#research`. Show the basic-member library, select Ask, paste the question below and submit once.                                                                                                                                           | “The database scopes this library to my account. I’ll ask one standalone question about the synthetic Northstar interview.”                                                                                                                       |
| 25–47s   | Stay at `/app#research`. Open the returned citation, then follow its exact reader link. The prior live answer cited `https://inpractise.cristiandeluxe.dev/read/s1/ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94/P2`. Use the actual returned link if it differs. | “This claim points to an exact quotation, with document, revision, passage, date and speaker. Opening it rechecks my access. The interview is synthetic; the citation identifies the passage actually used.”                                      |
| 47–68s   | `https://inpractise.cristiandeluxe.dev/app#research`. Select Ask, paste the refusal question below and submit once.                                                                                                                                                                  | “Now I’ll ask for a forecast the corpus cannot establish. The recorded live result was not_found, with no claims or citations. Missing evidence should remain missing.”                                                                           |
| 68–83s   | `https://inpractise.cristiandeluxe.dev/read/s6/15160e34c3737894ed8c389ea682cd7f6109d11a614b8d581cd69e64a1bf4b54/P2`                                                                                                                                                                  | “This account cannot read this passage. The research endpoint returns the same 404 as a missing source, without a title or quotation. A premium control verifies the passage exists.”                                                             |
| 83–105s  | `https://inpractise.cristiandeluxe.dev/method`                                                                                                                                                                                                                                       | “Two fourteen-case runs matched thirteen statuses. All ten evidence cases were retrieved, but F03 failed selection: the document cap excluded Costco’s answering passage. We kept that failure. The inspection endpoint has no connected report.” |
| 105–120s | `https://inpractise.cristiandeluxe.dev/connect`                                                                                                                                                                                                                                      | “The local MCP server exposes search_research and fetch_passage under the same member access. The recorded session negotiated protocol 2025-11-25. Parity tests cover search order and the premium denial.”                                       |

Live answer question:

```text
What makes a complex Northstar installation difficult to migrate?
```

Live refusal question:

```text
What will Northstar Workflow net retention be in 2027?
```

The premium reader **page** is a static HTTP 200 shell; its authenticated
research **request** must return 404. Do not confuse those responses. The UI
should say “This source is unavailable.” The refusal should say “The corpus
could not establish an answer to this question.” If the live status differs,
describe the actual result and use the fallback; never narrate an expected
result as observed.

## Failure fallback inside the same time slots

Allow at most eight seconds for either Ask request or a passage read. On an
error or timeout, cancel if still pending, switch immediately to the
corresponding retained screenshot and say: “The live request failed. This is the
recorded run from 13 September, not a live answer.” Do not refresh into repeated
provider calls. If login or connectivity fails before starting, present the
screenshots and local evaluation document throughout and identify the
walkthrough as recorded. Keep the slot boundaries above; no extra
troubleshooting time is added.

This is a timed script, not a claimed two-minute rehearsal on a deployed UI.
Verification: `pnpm build`, the U3 browser evidence linked in
[frontend-port.md](frontend-port.md), and the local routing checks in
[deploy.md](deploy.md).

The database enforces 100 Ask calls per member per UTC day before provider work.
A failure, refusal, no-evidence result or cancellation still costs one unit; the
browser renders exhaustion as `allowance_exhausted`. Completion usage is
recorded from the response or left unknown. Search and Read do not debit the Ask
allowance. Search parity now uses controlled lexical embeddings with live RLS;
it does not establish deployed hybrid-provider determinism.
