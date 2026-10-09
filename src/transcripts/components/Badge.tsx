import type { BadgeProps } from './BadgeProps'
import { badgeToneClass } from './badgeToneClass'

export function Badge({ tone, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badgeToneClass[tone]}`}
    >
      {children}
    </span>
  )
}
