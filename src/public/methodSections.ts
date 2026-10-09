export const methodSections = [
  {
    title: 'Where the material comes from',
    body: 'The demo searches two public episodes of In Good Company, the podcast of Norges Bank Investment Management hosted by Nicolai Tangen: the interview with Thomas Schinecker, CEO of Roche (dated 20 November 2024), and the interview with Vasant Narasimhan, CEO of Novartis (25 June 2025). It is not In Practise content and it is not drawn from In Practise’s library. Older synthetic interviews and public filings were removed from every reader’s view.',
  },
  {
    title: 'Automatic transcripts',
    body: 'Both transcripts were produced automatically from the audio and nobody has reviewed them. They keep filler words and may mishear names and figures. The speaker labels, host or guest, are inferred from the audio and can be wrong. This is the raw first pass. A second AI pass corrects it and scores its reliability, and a person can spot-check only the uncertain words: sign in to see them.',
  },
  {
    title: 'Quotes only',
    body: 'Ask answers with literal quotes. The server checks that every quotation is exact, and the browser rejects malformed citations and mismatched identities. Claims and quotes are plain, selectable text, and each links to the exact transcript excerpt, with its speaker, the podcast, the interview date and the position in the episode. Whether a quote really supports its claim is a judgement left to the reader, which is why the link is always there.',
  },
  {
    title: 'No data, no answer',
    body: 'When no quote in the two interviews answers a question, Ask says so instead of guessing: “No quote in these two interviews answers this.” A failed search or a provider error is shown as an error, never as that message. The two cases are kept apart on purpose.',
  },
  {
    title: 'Access and current versions',
    body: 'Database row-level security decides which interviews a signed-in member may read, before any excerpt leaves the database. Every deep link is authorized again when it opens, and an excerpt that is missing or not allowed shows the same neutral unavailable state. A saved answer can be reopened to check whether each quoted transcript version is still the current one.',
  },
  {
    title: 'A small sample',
    body: 'Two interviews with the chief executives of two companies. That is enough to show the workflow and the quote checking, not enough to judge coverage or accuracy. The transcripts were checked against two independent recognisers (Whisper large-v3 and YouTube captions): the AI final differs from Whisper on 18% fewer words than the raw pass. That is agreement between machines, not a human-verified accuracy figure.',
  },
  {
    title: 'Local MCP',
    body: 'The local stdio server exposes exactly two read-only tools, search_research and fetch_passage, over the same two interviews. Both use an ordinary member session and the browser’s research endpoint, so the browser and the tools reach the same excerpts and the same access decisions.',
  },
]
