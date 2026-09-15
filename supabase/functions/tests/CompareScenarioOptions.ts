import type { CompareFixtureSides } from './CompareFixtureSides.ts'

export type CompareScenarioOptions = {
  completion?: () => Promise<Response>
  sides?: CompareFixtureSides
}
