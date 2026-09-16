// @vitest-environment jsdom
import { diagnosticsFixture } from '@/app/diagnosticsFixture'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { RecentRequests } from './RecentRequests'

afterEach(cleanup)

it('shows the empty state when nothing was recorded', () => {
  render(<RecentRequests requests={[]} />)
  expect(screen.getByText(/No requests recorded yet/)).toBeTruthy()
  expect(screen.queryByRole('table')).toBeNull()
})

it('opens an ask row to its revisions and closes it again', () => {
  render(
    <RecentRequests
      requests={[
        {
          requestId: 'ask',
          recordedAt: '2026-09-14T10:00:00Z',
          totalTokens: 1200,
          diagnostics: diagnosticsFixture,
        },
      ]}
    />,
  )
  const row = screen.getByRole('row', { name: /Ask/ })
  expect(row.getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(row)
  expect(row.getAttribute('aria-expanded')).toBe('true')
  expect(screen.getByText('Revisions read')).toBeTruthy()
  expect(screen.getByText('Close')).toBeTruthy()
  fireEvent.click(row)
  expect(screen.queryByText('Revisions read')).toBeNull()
})

it('opens a compare row to both sides, and an unrecorded row to a notice', () => {
  render(
    <RecentRequests
      requests={[
        {
          requestId: 'compare',
          recordedAt: '2026-09-14T09:00:00Z',
          totalTokens: null,
          diagnostics: {
            interviews: diagnosticsFixture,
            filings: { ...diagnosticsFixture, revisionIds: ['rev-filing'] },
          },
        },
        {
          requestId: 'none',
          recordedAt: '2026-09-14T08:00:00Z',
          totalTokens: null,
          diagnostics: null,
        },
      ]}
    />,
  )
  fireEvent.click(screen.getByRole('row', { name: /Compare/ }))
  expect(screen.getByText('Interviews')).toBeTruthy()
  expect(screen.getByText('Filings')).toBeTruthy()
  fireEvent.click(screen.getByRole('row', { name: /Unrecorded/ }))
  expect(screen.getByText(/No diagnostic record/)).toBeTruthy()
})
