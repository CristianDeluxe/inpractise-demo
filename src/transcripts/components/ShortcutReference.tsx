import { ShortcutKeyList } from './ShortcutKeyList'

/** Collapsed list of the review keys for md..lg; phones have no keyboard and lg shows the inspector card. */
export function ShortcutReference() {
  return (
    <details className="group hidden text-xs text-muted-foreground md:block lg:hidden">
      <summary className="cursor-pointer select-none underline-offset-4 hover:text-foreground hover:underline">
        Shortcuts
      </summary>
      <div className="mt-2">
        <ShortcutKeyList />
      </div>
    </details>
  )
}
