// The four figures the landing page shows about the corpus behind the demo.
// They are not decorative: tests/unit/demoCorpusStats.test.ts recomputes each
// one from corpus/manifest.json, so a corpus change that is not reflected here
// fails the suite rather than leaving a stale number on the first screen.
export const demoCorpusStats = [
  { label: 'Synthetic interviews', value: '6' },
  { label: 'Public filings', value: '4' },
  { label: 'Indexed passages', value: '962' },
  { label: 'Companies covered', value: '5' },
] as const
