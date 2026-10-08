import type { EditStatus } from './EditStatus'

/** How many model edits ended in each state; an edit that could not be placed in the text counts as uncertain. */
export type EditCounts = Readonly<Record<EditStatus, number>>
