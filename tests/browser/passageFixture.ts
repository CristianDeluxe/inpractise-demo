/** One complete passage, shaped exactly as the research service returns it. */
export function passageFixture() {
  return {
    citationId: 'northstar:rev-1:P2',
    documentId: 'northstar',
    revisionId: 'rev-1',
    passageId: 'P2',
    quote:
      'For complex installations, migration requires rebuilding integrations and retraining teams.',
    startChar: 0,
    endChar: 91,
    title: 'Northstar: implementation constraints',
    company: 'Northstar Workflow',
    origin: 'synthetic',
    kind: 'synthetic_interview',
    speaker: 'Mara Vellorin (fictional)',
    speakerRole: 'Former implementation lead',
    interviewDate: '2026-08-04',
    publishedAt: '2026-08-06T09:00:00Z',
    sourceUrl: null,
    readerPath: '/read/northstar/rev-1/P2',
  }
}
