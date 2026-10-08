/** Reviewer minutes spent per hour of audio; undefined without audio. */
export function minutesPerAudioHour(
  reviewerSeconds: number,
  audioSeconds: number,
): number | undefined {
  if (audioSeconds <= 0) return undefined
  return reviewerSeconds / 60 / (audioSeconds / 3600)
}
