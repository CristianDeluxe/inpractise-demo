import type { ApiErrorCode } from '@/api/ApiErrorCode'

export const apiErrorMessages: Record<ApiErrorCode, string> = {
  invalid_session: 'Your session is unavailable. Sign in to continue.',
  forbidden: 'Access denied. This account does not have permission.',
  passage_not_found: 'This source is unavailable.',
  request_not_found: 'No answer was found for this request id.',
  note_not_found: 'This note is no longer in your notebook.',
  allowance_exhausted:
    'Request allowance exhausted. No request will be retried automatically.',
  bad_input:
    'Check your input. Queries allow 1–2,000 characters and up to 500 tokens.',
  invalid_model_answer:
    'The response failed validation. No unvalidated evidence is displayed.',
  protocol:
    'The response failed validation. No unvalidated evidence is displayed.',
  network:
    'The network request failed. This is an error, not an absence of evidence.',
  dependency_failure:
    'The research service is unavailable. This is an error, not an absence of evidence.',
  http_error: 'The research service could not complete this request.',
  cancelled: 'The request was cancelled.',
}
