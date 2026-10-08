import type { BadgeProps } from './BadgeProps'
import { badgeToneClass } from './badgeToneClass'

export function Badge({ tone, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] ${badgeToneClass[tone]}`}
    >
      {children}
    </span>
  )
}
