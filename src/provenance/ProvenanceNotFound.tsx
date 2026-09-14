import { apiErrorMessages } from '@/components/apiErrorMessages'

/**
 * A request id that is not the caller's own is indistinguishable from one
 * that never existed - that indistinguishability is the security property
 * RLS deliberately provides. This renders as plain text, not an alert, and
 * offers no sign-in prompt: the honest answer here is "no such request",
 * never "you are not allowed to see this".
 */
export function ProvenanceNotFound() {
  return (
    <p className="my-4 text-sm text-muted-foreground">
      {apiErrorMessages.request_not_found}
    </p>
  )
}
