import type { buildStats } from './buildStats'

// Every half-day the collector emits must have a written theme: a regenerated
// buildStats.ts with a new half-day fails type-check until one is added.
export type BuildHalfDayKey = (typeof buildStats.halfDays)[number]['key']
