// @vitest-environment jsdom
import { Parallax } from '@/public/Parallax'
import { ParticleField } from '@/public/ParticleField'
import { Reveal } from '@/public/Reveal'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { canvasContextFixture } from './canvasContextFixture'
import { motionPreferenceFixture } from './motionPreferenceFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('landing motion lifecycle', () => {
  it('does not start canvas or parallax work when reduced motion is requested', () => {
    motionPreferenceFixture(true)
    const context = vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
    const frame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    render(
      <>
        <ParticleField />
        <Parallax>Desk artwork</Parallax>
        <Reveal>Evidence</Reveal>
      </>,
    )
    expect(context).not.toHaveBeenCalled()
    expect(frame).not.toHaveBeenCalled()
    expect(screen.getByText('Desk artwork').style.transform).toBe('')
    expect(screen.getByText('Evidence').dataset['visible']).toBe('true')
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
  it('removes the parallax transform and scroll work when reduced motion becomes active', () => {
    const changeMotion = motionPreferenceFixture()
    const frame = vi.fn().mockReturnValue(7)
    const cancel = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    vi.stubGlobal('cancelAnimationFrame', cancel)
    render(<Parallax>Moving desk</Parallax>)
    expect(screen.getByText('Moving desk').style.transform).toContain(
      'translate3d',
    )
    fireEvent.scroll(window)
    fireEvent.scroll(window)
    expect(frame).toHaveBeenCalledTimes(1)
    changeMotion(true)
    expect(cancel).toHaveBeenCalledWith(7)
    expect(screen.getByText('Moving desk').style.transform).toBe('')
    fireEvent.scroll(window)
    expect(frame).toHaveBeenCalledTimes(1)
  })
  it('shows evidence immediately when IntersectionObserver is unavailable', () => {
    motionPreferenceFixture()
    vi.stubGlobal('IntersectionObserver', undefined)
    render(<Reveal>Available evidence</Reveal>)
    expect(screen.getByText('Available evidence').dataset['visible']).toBe(
      'true',
    )
  })
})
