import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { correctionJsonSchema } from './correctionJsonSchema.ts'
import { MaxLaneEnvelopeSchema } from './MaxLaneEnvelopeSchema.ts'
import { maxLaneRunPath } from './maxLaneRunPath.ts'
import type { ProviderRequest } from './ProviderRequest.ts'
import type { ProviderResult } from './ProviderResult.ts'
import { runWithInput } from './runWithInput.ts'

/** The local Claude subscription lane: prompt on stdin, one JSON line out. */
export async function callMaxLane(
  request: ProviderRequest,
): Promise<ProviderResult> {
  const dir = mkdtempSync(join(tmpdir(), 'max-lane-'))
  try {
    const schemaPath = join(dir, 'schema.json')
    writeFileSync(schemaPath, JSON.stringify(correctionJsonSchema()))
    const stdout = await runWithInput(
      process.execPath,
      [
        maxLaneRunPath(),
        '--model',
        request.model,
        '--max-tokens',
        '16000',
        '--schema',
        schemaPath,
      ],
      `${request.instructions}\n\n${request.prompt}`,
    )
    const envelope = MaxLaneEnvelopeSchema.parse(JSON.parse(stdout.trim()))
    return {
      answer: envelope.answer,
      usage: {
        inputTokens: envelope.usage.input_tokens,
        outputTokens: envelope.usage.output_tokens,
      },
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}
