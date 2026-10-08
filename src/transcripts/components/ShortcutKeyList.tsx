import { shortcutItems } from '../review/shortcutItems'

/** The review key map as kbd + action rows, shared by the inspector card and the disclosure. */
export function ShortcutKeyList() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
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
  )
}
