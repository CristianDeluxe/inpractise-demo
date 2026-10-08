export const mcpTools = [
  {
    name: 'search_research',
    input: 'query, company?, limit?',
    output:
      'Ranked transcript excerpts from the two public podcast interviews, with immutable citations. Calls the same search action as the browser.',
  },
  {
    name: 'fetch_passage',
    input: 'documentId, revisionId, passageId',
    output:
      'One exact transcript excerpt and the IDs of the excerpts next to it. Calls the same read action as the browser.',
  },
]
