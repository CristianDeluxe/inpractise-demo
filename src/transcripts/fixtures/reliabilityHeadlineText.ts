import { screen } from '@testing-library/react'

/** The reliability headline as one line of text, though it is laid out on three. */
export function reliabilityHeadlineText() {
  return screen.getByRole('region', { name: 'AI-final reliability' })
    .textContent
}
