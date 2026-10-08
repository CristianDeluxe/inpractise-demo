import type { BadgeProps } from './BadgeProps'

export const badgeToneClass: Record<BadgeProps['tone'], string> = {
  neutral: 'border-border text-muted-foreground',
  accent: 'border-primary/50 bg-accent text-accent-foreground',
  success: 'border-success-foreground/30 bg-success text-success-foreground',
  danger: 'border-destructive/40 bg-destructive/10 text-destructive',
}
