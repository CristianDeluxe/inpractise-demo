export const corpusLimitations = [
  'The six accepted synthetic documents retain their frozen cores; new expanded drafts require owner semantic review before import.',
  'No vector embeddings; lexical_only.',
  'Gold core paragraphs and short source paragraphs remain below 100 tokens rather than being padded or merged across speakers.',
  'SEC approval is recorded in corpus/review/approvals.json and binds the accepted revision and file hash to the unchanged reviewed public document.',
  'The annual-report PDF narrative is a heading- and position-based extraction of the strategic report; it is not a full-text index of the report.',
]
