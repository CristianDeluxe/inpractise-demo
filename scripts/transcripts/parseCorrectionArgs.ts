import { parseArgs } from 'node:util'
import { assertYoutubeId } from './assertYoutubeId.ts'
import type { CorrectionOptions } from './CorrectionOptions.ts'
import { defaultOpenAiModel } from './defaultOpenAiModel.ts'
import { toPositiveInteger } from './toPositiveInteger.ts'
import { toProvider } from './toProvider.ts'

export function parseCorrectionArgs(
  argv: readonly string[],
): CorrectionOptions {
  const { values, positionals } = parseArgs({
    args: [...argv],
    allowPositionals: true,
    options: {
      provider: { type: 'string', default: 'max-lane' },
      model: { type: 'string' },
      limit: { type: 'string' },
      concurrency: { type: 'string' },
    },
  })
  const provider = toProvider(values.provider)
  const fallbackModel =
    provider === 'openai'
      ? (process.env['OPENAI_CORRECTION_MODEL'] ?? defaultOpenAiModel)
      : 'claude-sonnet-5'
  return {
    id: assertYoutubeId(positionals[0]),
    provider,
    model: values.model ?? fallbackModel,
    limit: toPositiveInteger(values.limit, '--limit'),
    concurrency: toPositiveInteger(values.concurrency, '--concurrency') ?? 4,
  }
}
