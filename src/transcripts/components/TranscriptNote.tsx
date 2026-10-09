import { transcriptDisclosure } from '../review/transcriptDisclosure'
import { DisclosureNotice } from './DisclosureNotice'
import { TranscriptMeta } from './TranscriptMeta'
import type { TranscriptNoteProps } from './TranscriptNoteProps'

/** Where the episode came from and what kind of text this is, under the title. */
export function TranscriptNote({
  transcript,
  correction,
}: TranscriptNoteProps) {
  return (
    <>
      <TranscriptMeta source={transcript.source} />
      <DisclosureNotice
        text={transcriptDisclosure(correction?.model ?? null)}
      />
    </>
  )
}
