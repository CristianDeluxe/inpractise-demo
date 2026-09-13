# The MCP server: the same reader, a different client

`pnpm mcp` starts a local stdio MCP server exposing **exactly two tools**:

- `search_research(query, company?, limit?)` — ranked passages with their
  immutable citations.
- `fetch_passage(documentId, revisionId, passageId)` — one whole passage plus
  its neighbours' IDs.

It signs in as an ordinary member with a password and calls the same
`POST /functions/v1/research` endpoint the browser calls. It never holds a
service key, and **no tool accepts an org, user or role argument**: what the
member may read is decided by the same row level security, not by the caller.
stdout carries the protocol only; diagnostics go to stderr.

## Configuration

`.mcp.json` launches it from four environment variables — `RESEARCH_URL`,
`RESEARCH_PUBLISHABLE_KEY`, `RESEARCH_EMAIL`, `RESEARCH_PASSWORD` — so no
credential is ever a tool argument or a command-line flag. The optional
`RESEARCH_HANDSHAKE_LOG` records each negotiated session.

## Parity, including the denial

`tests/integration/mcpParity.test.ts` runs a real MCP client against the real
server over an in-memory transport pair and asserts, for one principal:

- exactly the two tools are exposed, neither taking an `orgId`;
- the basic member is refused the premium passage `s6/P2` with the same
  `not_found` through MCP as the browser gets over HTTP (404, no title hint, no
  canary text);
- the **premium** member receives that same passage through MCP — the control
  that proves the canary was actually loaded rather than absent everywhere;
- a search returns the identical ordered `citationId` list through both paths.

## A real Claude Code session

Not an example transcript. Claude Code launched the server from `.mcp.json` and
negotiated protocol version **2025-11-25** (recorded in
`docs/mcp-handshake.jsonl`). Session `1e899018-7c9d-4568-ae7a-59d79df71039`,
2026-09-13, five turns, 20.0s, asking for the Meridian January 2026 example and
then for February. Its own answer, in part:

```text
"In the fictional January 2026 example, processing revenue was USD 120,000 on
 2,000,000 transactions."
— s5:9894d77a513001f5f0e431adc1ffeaf574717184e0207583151816dffded4c13:P2

February 2026 — corpus has no figures. Not a retrieval miss: search returned all
four passages of s5, and the source states it explicitly: "I have no figures for
February 2026."
```

The client cited immutable ids, carried the scope caveat from the neighbouring
passage, and refused the February question rather than extrapolating from
January — the same refusal the web client gets, through a different surface.
