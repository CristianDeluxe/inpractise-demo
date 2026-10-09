// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MeasuredQuality } from './MeasuredQuality'

afterEach(cleanup)

describe('MeasuredQuality', () => {
  it('shows the measured agreement of a measured episode', () => {
    render(<MeasuredQuality transcriptId="LQ6lAvNMjPE" />)
    expect(screen.getByText('2.74% (raw 3.36%)')).toBeTruthy()
    expect(screen.getByText('29 / 5 / 14')).toBeTruthy()
    expect(screen.getByText(/not a\s+human-verified transcript/)).toBeTruthy()
  })

  it('renders nothing for an episode that was not measured', () => {
    const { container } = render(<MeasuredQuality transcriptId="unknown" />)
    expect(container.textContent).toBe('')
  })
})
