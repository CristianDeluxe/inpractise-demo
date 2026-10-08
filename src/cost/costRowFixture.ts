import type { CostRow } from './CostRow'

export function costRowFixture(overrides: Partial<CostRow> = {}): CostRow {
  return {
    id: 'synthetic-1',
    title: 'Synthetic briefing',
    audioSeconds: 3600,
    proposedEdits: 10,
    decidedEdits: 8,
    reviewerSeconds: 1200,
    minutesPerAudioHour: 20,
    ...overrides,
  }
}
