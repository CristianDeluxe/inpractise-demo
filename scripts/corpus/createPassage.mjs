import { countTokens } from './countTokens.mjs'
import { shortPassageReason } from './shortPassageReason.mjs'

export function createPassage(turn, document, fragment, context) {
  const { fragments, index } = context
  const speaker =
    document.origin === 'public'
      ? document.company
      : turn.speaker === 'Moderator'
        ? document.moderatorName
        : document.operatorName
  const tokenCount = countTokens(fragment.text)
  const metadataTokenCount = countTokens(
    [
      document.title,
      document.company,
      speaker,
      turn.speakerRole,
      turn.section,
    ].join('\n'),
  )
  if (tokenCount + metadataTokenCount > 500)
    throw new Error('PASSAGE_METADATA_BUDGET')
  return {
    passageId:
      fragments.length === 1
        ? turn.paragraphId
        : `${turn.paragraphId}.${index + 1}`,
    paragraphId: turn.paragraphId,
    ordinal: context.ordinal,
    section: turn.section,
    speaker,
    speakerRole: turn.speakerRole,
    speakerKind: turn.speaker,
    text: fragment.text,
    startChar: 0,
    endChar: Array.from(fragment.text).length,
    sourceStartChar: fragment.start,
    sourceEndChar: fragment.end,
    documentStartChar: context.documentOffset + fragment.start,
    documentEndChar: context.documentOffset + fragment.end,
    tokenCount,
    metadataTokenCount,
    shortPassageReason: shortPassageReason(
      tokenCount,
      document,
      turn,
      fragments,
    ),
  }
}
