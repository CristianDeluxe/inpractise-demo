import type { RailSectionProps } from './RailSectionProps'

/** One block of the quality panel: a small heading over its figures. */
export function RailSection({ title, label, children }: RailSectionProps) {
  return (
    <section aria-label={label ?? title} className="py-3">
      <h2 className="px-4 pb-1 font-sans text-[13px] font-semibold">{title}</h2>
      {children}
    </section>
  )
}
