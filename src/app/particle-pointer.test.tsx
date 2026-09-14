// @vitest-environment jsdom
import { ParticleField } from '@/public/ParticleField'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { canvasContextFixture } from './canvasContextFixture'
import { motionPreferenceFixture } from './motionPreferenceFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('particle pointer interaction', () => {
  it('highlights near the pointer, resets on leave, and removes listeners when motion stops', () => {
    const changeMotion = motionPreferenceFixture()
    const context = canvasContextFixture()
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const frame = vi
      .fn<(callback: FrameRequestCallback) => number>()
      .mockReturnValue(1)
    vi.stubGlobal('requestAnimationFrame', frame)
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    const remove = vi.spyOn(window, 'removeEventListener')
    const view = render(<ParticleField />)
    expect(context.arc).toHaveBeenLastCalledWith(400, 300, 1.2, 0, Math.PI * 2)
    fireEvent(
      window,
      new MouseEvent('pointermove', { clientX: 400, clientY: 300 }),
    )
    frame.mock.calls[0]?.[0](0)
    expect(context.arc).toHaveBeenLastCalledWith(400, 300, 1.9, 0, Math.PI * 2)
    expect(Reflect.get(context, 'fillStyle')).toBe('rgba(226,132,72,0.85)')
    fireEvent(
      window,
      new MouseEvent('pointermove', { clientX: 540, clientY: 300 }),
    )
    frame.mock.calls[0]?.[0](0)
    expect(context.arc).toHaveBeenLastCalledWith(400, 300, 1.2, 0, Math.PI * 2)
    fireEvent(window, new Event('pointerleave'))
    frame.mock.calls[0]?.[0](0)
    expect(Reflect.get(context, 'fillStyle')).toBe('rgba(226,214,196,0.42)')
    changeMotion(true)
    expect(remove).toHaveBeenCalledWith('pointermove', expect.any(Function))
    expect(remove).toHaveBeenCalledWith('pointerleave', expect.any(Function))
    const calls = frame.mock.calls.length
    fireEvent(
      window,
      new MouseEvent('pointermove', { clientX: 400, clientY: 300 }),
    )
    expect(frame).toHaveBeenCalledTimes(calls)
    view.unmount()
  })
})
