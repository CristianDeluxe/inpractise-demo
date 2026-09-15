// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { act, cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { signInHeadingFixture } from './signInHeadingFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('protected route session presentation', () => {
  it.each(['/app', '/inspect', citationFixture().readerPath])(
    'invites a logged-out visitor at %s to sign in',
    async (path) => {
      const { runtime, requests, getSession } = uiRuntimeFixture()
      getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })
      await renderRouteFixture(path, runtime)
      expect(
        await screen.findByRole('heading', { name: signInHeadingFixture }),
      ).toBeTruthy()
      expect(screen.getByText(path)).toBeTruthy()
      expect(
        screen.getByRole('link', { name: 'Sign in' }).getAttribute('href'),
      ).toBe('/login')
      expect(screen.queryByRole('alert')).toBeNull()
      expect(requests).toHaveLength(0)
    },
  )
  it('keeps the loading state until session presence is known', async () => {
    const { runtime, getSession } = uiRuntimeFixture()
    const pending =
      Promise.withResolvers<
        Awaited<ReturnType<typeof runtime.auth.getSession>>
      >()
    getSession.mockReturnValue(pending.promise)
    await renderRouteFixture('/app', runtime)
    expect(await screen.findByRole('status')).toBeTruthy()
    expect(screen.queryByRole('alert')).toBeNull()
    await act(async () => {
      pending.resolve({ data: { session: null }, error: null })
      await pending.promise
    })
    expect(
      await screen.findByRole('heading', { name: signInHeadingFixture }),
    ).toBeTruthy()
  })
  it.each(['invalid_session', 'dependency_failure', 'http_error', 'forbidden'])(
    'retains %s errors and the request id when a token exists',
    async (code) => {
      const { runtime, fetcher } = uiRuntimeFixture()
      fetcher.mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: { code, message: 'Rejected', retryable: false },
            requestId: 'access-rejected',
          }),
          { status: 401 },
        ),
      )
      await renderRouteFixture('/app', runtime)
      expect((await screen.findByRole('alert')).textContent).toContain(
        'Request: access-rejected',
      )
      expect(
        screen.queryByRole('heading', { name: signInHeadingFixture }),
      ).toBeNull()
    },
  )
  it('lands on the calm invitation after workspace sign-out', async () => {
    const { runtime, authChange, signOut, getSession } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    signOut.mockImplementation(async () => {
      getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })
      await authChange.mock.calls[0]?.[0]('SIGNED_OUT', null)
      return { error: null }
    })
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Sign out' })[0] ?? document.body,
    )
    expect(
      await screen.findByRole('heading', { name: signInHeadingFixture }),
    ).toBeTruthy()
    expect(screen.queryByRole('alert')).toBeNull()
    expect(
      screen.queryByRole('heading', { name: uiLabelsFixture.workspace }),
    ).toBeNull()
  })
})
