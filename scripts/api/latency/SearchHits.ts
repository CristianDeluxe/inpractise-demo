import type { ReadTarget } from './ReadTarget.ts'

/** The part of a search response the read measurement needs. */
export type SearchHits = { items?: ReadTarget[] }
