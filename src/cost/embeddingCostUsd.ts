import { textEmbedding3SmallPrice } from './prices/textEmbedding3SmallPrice'
import { tokenCostUsd } from './prices/tokenCostUsd'

/** One-off cost of embedding a set of passages at the public list price. */
export function embeddingCostUsd(tokens: number): number | undefined {
  return tokenCostUsd(textEmbedding3SmallPrice, tokens, 0)
}
