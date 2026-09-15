/** Section 6.2 does not freeze this action's JSON layout; T must come from its backend runtime schema. */
export type NoteSaveData<T extends Record<string, unknown>> = T
