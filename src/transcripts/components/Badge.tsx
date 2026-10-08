import type { BadgeProps } from './BadgeProps'
import { badgeToneClass } from './badgeToneClass'

export function Badge({ tone, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${badgeToneClass[tone]}`}
    >
      {children}
    </span>
  )
}
