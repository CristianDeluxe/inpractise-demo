import { animationDelay } from './animationDelay'

export function LandingComparisonCard() {
  return (
    <a
      href="#evidence"
      style={animationDelay(1000)}
      className="intro-fade col-span-12 border border-ink-border p-7 transition-colors hover:border-brass lg:col-span-5"
    >
      <p className="eyebrow text-ink-muted">Curated synthetic comparison</p>
      <p className="mt-5 font-serif text-[26px] leading-tight">
        What makes an installed base hard to replace
      </p>
      <p className="mt-4 text-sm text-ink-muted">
        Northstar Workflow · Fictional company and speakers
      </p>
      <span className="hover-underline mt-7 inline-block text-xs font-bold uppercase tracking-widest text-brass">
        Audit the source →
      </span>
    </a>
  )
}
