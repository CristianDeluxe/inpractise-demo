import { ApiError } from '@/api/ApiError'
import { apiErrorMessages } from './apiErrorMessages'

export function errorCopy(error: unknown) {
  return error instanceof ApiError
    ? apiErrorMessages[error.code]
    : 'The request failed. Please check your connection or credentials.'
}
