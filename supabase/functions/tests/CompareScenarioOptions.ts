import type { CompareFixtureSides } from './CompareFixtureSides.ts'

export type CompareScenarioOptions = {
  completion?: () => Promise<Response>
  sides?: CompareFixtureSides
  /** Omit the key, or pass undefined explicitly, to cross-reference across
   * every company the caller may read. */
  company?: string | undefined
}
