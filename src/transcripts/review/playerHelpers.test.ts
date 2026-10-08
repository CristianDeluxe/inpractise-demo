// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { paletteFixture as palette } from '../fixtures/paletteFixture'
import { recordingContext } from '../fixtures/recordingContext'
import { drawWaveform } from './drawWaveform'
import { hoverCardPosition } from './hoverCardPosition'
import { pointerRatio } from './pointerRatio'
import { togglePlayback } from './togglePlayback'

describe('player helpers', () => {
  it('draws played bars in ink, the rest in grey, and the relisten lane on a played and an unplayed track', () => {
    const { context, fills } = recordingContext()
    drawWaveform(context, {
      width: 9,
      height: 48,
      bars: [0.5, 0.5, 0.5],
      progress: 0.3,
      duration: 10,
      relisten: [{ start: 2, end: 3 }],
      palette,
    })
    // Playhead at 30%: the window 2-3 s (20-30%) lies fully behind it.
    expect(fills).toEqual(['ink', 'grey', 'grey', 'faint', 'grey', 'orange'])
  })

  it('draws a progress track without peaks and skips the lane without a duration', () => {
    const { context, fills } = recordingContext()
    drawWaveform(context, {
      width: 100,
      height: 48,
      bars: [],
      progress: 0.5,
      duration: 0,
      relisten: [{ start: 2, end: 3 }],
      palette,
    })
    expect(fills).toEqual(['grey', 'ink'])
  })

  it('pauses a playing element, plays a paused one, and survives a refused play', async () => {
    const playing = { paused: false, pause: vi.fn(), play: vi.fn() }
    await togglePlayback(playing as unknown as HTMLAudioElement)
    expect(playing.pause).toHaveBeenCalled()
    const refused = {
      paused: true,
      pause: vi.fn(),
      play: vi.fn().mockRejectedValue(new Error('NotAllowedError')),
    }
    await togglePlayback(refused as unknown as HTMLAudioElement)
    expect(refused.play).toHaveBeenCalled()
    await expect(togglePlayback(null)).resolves.toBeUndefined()
  })

  it('clamps the pointer inside the element and handles a zero-width box', () => {
    const element = document.createElement('div')
    element.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect
    expect(pointerRatio(150, element)).toBe(0.25)
    expect(pointerRatio(500, element)).toBe(1)
    element.getBoundingClientRect = () => ({ left: 0, width: 0 }) as DOMRect
    expect(pointerRatio(10, element)).toBe(0)
  })

  it('opens the hover card above a low mark and below a high one', () => {
    const viewport = { width: 1440, height: 900 }
    expect(
      hoverCardPosition(
        { editId: 'e', top: 600, bottom: 620, left: 400 },
        352,
        viewport,
      ),
    ).toEqual({ left: 388, bottom: 310 })
    expect(
      hoverCardPosition(
        { editId: 'e', top: 100, bottom: 120, left: 1400 },
        352,
        viewport,
      ),
    ).toEqual({ left: 1072, top: 130 })
  })
})
