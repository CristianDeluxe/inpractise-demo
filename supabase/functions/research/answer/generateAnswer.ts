import type { CitationSource } from '../citations/CitationSource.ts'
import { parseProviderAnswer } from './parseProviderAnswer.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'
import { requestCompletion } from './requestCompletion.ts'

/** Generates one grounded answer and validates it against its schema. */
export async function generateAnswer(
  query: string,
  sources: readonly CitationSource[],
  onUsage: (usage: unknown) => Promise<void>,
): Promise<ProviderAnswer> {
  return parseProviderAnswer(await requestCompletion(query, sources, onUsage))
}
