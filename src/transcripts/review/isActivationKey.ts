/** Enter and Space activate a custom button, as they do a native one. */
export function isActivationKey(key: string) {
  return key === 'Enter' || key === ' '
}
