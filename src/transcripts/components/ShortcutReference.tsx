import { shortcutItems } from '../review/shortcutItems'

/** Collapsed list of the review keys; hidden on phones, which have no keyboard. */
export function ShortcutReference() {
  return (
    <details className="group mt-2 hidden text-xs text-muted-foreground md:block">
      <summary className="cursor-pointer select-none underline-offset-4 hover:text-foreground hover:underline">
        Shortcuts
      </summary>
      <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 lg:grid-cols-4">
        {shortcutItems.map((item) => (
          <li key={item.action} className="flex items-center gap-2">
            <span className="flex gap-1">
              {item.keys.map((key) => (
                <kbd key={key} className="kbd">
                  {key}
                </kbd>
              ))}
            </span>
            {item.action}
          </li>
        ))}
      </ul>
    </details>
  )
}
