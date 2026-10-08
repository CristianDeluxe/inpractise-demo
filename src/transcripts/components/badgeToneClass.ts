import type { BadgeProps } from './BadgeProps'

export const badgeToneClass: Record<BadgeProps['tone'], string> = {
  neutral: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  danger: 'bg-destructive/10 text-destructive',
}
