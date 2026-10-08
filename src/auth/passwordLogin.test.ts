import { ApiError } from '@/api/ApiError'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { errorCopy } from '@/components/errorCopy'
import { AuthApiError } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'
import { passwordLogin } from './passwordLogin'

describe('passwordLogin', () => {
  it('reports rejected credentials as a credentials error, not a connection failure', async () => {
    const { runtime } = uiRuntimeFixture()
    vi.spyOn(runtime.auth, 'signInWithPassword').mockResolvedValue({
      data: { user: null, session: null },
      error: new AuthApiError(
        'Invalid login credentials',
        400,
        'invalid_credentials',
      ),
    })
    const failure = await passwordLogin(
      runtime,
      { email: 'reader@example.test', password: 'wrong' },
      new AbortController().signal,
    ).catch((error: unknown) => error)
    expect(failure).toBeInstanceOf(ApiError)
    expect(errorCopy(failure)).toBe(
      'Wrong email or password. Use the demo credentials you were given.',
    )
  })
})
