import { sectionLabel } from './sectionLabel.mjs'

/**
 * Maps a podcast record's diarized turns onto the normalised turn shape: the
 * host takes the Moderator slot, the guest the operator slot, the role is the
 * person's role and the section is the turn's start time.
 */
export function createPodcastTurns(record) {
  return record.turns.map((turn, index) => {
    const person = turn.role === 'host' ? record.host : record.guest
    return {
      paragraphId: `T${String(index + 1).padStart(3, '0')}`,
      speaker: turn.role === 'host' ? 'Moderator' : 'Guest',
      speakerRole: person.role,
      section: sectionLabel(turn.startSeconds),
      text: turn.text,
    }
  })
}
