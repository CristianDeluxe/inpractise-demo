# AGENTS.md — inpractise-demo

Independent engineering demo built for a hiring conversation with In Practise
(investment-research platform). It is **not** an In Practise product and touches
none of their systems or content.

The corpus is public filings plus synthetic interviews about invented companies.
Every surface that shows a source must say so. Never present generated material
as real In Practise research, and never imply access to their private library.

## What this is

One workflow, built well: sign in, search an authorised corpus, ask a standalone
question, open the exact passage the answer cites, ask something the corpus
cannot establish, and inspect an induced retrieval miss. The same evidence is
reachable through a local MCP server with two read-only tools.

Three properties are the point of the whole thing, and nothing gets cut to
rescue a prettier screen:

1. Evidence has a server-owned identity and scope: document, revision and
   passage IDs, exact quotations, dates and speaker attribution. A citation
   opens the passage actually used.
2. A retrieval failure is distinguishable from missing knowledge. Candidate
   recall is measured before context selection; a provider error is an error,
   never a refusal.
3. Authorization happens in the database, before evidence leaves it. No
   service-role key in any retrieval path, and identical outcomes through the
   browser and through MCP.

## Authority

`docs/research/07-one-day-execution-plan.md` governs the build.

## Conventions

One exported unit and one responsibility per file. Helpers, types, constants and
hooks each live in their own file, reached by explicit imports. English
everywhere. No emoji.

Credentials live in ignored `.env*` files and are loaded, never printed: scripts
report missing variable **names**. The Supabase MCP server on this machine
authenticates as a different account and must not be used against this project.

## Engineering baseline

Read `docs/baseline.md` for the strict BusiRocket presets, runtime boundaries,
verification results, and deferred upstream peer metadata. Use `pnpm verify` for
the complete local gate; `pnpm check:ci` is the credential-free CI gate. Run
`pnpm check:security` separately with gitleaks installed. Never generate ESLint
suppressions to make the checks pass. Helpers, types, and constants must be
split into explicitly imported files; re-export barrels are forbidden.

Node scripts use `tsconfig.node.json`; browser code under `src/` uses
`tsconfig.app.json`; Supabase Edge modules use
`supabase/functions/tsconfig.json` and a native `pnpm check:deno`. Do not add
Node ambient types to Edge modules. React UI code plugs into the existing Vite,
ESLint, TypeScript and Vitest configs.

The full verification uses existing demo password sessions and linked SQL
metadata. Integration fixtures run inside rolled-back transactions; ordinary
retrieval uses caller credentials. Do not run `seed`, `db:prepare`, `db:import`,
`db:embed`, or provider generation as a substitute for verification. Existing
migrations and frozen corpus files are immutable during maintenance.

The repository pushes to `CristianDeluxe/inpractise-demo` and the UI is deployed
at `https://inpractise.cristiandeluxe.dev` behind a Node origin on cPanel;
`docs/deploy.md` describes that path. GitHub Actions runs `pnpm check:ci` on
every push. A local gate still says nothing about either: report a CI result
only from a run you have read, and a deployment only from a request you have
made against the live host.

<!-- tadu:rule v3 -->

## Continuous TODO, Work Log, and History Coverage

Maintain `TODO.md` as the active backlog and `TODO_LOG.md` as the searchable
record of closed work. Use `TODO_HISTORY_INDEX.jsonl`, when present, to avoid
parsing unchanged conversations more than once.

- Read `TODO.md` at the beginning and end of related work. Search `TODO_LOG.md`
  before reopening an old task or repeating a previous solution.
- Record actionable bugs, risks, blockers, deferred work, missing tests,
  validation, documentation, and product improvements as they are discovered.
- Update an existing entry instead of creating a duplicate. Keep entries concise
  and under the most relevant category.
- Use `[ ]` pending, `[~]` partial or unverified, `[!]` blocked, `[x]` verified
  complete, `[-]` obsolete or superseded. Keep blockers in `TODO.md` and name
  the smallest action required to unblock them.
- When work becomes `[x]` or `[-]`, remove it from `TODO.md` and add a dated
  entry to `TODO_LOG.md` under `## YYYY` and `### YYYY-MM` headings, in the
  shape below. An `[x]` entry needs an `Evidence:` line and a `[-]` entry a
  `Resolution:` line, each with content.
- Before reviewing past conversations, consult the history index and skip
  unchanged records already marked `complete` or `irrelevant`. Update a record
  only after its findings are reconciled; interrupted work stays `partial`.
- Do not interrupt the active task for unrelated non-critical work, and do not
  implement unrelated TODO items unless requested. Immediately report critical
  security, destructive, or data-loss findings.

```md
- [x] YYYY-MM-DD — **Category:** What was done.
  - Result: What changed.
  - Evidence: The test, command result, commit or PR that proves it.

- [-] YYYY-MM-DD — **Category:** What was dropped.
  - Resolution: Why it no longer applies, or what replaced it.
```

Close an item with `tadu close --match "<text>" --evidence "<proof>" --write`
(`--resolution` for `[-]`, `--result` for the Result line); it moves the item
and writes the entry in this shape. Run `tadu doctor .` after changing these
files and before committing. If `tadu` is not on PATH, install it as
https://github.com/syntopica/tadu#install describes, or report that it is
missing. Format: tadu spec v1,
https://github.com/syntopica/tadu/blob/main/spec/todo-format-v1.md. The
tadu-create and tadu-work skills automate these workflows and are optional.
<!-- /tadu:rule -->

## TODO conventions specific to this repository

`TODO.md` and `TODO_LOG.md` are local working files and are not published.
