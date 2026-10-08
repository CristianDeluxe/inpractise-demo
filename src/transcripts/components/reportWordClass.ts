import { reliableWordThreshold } from '../reliability/reliableWordThreshold'

/** Words below the reliable threshold are underlined, on screen and on paper. */
export function reportWordClass(score: number): string | undefined {
  if (score >= reliableWordThreshold) return undefined
  return 'underline decoration-dotted decoration-2 underline-offset-4'
}
