import { ShortcutKeyList } from './ShortcutKeyList'

/** Compact always-visible key map for the desktop inspector. */
export function KeysCard() {
  return (
    <section aria-label="Keyboard shortcuts" className="lab-card p-3">
      <h2 className="eyebrow mb-2 text-muted-foreground">Keys</h2>
      <ShortcutKeyList />
    </section>
  )
}
