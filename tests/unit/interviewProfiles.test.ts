import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { requireValue } from '../assertions/requireValue.ts'
import { NormalisedInterviewSchema } from '../helpers/NormalisedInterviewSchema.ts'

// src/ is typed for the browser, so the profile constants are read as text and
// compared with the frozen normalised transcripts they describe.
describe('interview profiles', () => {
  const source = readFileSync('src/workspace/interviewProfiles.ts', 'utf8')
  const documents = [
    NormalisedInterviewSchema.parse(
      JSON.parse(readFileSync('corpus/normalised/pod-roche-2024.json', 'utf8')),
    ),
    NormalisedInterviewSchema.parse(
      JSON.parse(
        readFileSync('corpus/normalised/pod-novartis-2025.json', 'utf8'),
      ),
    ),
  ]

  it.each(documents.map((document) => [document.documentId, document]))(
    'matches the transcript of %s',
    (_id, document) => {
      const first = requireValue(document.passages[0])
      const guestTurn = requireValue(
        document.passages.find((p) => p.speaker === document.operatorName),
      )
      expect(source).toContain(`'${document.documentId}': {`)
      expect(source).toContain(`guest: '${document.operatorName}'`)
      expect(source).toContain(`guestRole: '${guestTurn.speakerRole}'`)
      expect(source).toContain(`host: '${document.moderatorName}'`)
      expect(source).toContain(`firstPassageId: '${first.passageId}'`)
    },
  )
})
