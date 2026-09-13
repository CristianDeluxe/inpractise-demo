import { describe, expect, it } from 'vitest'
import { ApiError } from '../../supabase/functions/_shared/http/ApiError.ts'
import { corsHeaders } from '../../supabase/functions/_shared/http/corsHeaders.ts'
import { jsonResponse } from '../../supabase/functions/_shared/http/jsonResponse.ts'
import { statusForCode } from '../../supabase/functions/_shared/http/statusForCode.ts'

describe('api error codes', () => {
  it('separates a refusal, a bad answer and a dependency failure', () => {
    expect(statusForCode('not_found')).toBe(404)
    expect(statusForCode('invalid_model_answer')).toBe(502)
    expect(statusForCode('dependency_failure')).toBe(503)
  })
  it('defaults to a non-retryable error so a caller never loops on a refusal', () => {
    const error = new ApiError('forbidden', 'Membership inactive')
    expect([error.name, error.code, error.retryable]).toEqual([
      'ApiError',
      'forbidden',
      false,
    ])
    expect(new ApiError('dependency_failure', 'down', true).retryable).toBe(
      true,
    )
  })
})

describe('json responses', () => {
  it('carries the CORS headers and the JSON content type', async () => {
    const response = jsonResponse({ ok: true }, 422)
    expect(response.status).toBe(422)
    expect(response.headers.get('content-type')).toBe('application/json')
    expect(response.headers.get('access-control-allow-origin')).toBe(
      corsHeaders['access-control-allow-origin'],
    )
    expect(await response.json()).toEqual({ ok: true })
  })
})
