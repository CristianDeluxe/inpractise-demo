import type { HeroAnswerRecord } from './HeroAnswerRecord'

// Gold case G01 from evals/gold.json, answered in both retained live runs
// (evals/report-run-2.json). The citation is the frozen passage s1:P2 exactly
// as the corpus indexes it: tests/unit/heroAnswer.test.ts checks the quote,
// the identifiers, the speaker and the dates against corpus/normalised/s1.json,
// so the first screen cannot drift from the evidence it claims to show.
export const heroAnswer: HeroAnswerRecord = {
  caseId: 'G01',
  recordedOn: '2026-09-13',
  question: 'What makes a complex Northstar installation difficult to migrate?',
  claim:
    'Migrating a complex installation means rebuilding integrations and retraining teams.',
  citation: {
    citationId:
      's1:ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94:P2',
    documentId: 's1',
    revisionId:
      'ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94',
    passageId: 'P2',
    quote:
      'For complex installations, migration requires rebuilding integrations and retraining teams.',
    startChar: 0,
    endChar: 91,
    title: 'Northstar: implementation constraints',
    company: 'northstar-workflow',
    origin: 'synthetic',
    kind: 'synthetic_interview',
    speaker: 'Mara Vellorin (fictional)',
    speakerRole: 'Former implementation lead, left 2025-12-31',
    interviewDate: '2026-08-04',
    publishedAt: '2026-08-06T09:00:00Z',
    sourceUrl: null,
    readerPath:
      '/read/s1/ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94/P2',
  },
}
