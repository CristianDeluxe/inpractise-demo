export type LatencyTarget = {
  /** Supabase origin used for sign-in. */
  url: string
  publishableKey: string
  /** The research endpoint under measurement; defaults to the deployed function. */
  endpoint: string
  reviewerEmail: string
  reviewerPassword: string
}
