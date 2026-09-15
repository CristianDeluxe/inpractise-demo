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

describe('landing motion lifecycle', () => {
  it('does not start canvas work when reduced motion is requested', () => {
    motionPreferenceFixture(true)
    const context = vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
    const frame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    render(<ParticleField />)
    expect(context).not.toHaveBeenCalled()
    expect(frame).not.toHaveBeenCalled()
  })
  it('stops and restarts the particle loop on preference changes and cleans up on unmount', () => {
    const changeMotion = motionPreferenceFixture()
    const context = canvasContextFixture()
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const frame = vi.fn().mockReturnValue(9)
    const cancel = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    vi.stubGlobal('cancelAnimationFrame', cancel)
    const view = render(<ParticleField />)
    expect(context.arc).toHaveBeenCalled()
    expect(context.stroke).toHaveBeenCalled()
    expect(frame).toHaveBeenCalledTimes(1)
    fireEvent(window, new Event('resize'))
    expect(context.setTransform).toHaveBeenCalledTimes(2)
    changeMotion(true)
    expect(cancel).toHaveBeenCalledWith(9)
    changeMotion(false)
    expect(frame).toHaveBeenCalledTimes(2)
    view.unmount()
    expect(cancel).toHaveBeenCalledTimes(2)
    fireEvent(window, new Event('resize'))
    expect(context.setTransform).toHaveBeenCalledTimes(3)
  })
  it('leaves a static hero if a canvas context is unavailable', () => {
    motionPreferenceFixture()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const frame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    render(<ParticleField />)
    expect(frame).not.toHaveBeenCalled()
  })
})
