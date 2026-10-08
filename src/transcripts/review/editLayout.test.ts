// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { correctionFixture } from '../fixtures/correctionFixture'
import { editFixture } from '../fixtures/editFixture'
import { transcriptFixture } from '../fixtures/transcriptFixture'
import { deriveReview } from './deriveReview'
import { editPosition } from './editPosition'
import { pauseAtStop } from './pauseAtStop'
import { reviewKeyAction } from './reviewKeyAction'

describe('edit layout', () => {
  it('orders edits by where they appear and records the audio each rewrites', () => {
    const transcript = transcriptFixture()
    const correction = correctionFixture()
    const derived = deriveReview(transcript, correction)
    expect(derived.edits.map((edit) => edit.id)).toEqual(['e1', 'e2', 'e3'])
    const words = transcript.paragraphs[0]?.words ?? []
    const northwynd = words.find((word) => word.text === 'Northwynd')
    expect(derived.spanById.get('e1')).toEqual({
      start: northwynd?.start,
      end: northwynd?.end,
    })
    expect(editPosition(derived.edits, 'e3')).toBe(3)
    expect(editPosition(derived.edits, 'missing')).toBe(0)
  })

  it('lists an edit that cannot be placed after the placed ones', () => {
    const transcript = transcriptFixture()
    const base = correctionFixture()
    const first = base.paragraphs[0]
    if (first === undefined) throw new Error('fixture')
    const correction = {
      ...base,
      paragraphs: [
        {
          ...first,
          edits: [editFixture('ghost', 'absent', 'x'), ...first.edits],
        },
      ],
    }
    const derived = deriveReview(transcript, correction)
    expect(derived.edits.map((edit) => edit.id)).toEqual(['e1', 'e2', 'ghost'])
    expect(derived.spanById.has('ghost')).toBe(false)
  })

  it('pauses replay once it reaches the stop time', () => {
    const audio = document.createElement('audio')
    const pause = vi.spyOn(audio, 'pause').mockImplementation(() => undefined)
    Object.defineProperty(audio, 'currentTime', { value: 5, writable: true })
    expect(pauseAtStop(audio, null)).toBe(false)
    expect(pauseAtStop(audio, 6)).toBe(false)
    expect(pauseAtStop(audio, 5)).toBe(true)
    expect(pause).toHaveBeenCalledOnce()
  })

  it('maps the review keys to their handlers', () => {
    const handlers = {
      next: vi.fn(),
      previous: vi.fn(),
      accept: vi.fn(),
      reject: vi.fn(),
      defer: vi.fn(),
      undo: vi.fn(),
      nextPending: vi.fn(),
      replay: vi.fn(),
      loop: vi.fn(),
      togglePlay: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    }
    expect(reviewKeyAction(handlers, 'n')).toBe(handlers.nextPending)
    expect(reviewKeyAction(handlers, 'e')).toBe(handlers.replay)
    expect(reviewKeyAction(handlers, 'p')).toBe(handlers.togglePlay)
    expect(reviewKeyAction(handlers, '[')).toBe(handlers.back)
    expect(reviewKeyAction(handlers, ']')).toBe(handlers.forward)
    expect(reviewKeyAction(handlers, 'f')).toBe(handlers.defer)
    expect(reviewKeyAction(handlers, 'u')).toBe(handlers.undo)
    expect(reviewKeyAction(handlers, 'l')).toBe(handlers.loop)
    expect(reviewKeyAction(handlers, 'x')).toBeUndefined()
  })
})
