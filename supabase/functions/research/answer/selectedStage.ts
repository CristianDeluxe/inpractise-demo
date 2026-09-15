import type { AskStage } from './AskStage.ts'
import type { SelectedStageInput } from './SelectedStageInput.ts'

/** What context selection kept, after retrieval narrowed the candidates. */
export function selectedStage(input: SelectedStageInput): AskStage {
  return {
    phase: 'selected',
    selectedCount: input.selectedCount,
    suppliedCount: input.suppliedCount,
    selectedTokens: input.selectedTokens,
    ...(input.detailed ? { selectedIds: input.selectedIds } : {}),
    elapsedMs: input.elapsedMs,
  }
}
