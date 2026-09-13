export function shortPassageReason(tokenCount, document, turn, fragments) {
  return tokenCount >= 100
    ? null
    : document.origin === 'synthetic' && /^P[1-4]$/.test(turn.paragraphId)
      ? 'immutable_gold_core'
      : turn.speaker === 'Moderator'
        ? 'single_moderator_turn'
        : fragments.length > 1
          ? 'final_source_fragment'
          : 'single_source_paragraph'
}
