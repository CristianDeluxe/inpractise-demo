import type { ShortcutItem } from './ShortcutItem'

/** The review keys, in the order the reference lists them. */
export const shortcutItems: readonly ShortcutItem[] = [
  { keys: ['p'], action: 'play / pause' },
  { keys: ['['], action: 'back 2 s' },
  { keys: [']'], action: 'forward 2 s' },
  { keys: ['e'], action: "replay the selected edit's audio" },
  { keys: ['n'], action: 'next pending edit' },
  { keys: ['j', 'k'], action: 'next / previous flagged paragraph' },
  { keys: ['a'], action: 'accept' },
  { keys: ['r'], action: 'reject' },
]
