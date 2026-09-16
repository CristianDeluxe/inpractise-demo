export const methodSections = [
  {
    title: 'Evidence rules',
    body: 'Answers use authorized retrieved passages. The browser rejects malformed citations, mismatched identities and invalid quotations. Claims and quotes are selectable plain text. The server checks that every quotation is exact; whether a quote supports its claim is judged separately, by the independent grounding check in the evaluation.',
  },
  {
    title: 'Access',
    body: 'Database row level security scopes retrieval to the caller. Password accounts are privately provisioned. Every deep link is independently authorized; missing and inaccessible passages share the same neutral unavailable state. The evaluation re-reads every returned citation as its caller. Authorization is rechecked once more after generation: a claim is indivisible, so when any of its sources has become unreadable the whole claim is dropped, and an answer that loses every claim returns not_found.',
  },
  {
    title: 'Measured results',
    body: 'Two live evaluation runs on 13 September 2026 retained identical results over 14 cases: 13/14 expected statuses, 10/10 candidate recall at ten on evidence cases, 4/4 correct negative-control refusals, and 14/14 independently judged grounded. Neither run returned an unauthorized citation or leaked a restricted string. Fourteen labeled cases are a regression gate, not an accuracy benchmark.',
  },
  {
    title: 'Retrieval and its failures',
    body: 'Candidate recall is measured before context selection. Neither recorded run had a retrieval miss; both had the selection miss F03, asking how Costco’s fiscal year is structured. Answering passages ranked fifth and sixth, but the two-passages-per-document cap selected only ranks one to four from the two Costco documents. The model returned not_found without the answering evidence. This measured limitation is retained instead of tuning the cap solely to improve one result. The evaluation report and the induced retrieval miss live in the repository; the reviewer screen shows caller-scoped corpus counts.',
  },
  {
    title: 'Provenance',
    body: 'The corpus contains four public SEC filings, one public UK annual report and six synthetic interviews about fictional companies and speakers. Public filings are labelled separately. This is an independent demo: everything it searches is public or invented.',
  },
  {
    title: 'Local MCP',
    body: 'The local stdio server exposes exactly two read-only tools: search_research and fetch_passage. Both use an ordinary member and the browser’s research endpoint. The recorded client session negotiated protocol 2025-11-25. Parity tests check ordered citation IDs, basic-member premium denial and a premium positive control.',
  },
  {
    title: 'Scope',
    body: 'Each question reaches retrieval standalone; a follow-up in the chat is rewritten into one first. Answers come from passages of the corpus alone, without web search or a full-document reader. Provider failures are errors, not evidence-based refusals. Cancelling a request clears its display; the server request and its allowance debit run to completion.',
  },
  {
    title: 'What I would build next',
    body: 'A multi-step research agent that plans, searches, reads and drafts across a question tree, every step carrying the same server-owned citations so a memo can be audited claim by claim. Executive testimony cross-referenced against filings, with the confirming or contradicting passage shown side by side. International filings from Companies House, SEDAR+, ESEF and EDINET under the same acquisition record and immutable revisions. Persistent notebooks of saved questions and pinned passages, stored under row level security so a notebook can only cite what its owner can read. Sub-second search from a query-embedding cache, a kept-warm function and a tuned HNSW index, with p95 tracked by the evaluation gate. MCP write tools that save a passage or file a question from Claude Code or Cursor under the same authorization and allowance. Eval-driven ranking, where a reranker lands only when the gold set shows a gain with no new failures.',
  },
]
