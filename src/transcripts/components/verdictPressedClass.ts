import type { ReviewVerdict } from '../contracts/ReviewVerdict'

/** The fill a verdict toggle takes once pressed. */
export const verdictPressedClass: Readonly<Record<ReviewVerdict, string>> = {
  accepted:
    'hover:border-success-foreground/40 aria-pressed:bg-success-foreground aria-pressed:text-success',
  rejected:
    'hover:border-destructive/40 aria-pressed:bg-destructive aria-pressed:text-destructive-foreground',
  deferred:
    'hover:border-warning-foreground/40 aria-pressed:bg-warning aria-pressed:text-warning-foreground',
}
