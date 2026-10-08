import type { ShortcutItem } from './ShortcutItem'

/** The review keys, in the order the reference lists them. */
export const shortcutItems: readonly ShortcutItem[] = [
  { keys: ['p'], action: 'play / pause' },
  { keys: ['[', ']'], action: 'back / forward 2 s' },
  { keys: ['e'], action: 'replay selected edit' },
  { keys: ['l'], action: 'loop selected edit' },
  { keys: ['n'], action: 'next pending edit' },
  { keys: ['j', 'k'], action: 'next / previous passage' },
  { keys: ['a'], action: 'accept' },
  { keys: ['r'], action: 'reject' },
  { keys: ['f'], action: 'flag for later' },
  { keys: ['u'], action: 'undo last decision' },
]
