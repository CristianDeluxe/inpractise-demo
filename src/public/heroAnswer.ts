import type { HeroAnswerRecord } from './HeroAnswerRecord'

// One excerpt of passage T030.1 of pod-roche-2024, copied verbatim.
// tests/unit/heroAnswer.test.ts checks that the quote is a substring of that
// passage in corpus/normalised/pod-roche-2024.json, together with the
// identifiers, the speaker and the date, so the first screen cannot drift
// from the evidence it claims to show. The transcript is automatic, so the
// wording keeps its filler words.
export const heroAnswer: HeroAnswerRecord = {
  question: 'How is Roche using AI in research and development?',
  claim:
    'Roche uses AI to pick the most promising molecules from thousands, so only a handful have to be tested.',
  quote:
    'let AI decide uh among thousands and thousands of molecules, those molecules that have the best attributes, and then you just test a handful of different molecules',
  speaker: 'Thomas Schinecker',
  speakerRole: 'Chief Executive Officer, Roche',
  podcast: 'In Good Company, Norges Bank Investment Management',
  episodeTitle: 'Roche CEO Thomas Schinecker on In Good Company',
  interviewDate: '2024-11-20',
  section: '19:08',
  documentId: 'pod-roche-2024',
  revisionId:
    'de2592af8b23cd5cc39ea9aaa59cdc2ace7f77c54df9e71428ef14b83c1b56bc',
  passageId: 'T030.1',
  readerPath:
    '/read/pod-roche-2024/de2592af8b23cd5cc39ea9aaa59cdc2ace7f77c54df9e71428ef14b83c1b56bc/T030.1',
}
