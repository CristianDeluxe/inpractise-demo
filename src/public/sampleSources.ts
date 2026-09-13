export const sampleSources = [
  {
    company: 'Northstar Workflow',
    disclosure: 'Synthetic interview — fictional company and speaker',
    documentId: 's1',
    interviewDate: '2026-08-04',
    publishedAt: '2026-08-06T09:00:00Z',
    revisionId:
      'ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94',
    title: 'Northstar: implementation constraints',
    passages: [
      {
        passageId: 'P2',
        speaker: 'Mara Vellorin (fictional)',
        speakerRole: 'Former implementation lead, left 2025-12-31',
        text: 'For complex installations, migration requires rebuilding integrations and retraining teams.',
      },
      {
        passageId: 'P3',
        speaker: 'Mara Vellorin (fictional)',
        speakerRole: 'Former implementation lead, left 2025-12-31',
        text: 'I worked on enterprise projects until December 2025. I cannot speak for product changes after I left.',
      },
      {
        passageId: 'P4',
        speaker: 'Mara Vellorin (fictional)',
        speakerRole: 'Former implementation lead, left 2025-12-31',
        text: 'I did not measure customer retention or the average cost of switching.',
      },
    ],
  },
  {
    company: 'Northstar Workflow',
    disclosure: 'Synthetic interview — fictional company and speaker',
    documentId: 's2',
    interviewDate: '2026-08-12',
    publishedAt: '2026-08-14T09:00:00Z',
    revisionId:
      '1caaa72427cb82f575bb3a7410b2a9c00f32bd07d16d78a5581d077783aa8dc8',
    title: "Northstar: a small customer's migration",
    passages: [
      {
        passageId: 'P2',
        speaker: 'Elian Corvessa (fictional)',
        speakerRole: 'Small-business customer',
        text: 'Our small deployment moved in six weeks because we used only standard connectors.',
      },
      {
        passageId: 'P3',
        speaker: 'Elian Corvessa (fictional)',
        speakerRole: 'Small-business customer',
        text: 'We had twelve users and did not maintain custom integrations. This was one migration, not a representative survey.',
      },
      {
        passageId: 'P4',
        speaker: 'Elian Corvessa (fictional)',
        speakerRole: 'Small-business customer',
        text: 'I cannot estimate how an enterprise deployment would compare.',
      },
    ],
  },
] as const
