export const mcpTools = [
  {
    name: 'search_research',
    input: 'query, company?, limit?',
    output:
      'Ranked authorized passages with immutable citations. Calls the same search action as the browser.',
  },
  {
    name: 'fetch_passage',
    input: 'documentId, revisionId, passageId',
    output:
      'One exact passage and adjacent passage IDs. Calls the same read action as the browser.',
  },
]
