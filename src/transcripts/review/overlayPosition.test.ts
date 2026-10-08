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

  it('puts the decision bar in the margin level with the mark, under the console, and hides it off screen', () => {
    const viewport = { height: 900, floor: 200 }
    const mark = { left: 300, columnRight: 1000 }
    expect(
      decisionBarPosition({ ...mark, top: 500, bottom: 520 }, 148, viewport),
    ).toEqual({ left: 1008, top: 494 })
    expect(
      decisionBarPosition({ ...mark, top: 190, bottom: 210 }, 148, viewport),
    ).toEqual({ left: 1008, top: 200 })
    expect(
      decisionBarPosition({ ...mark, top: 880, bottom: 898 }, 148, viewport),
    ).toEqual({ left: 1008, top: 744 })
    expect(
      decisionBarPosition({ ...mark, top: 150, bottom: 170 }, 148, viewport),
    ).toBeNull()
    expect(
      decisionBarPosition({ ...mark, top: 950, bottom: 970 }, 148, viewport),
    ).toBeNull()
  })
})
