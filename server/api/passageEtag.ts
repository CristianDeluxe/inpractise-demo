import { passageOutput } from '@/http-api/passageOutput.ts'

/**
 * Identity-based tags rely on published passage content and metadata being
 * immutable. Scope must come from the actual read, including viewing restrictions;
 * a document/revision/passage triple alone can collide across organizations.
 */
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
