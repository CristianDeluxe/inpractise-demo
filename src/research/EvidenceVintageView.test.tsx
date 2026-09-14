// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { EvidenceVintageView } from './EvidenceVintageView'

afterEach(() => {
  cleanup()
})

describe('EvidenceVintageView', () => {
  it('states the span and the age of the oldest source', () => {
    render(
      <EvidenceVintageView
        vintage={{
          oldest: '2024-09-14',
          newest: '2026-08-12',
          oldestAgeDays: 730,
          newestAgeDays: 33,
        }}
      />,
    )
    expect(screen.getByText(/2024-09-14/u)).toBeDefined()
    expect(screen.getByText(/24 months old/u)).toBeDefined()
  })

  it('warns when even the newest source is over a year old', () => {
    render(
      <EvidenceVintageView
        vintage={{
          oldest: '2023-01-01',
          newest: '2024-01-01',
          oldestAgeDays: 1352,
          newestAgeDays: 987,
        }}
      />,
    )
    expect(screen.getByRole('status').textContent).toContain(
      'Every source is over a year old',
    )
  })
})
