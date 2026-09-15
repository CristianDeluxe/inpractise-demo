import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

/** Opens the ask route and submits the first suggested question. */
export async function askOnceFixture() {
  vi.stubGlobal('scrollTo', vi.fn())
  const fixture = uiRuntimeFixture()
  await renderRouteFixture('/app/ask', fixture.runtime)
  await screen.findByLabelText(uiLabelsFixture.scope)
  fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
  fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
  return fixture
}
