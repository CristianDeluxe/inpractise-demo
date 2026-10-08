/**
 * accepted and rejected are human decisions; auto is a model edit applied
 * because its confidence reached the auto-accept threshold; uncertain is a
 * model edit below it, left unapplied.
 */
export type EditStatus = 'accepted' | 'rejected' | 'auto' | 'uncertain'
