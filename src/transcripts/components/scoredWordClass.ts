import { reliableWordThreshold } from '../reliability/reliableWordThreshold'

/** Reliable words read as plain text; the rest get a faint tint and a thin dotted underline, stronger on hover and focus, so colour is never the only signal. */
export function scoredWordClass(score: number): string {
  const base =
    '-mx-0.5 inline rounded-sm px-0.5 text-left align-baseline transition-colors hover:bg-primary/20'
  if (score >= reliableWordThreshold) return base
  return `${base} bg-warning/30 underline decoration-dotted decoration-1 underline-offset-4 hover:decoration-2 focus-visible:bg-primary/20 focus-visible:decoration-2`
}
