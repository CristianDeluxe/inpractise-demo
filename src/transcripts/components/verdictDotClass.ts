import type { ReviewVerdict } from '../contracts/ReviewVerdict'

export function verdictDotClass(verdict: ReviewVerdict | undefined) {
  if (verdict === 'accepted') return 'bg-success-foreground'
  if (verdict === 'rejected') return 'bg-destructive'
  if (verdict === 'deferred') return 'bg-warning-foreground'
  return 'bg-transparent shadow-[inset_0_0_0_1.5px_var(--color-muted-foreground)]'
}
