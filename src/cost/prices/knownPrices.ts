import { claudeSonnet5Price } from './claudeSonnet5Price'
import { gpt41MiniPrice } from './gpt41MiniPrice'
import { gpt41NanoPrice } from './gpt41NanoPrice'
import type { ModelPrice } from './ModelPrice'
import { textEmbedding3SmallPrice } from './textEmbedding3SmallPrice'

/** Every price this app can show; a model missing here is shown as tokens only. */
export const knownPrices: readonly ModelPrice[] = [
  claudeSonnet5Price,
  gpt41MiniPrice,
  gpt41NanoPrice,
  textEmbedding3SmallPrice,
]
