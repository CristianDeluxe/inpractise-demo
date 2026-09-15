import type { AskStage } from '@/api/AskStage'

/** What each phase did, in the numbers the server reported for it. */
export function stageLabel(stage: AskStage): string {
  switch (stage.phase) {
    case 'debited':
      return 'Allowance debited'
    case 'retrieved':
      return `${String(stage.candidateCount)} candidates ranked (${
        stage.mode === 'hybrid' ? 'hybrid' : 'lexical only'
      })`
    case 'selected':
      return stage.selectedCount === stage.suppliedCount
        ? `${String(stage.selectedCount)} passages selected, ${String(stage.selectedTokens)} tokens of context`
        : `${String(stage.selectedCount)} selected, ${String(stage.suppliedCount)} still readable at fetch time`
    case 'generating':
      return `Generating from ${String(stage.suppliedCount)} passages`
    case 'verifying':
      return `Rereading ${String(stage.citationCount)} citations with your credentials`
  }
}
