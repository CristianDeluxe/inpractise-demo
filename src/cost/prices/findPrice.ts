import { knownPrices } from './knownPrices'
import type { ModelPrice } from './ModelPrice'
import { snapshotSuffix } from './snapshotSuffix'

/** Matches a model id or a dated snapshot of it; undefined when the price is not confirmed. */
export function findPrice(model: string | null): ModelPrice | undefined {
  if (model === null) return undefined
  return knownPrices.find(
    (price) =>
      model === price.modelId ||
      (model.startsWith(price.modelId) &&
        snapshotSuffix.test(model.slice(price.modelId.length))),
  )
}
