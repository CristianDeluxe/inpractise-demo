import { fireEvent, screen } from '@testing-library/react'

/** Switches the AI-final text to tracked changes, then opens the first edit of the synthetic transcript and accepts it. */
export async function acceptFirstEdit() {
  await screen.findByRole('heading', {
    name: 'Synthetic briefing about Northwind Ledger',
  })
  fireEvent.click(screen.getByRole('button', { name: 'Track changes' }))
  fireEvent.click(
    screen.getByRole('button', { name: /Northwynd to Northwind/ }),
  )
  fireEvent.click(
    screen.getAllByRole('button', { name: 'Accept' })[0] as HTMLElement,
  )
}
