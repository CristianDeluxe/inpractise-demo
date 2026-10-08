/**
 * The speaker a passage is attributed to. A public filing speaks as its
 * company; a podcast and a synthetic interview both name the person, the
 * moderator or host on one side and the operator or guest on the other.
 */
export function passageSpeaker(document, turn) {
  if (document.origin === 'public' && document.kind !== 'public_interview')
    return document.company
  return turn.speaker === 'Moderator'
    ? document.moderatorName
    : document.operatorName
}
