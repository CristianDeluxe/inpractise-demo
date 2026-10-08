/**
 * What the list row does not carry about one interview: the guest and the
 * host as named in the episode, and the first excerpt a reader can open.
 */
export type InterviewProfile = {
  guest: string
  guestRole: string
  host: string
  firstPassageId: string
}
