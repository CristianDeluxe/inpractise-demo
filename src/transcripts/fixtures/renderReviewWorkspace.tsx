import { render } from '@testing-library/react'
import type { ReviewSaver } from '../api/ReviewSaver'
import { ReviewWorkspace } from '../components/ReviewWorkspace'
import { bundleFixture } from './bundleFixture'
import { reviewSaverFixture } from './reviewSaverFixture'

/** Renders the synthetic transcript's workspace; the saver defaults to one that succeeds. */
export function renderReviewWorkspace(
  onSave: ReviewSaver | null = reviewSaverFixture(),
) {
  return render(<ReviewWorkspace bundle={bundleFixture()} onSave={onSave} />)
}
