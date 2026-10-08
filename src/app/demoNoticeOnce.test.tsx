// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { demoNotice } from '@/components/disclosureText'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  window.localStorage.clear()
})

it('never repeats the demo notice on one page', async () => {
  const { runtime } = uiRuntimeFixture()
  await renderRouteFixture(citationFixture().readerPath, runtime)
  await screen.findByText('Retained historical revision', { exact: false })
  expect(screen.queryAllByText(demoNotice).length).toBeLessThanOrEqual(1)
})
