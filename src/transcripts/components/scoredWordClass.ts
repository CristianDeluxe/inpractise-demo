import { reliableWordThreshold } from '../reliability/reliableWordThreshold'

/** Reliable words read as plain text; the rest get a soft tint and a dotted underline, so colour is never the only signal. */
export function scoredWordClass(score: number): string {
  const base =
    '-mx-0.5 inline rounded-sm px-0.5 text-left align-baseline transition-colors hover:bg-primary/25'
  if (score >= reliableWordThreshold) return base
  return `${base} bg-warning/60 underline decoration-dotted decoration-2 underline-offset-4`
}
