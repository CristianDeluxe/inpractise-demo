import { screen } from '@testing-library/react'

/** The first match of a named group is the desktop sidebar's, which comes first in the page. */
export async function sidebarGroupFixture(name: string) {
  const groups = await screen.findAllByRole('group', { name })
  return groups[0] as HTMLDetailsElement
}
