// The four figures the landing page shows about the corpus readers can search:
// the public podcast interviews only.
// They are not decorative: tests/unit/demoCorpusStats.test.ts recomputes each
// one from corpus/manifest.json, so a corpus change that is not reflected here
// fails the suite rather than leaving a stale number on the first screen.
export const demoCorpusStats = [
  { label: 'Public podcast interviews', value: '2' },
  { label: 'Minutes of audio', value: '98' },
  { label: 'Transcript excerpts', value: '186' },
  { label: 'Companies covered', value: '2' },
] as const
