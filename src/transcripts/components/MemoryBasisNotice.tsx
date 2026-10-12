import type { MemoryBasisNoticeProps } from './MemoryBasisNoticeProps'

/** Says plainly that no person vouched for reference-confirmed entries. */
export function MemoryBasisNotice({ count }: MemoryBasisNoticeProps) {
  if (count === 0) return null
  return (
    <p className="prose-measure mt-3 text-sm text-muted-foreground">
      No one has reviewed these episodes yet. {count} of the entries below come
      from AI edits that independent references confirm: YouTube captions,
      Whisper large-v3 and an acoustic rescoring, the same measurement each
      transcript shows under Independent check. They are marked References. A
      correction a reviewer accepts is marked Reviewer and replaces that basis.
    </p>
  )
}
