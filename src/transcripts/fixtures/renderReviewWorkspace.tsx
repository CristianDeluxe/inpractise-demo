import { fireEvent, render, screen } from '@testing-library/react'
import type { ReviewSaver } from '../api/ReviewSaver'
import type { TranscriptBundle } from '../api/TranscriptBundle'
import { ReviewWorkspace } from '../components/ReviewWorkspace'
import { bundleFixture } from './bundleFixture'
import { reviewSaverFixture } from './reviewSaverFixture'

/**
 * Renders the synthetic transcript's workspace; the saver defaults to one that
 * succeeds. The workspace opens on the AI-final text, so most tests switch to
 * Track changes first; pass false to see the default view.
 */
export function renderReviewWorkspace(
  onSave: ReviewSaver | null = reviewSaverFixture(),
  startInTrackChanges = true,
  bundle: TranscriptBundle = bundleFixture(),
) {
  const rendered = render(<ReviewWorkspace bundle={bundle} onSave={onSave} />)
  if (startInTrackChanges)
    fireEvent.click(screen.getByRole('button', { name: 'Track changes' }))
  return rendered
}
