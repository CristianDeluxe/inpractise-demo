// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { acceptFirstEdit } from '../fixtures/acceptFirstEdit'
import { labFetchFixture } from '../fixtures/labFetchFixture'
import { labTranscriptRowFixture } from '../fixtures/labTranscriptRowFixture'
import { memberRuntimeFixture } from '../fixtures/memberRuntimeFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('saving a review through the database', () => {
  it('upserts the decisions of a reviewer for their organisation', async () => {
    const { fetcher, writes } = labFetchFixture({
      lab_transcripts: [labTranscriptRowFixture()],
    })
    await renderRouteFixture(
      '/app/transcripts/synthetic-1',
      uiRuntimeFixture(fetcher).runtime,
    )
    await acceptFirstEdit()
    await waitFor(() => {
      expect(writes).toHaveLength(1)
    })
    expect(writes[0]?.table).toBe('lab_reviews')
    expect(writes[0]?.body).toMatchObject({
      org_id: 'demo-org',
      transcript_id: 'synthetic-1',
      decisions: [{ editId: 'e1', verdict: 'accepted' }],
    })
    expect(await screen.findByText('Saved')).toBeTruthy()
  })

  it('shows a failed save when the database refuses the write', async () => {
    const { fetcher } = labFetchFixture(
      { lab_transcripts: [labTranscriptRowFixture()] },
      true,
    )
    await renderRouteFixture(
      '/app/transcripts/synthetic-1',
      uiRuntimeFixture(fetcher).runtime,
    )
    await acceptFirstEdit()
    expect(await screen.findByText('Save failed, will retry')).toBeTruthy()
  })

  it('lets a member read but never attempts a write', async () => {
    const { fetcher, writes } = labFetchFixture({
      lab_transcripts: [labTranscriptRowFixture()],
    })
    await renderRouteFixture(
      '/app/transcripts/synthetic-1',
      memberRuntimeFixture(fetcher).runtime,
    )
    await acceptFirstEdit()
    expect(
      screen.getByText(/Reviewer access needed to record decisions/),
    ).toBeTruthy()
    expect(writes).toHaveLength(0)
  })
})
