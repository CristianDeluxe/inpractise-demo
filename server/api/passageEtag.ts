import { passageOutput } from '@/http-api/passageOutput.ts'

export function passageEtag(data: unknown, readScope: string): string {
  const { citation } = passageOutput.parse(data)
  const identity = JSON.stringify([
    readScope,
    citation.documentId,
    citation.revisionId,
    citation.passageId,
  ])
  return `"passage-v2-${Buffer.from(identity).toString('base64url')}"`
}
