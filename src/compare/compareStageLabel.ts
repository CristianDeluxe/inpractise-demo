import type { CompareStage } from '@/api/CompareStage'

/** What each phase did, in the numbers the server reported for it, split by
 *  side wherever the server retrieved or selected the two sides separately. */
export function compareStageLabel(stage: CompareStage): string {
  switch (stage.phase) {
    case 'debited':
      return 'Allowance debited'
    case 'retrieved':
      return `${String(stage.interviewCandidates)} interview and ${String(stage.filingCandidates)} filing candidates ranked (${
        stage.mode === 'hybrid' ? 'hybrid' : 'lexical only'
      })`
    case 'selected':
      return `${String(stage.interviewCount)} interview and ${String(stage.filingCount)} filing passages selected, ${String(stage.selectedTokens)} tokens of context`
    case 'generating':
      return `Generating from ${String(stage.suppliedCount)} passages`
    case 'verifying':
      return `Rereading ${String(stage.citationCount)} citations with your credentials`
  }
}
