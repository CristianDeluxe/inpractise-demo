export type ParentLockHooks = {
  hold?: Promise<unknown>
  onLocked?: () => void
}
