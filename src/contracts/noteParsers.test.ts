import { citationFixture } from '@/api/citationFixture'
import { describe, expect, it } from 'vitest'
import { parseNoteDeleteData } from './parseNoteDeleteData'
import { parseNoteListData } from './parseNoteListData'
import { parseNoteSaveData } from './parseNoteSaveData'

describe('notebook action parsers', () => {
  const noteId = '00000000-0000-4000-8000-000000000001'
  it('accepts a saved note identity and nothing more', () => {
    expect(
      parseNoteSaveData({ noteId, createdAt: '2026-09-15T10:00:00Z' }).noteId,
    ).toBe(noteId)
    expect(() =>
      parseNoteSaveData({ noteId: 'not-a-uuid', createdAt: 'now' }),
    ).toThrow()
    expect(() =>
      parseNoteSaveData({
        noteId,
        createdAt: 'now',
        quote: 'A copied quotation',
      }),
    ).toThrow()
    expect(parseNoteDeleteData({ noteId }).noteId).toBe(noteId)
    expect(() => parseNoteDeleteData({ noteId, deleted: true })).toThrow()
  })
  it('lists notes with a re-read citation or none, never a stored quote', () => {
    const citation = citationFixture()
    const note = {
      noteId,
      documentId: citation.documentId,
      revisionId: citation.revisionId,
      passageId: citation.passageId,
      question: 'What does the source establish?',
      note: 'Worth keeping.',
      createdAt: '2026-09-15T10:00:00Z',
      citation,
    }
    const parsed = parseNoteListData({
      notes: [note, { ...note, citation: null, question: null, note: null }],
    })
    expect(parsed.notes[0]?.citation?.quote).toBe(citation.quote)
    expect(parsed.notes[1]?.citation).toBeNull()
    expect(() =>
      parseNoteListData({ notes: [{ ...note, quote: 'Stored copy' }] }),
    ).toThrow()
    expect(() =>
      parseNoteListData({
        notes: [{ ...note, citation: { ...citation, quote: '' } }],
      }),
    ).toThrow()
    expect(() =>
      parseNoteListData({ notes: Array.from({ length: 201 }, () => note) }),
    ).toThrow()
  })
})
