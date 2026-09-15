import type { InvestigateStage } from '@/api/InvestigateStage'

/** One of every phase, in the order the server emits them: a plan of two
 * sub-questions, one plain retrieval, one refinement, then synthesis. */
export function investigationStagesFixture(): InvestigateStage[] {
  return [
    { phase: 'debited', elapsedMs: 40 },
    {
      phase: 'plan',
      elapsedMs: 620,
      subQuestions: [
        { index: 1, question: 'What did northstar say about pricing?' },
        {
          index: 2,
          question: 'What did harbor-logistics say about pricing?',
          company: 'harbor-logistics',
        },
      ],
    },
    {
      phase: 'retrieve',
      step: 1,
      elapsedMs: 1800,
      mode: 'hybrid',
      candidateCount: 12,
      selectedCount: 4,
      suppliedCount: 4,
      selectedTokens: 900,
    },
    {
      phase: 'refine',
      step: 2,
      elapsedMs: 3100,
      question: 'What did harbor-logistics disclose about pricing terms?',
      mode: 'lexical_only',
      candidateCount: 3,
      selectedCount: 1,
      suppliedCount: 1,
      selectedTokens: 200,
    },
    {
      phase: 'synthesise',
      elapsedMs: 4200,
      suppliedCount: 5,
      subQuestionCount: 2,
    },
  ]
}
