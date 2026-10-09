import type { TimedWord } from '../speakers/TimedWord'

/** A turn as far as its timing goes: the words it holds. */
export type TurnWords = { readonly words: readonly TimedWord[] }
