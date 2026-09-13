export const methodSections = [
  {
    title: 'Evidence rules',
    body: 'Answers use authorized retrieved passages. The browser rejects malformed citations, mismatched identities and invalid quotations. Claims and quotes are selectable plain text. Exact quotations do not by themselves prove semantic entailment.',
  },
  {
    title: 'Access',
    body: 'Database row level security scopes retrieval to the caller. Password accounts are privately provisioned. Every deep link is independently authorized; missing and inaccessible passages share the same neutral unavailable state. The evaluation re-reads every returned citation as its caller. Mid-request access revocation is not proven safe for claim text: the response builder can remove a citation while retaining its associated prose.',
  },
  {
    title: 'Measured results',
    body: 'Two live evaluation runs on 13 September 2026 retained identical results over 14 cases: 13/14 expected statuses, 10/10 candidate recall at ten on evidence cases, 4/4 correct negative-control refusals, and 14/14 independently judged grounded. Neither run returned an unauthorized citation or leaked a restricted string. These cases do not establish general accuracy.',
  },
  {
    title: 'Retrieval and its failures',
    body: 'Candidate recall is measured before context selection. Neither recorded run had a retrieval miss; both had the selection miss F03, asking how Costco’s fiscal year is structured. Answering passages ranked fifth and sixth, but the two-passages-per-document cap selected only ranks one to four from the two Costco documents. The model returned not_found without the answering evidence. This measured limitation is retained instead of tuning the cap solely to improve one result. The reviewer screen has no connected evaluation report and cannot display an induced retrieval miss.',
  },
  {
    title: 'Provenance',
    body: 'The corpus contains four public SEC filings and six synthetic interviews about fictional companies and speakers. Public filings are labelled separately. This independent demo uses no private In Practise research and has no access to their systems.',
  },
  {
    title: 'Local MCP',
    body: 'The local stdio server exposes exactly two read-only tools: search_research and fetch_passage. Both use an ordinary member and the browser’s research endpoint. The recorded client session negotiated protocol 2025-11-25. Parity tests check ordered citation IDs, basic-member premium denial and a premium positive control. This page does not establish a live MCP connection.',
  },
  {
    title: 'Scope',
    body: 'Each question is standalone. There is no web search, question history or full-document reader. Provider failures are errors, not evidence-based refusals. Cancelling a request clears its display; it does not guarantee a refund or stop server work already underway.',
  },
]
