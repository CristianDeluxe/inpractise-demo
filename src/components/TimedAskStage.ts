import type { AskStage } from '@/api/AskStage'

/** An ask stage that carries its server-side duration. */
export type TimedAskStage = AskStage & { elapsedMs: number }
