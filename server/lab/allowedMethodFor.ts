/** The only HTTP method each transcript sub-resource accepts. */
export const allowedMethodFor = {
  bundle: 'GET',
  audio: 'GET',
  review: 'PUT',
} as const
