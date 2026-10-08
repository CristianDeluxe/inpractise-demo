import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit.ts'

/** An edit before its stable id is assigned. */
export type CorrectionEditDraft = Omit<CorrectionEdit, 'id'>
