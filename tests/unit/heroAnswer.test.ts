import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { requireValue } from '../assertions/requireValue.ts'
import { NormalisedDocumentSchema } from '../helpers/NormalisedDocumentSchema.ts'

// The landing hero renders one recorded answer statically. Its source file is
// read as text because src/ is typed for the browser; every value it shows
// must be the frozen corpus value, not a paraphrase.
describe('landing hero answer', () => {
  const source = readFileSync('src/public/heroAnswer.ts', 'utf8')
  const document = NormalisedDocumentSchema.parse(
    JSON.parse(readFileSync('corpus/normalised/s1.json', 'utf8')),
  )
  const passage = requireValue(
    document.passages.find((entry) => entry.passageId === 'P2'),
  )

  it('quotes the indexed passage s1:P2 verbatim', () => {
    expect(source).toContain(`'${passage.text}'`)
    expect(source).toContain(`passageId: 'P2'`)
  })

  it('carries the frozen document identity and reader path', () => {
    expect(source).toContain(`documentId: '${document.documentId}'`)
    expect(source).toContain(`'${document.revisionId}'`)
    expect(source).toContain(
      `'/read/${document.documentId}/${document.revisionId}/P2'`,
    )
    expect(source).toContain(`title: '${document.title}'`)
  })

  it('attributes the quotation to the recorded speaker and dates', () => {
    expect(source).toContain(`speaker: '${passage.speaker}'`)
    expect(source).toContain(`speakerRole: '${passage.speakerRole}'`)
    expect(source).toContain(`interviewDate: '${document.interviewDate}'`)
    expect(source).toContain(`publishedAt: '${document.publishedAt}'`)
  })
})
