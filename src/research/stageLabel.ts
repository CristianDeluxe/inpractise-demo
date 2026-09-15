import type { AskStage } from '@/api/AskStage'
import { stageTiming } from './stageTiming'

/** What each phase did, in the numbers the server reported for it. */
export function stageLabel(stage: AskStage): string {
  switch (stage.phase) {
    case 'debited':
      return `Allowance debited${stageTiming(stage.elapsedMs)}`
    case 'retrieved':
      return `${String(stage.candidateCount)} candidates ranked (${
        stage.mode === 'hybrid' ? 'hybrid' : 'lexical only'
      })${stageTiming(stage.elapsedMs)}`
    case 'selected':
      return `${
        stage.selectedCount === stage.suppliedCount
          ? `${String(stage.selectedCount)} passages selected, ${String(stage.selectedTokens)} tokens of context`
          : `${String(stage.selectedCount)} selected, ${String(stage.suppliedCount)} still readable at fetch time`
      }${stageTiming(stage.elapsedMs)}`
    case 'generating':
      return `Generating from ${String(stage.suppliedCount)} passages${stageTiming(stage.elapsedMs)}`
    case 'verifying':
      return `Rereading ${String(stage.citationCount)} citations with your credentials${stageTiming(stage.elapsedMs)}`
  }
}
