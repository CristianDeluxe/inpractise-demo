import type { InvestigateStage } from '@/api/InvestigateStage'

/** What each phase of the bounded research loop did, in the numbers the
 * server reported for it, exactly when it reported them. */
export function investigationStageLabel(stage: InvestigateStage): string {
  switch (stage.phase) {
    case 'debited':
      return 'Allowance debited'
    case 'plan':
      return `Planned ${String(stage.subQuestions.length)} sub-question${
        stage.subQuestions.length === 1 ? '' : 's'
      }`
    case 'retrieve':
      return `Step ${String(stage.step)}: ${String(stage.selectedCount)} of ${String(
        stage.candidateCount,
      )} candidates kept (${stage.mode === 'hybrid' ? 'hybrid' : 'lexical only'})`
    case 'refine':
      return `Step ${String(stage.step)} reformulated: "${stage.question}" (${String(
        stage.selectedCount,
      )} kept)`
    case 'synthesise':
      return `Synthesising from ${String(stage.suppliedCount)} passages across ${String(
        stage.subQuestionCount,
      )} sub-questions`
  }
}
