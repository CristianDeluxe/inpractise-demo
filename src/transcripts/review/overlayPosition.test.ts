import { describe, expect, it } from 'vitest'
import { decisionBarPosition } from './decisionBarPosition'
import { hoverCardPosition } from './hoverCardPosition'

describe('overlay positions', () => {
  it('keeps the hover card inside a viewport narrower than the card', () => {
    const style = hoverCardPosition(
      { editId: 'e1', top: 400, bottom: 420, left: 200 },
      352,
      { width: 320, height: 640 },
    )
    expect(style.left).toBe(16)
  })

  it('places the hover card above the mark when there is room, else below', () => {
    const viewport = { width: 1440, height: 900 }
    expect(
      hoverCardPosition(
        { editId: 'e1', top: 500, bottom: 520, left: 300 },
        352,
        viewport,
      ),
    ).toEqual({ left: 288, bottom: 410 })
    expect(
      hoverCardPosition(
        { editId: 'e1', top: 200, bottom: 220, left: 300 },
        352,
        viewport,
      ),
    ).toEqual({ left: 288, top: 230 })
  })

  it('puts the decision bar above the mark, below it near the top, and hides it off screen', () => {
    const viewport = { width: 1440, height: 900 }
    expect(
      decisionBarPosition({ top: 500, bottom: 520, left: 1400 }, 296, viewport),
    ).toEqual({ left: 1128, bottom: 406 })
    expect(
      decisionBarPosition({ top: 200, bottom: 220, left: 40 }, 296, viewport),
    ).toEqual({ left: 36, top: 226 })
    expect(
      decisionBarPosition({ top: -60, bottom: -40, left: 20 }, 296, viewport),
    ).toBeNull()
    expect(
      decisionBarPosition({ top: 950, bottom: 970, left: 20 }, 296, viewport),
    ).toBeNull()
  })
})
