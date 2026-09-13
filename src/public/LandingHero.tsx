import { Link } from '@tanstack/react-router'

export function LandingHero() {
  return (
    <section className="ink-panel grain beam relative overflow-hidden">
      <div className="page-shell relative z-10 grid grid-cols-12 items-end gap-x-10 gap-y-12 pb-16 pt-24 md:pt-32">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow text-brass">
            Independent research engineering demo
          </p>
          <h1 className="mt-7 font-serif text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] tracking-tight text-ink-foreground">
            Executive insight
            <br />
            for <em className="font-normal text-brass">long-term</em> thinking.
          </h1>
          <p className="mt-8 max-w-[46ch] text-ink-muted">
            Explore public filings and fictional interviews. Ask a standalone
            question, inspect the evidence, and see where an answer stops.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/login" className="action">
              Log in
            </Link>
            <a
              href="#evidence"
              className="text-xs font-bold uppercase tracking-widest"
            >
              Explore the evidence
            </a>
          </div>
        </div>
        <a
          href="#evidence"
          className="col-span-12 border border-ink-border p-7 transition-colors hover:border-brass lg:col-span-5"
        >
          <p className="eyebrow text-ink-muted">Curated synthetic comparison</p>
          <p className="mt-5 font-serif text-[26px] leading-tight">
            What makes an installed base hard to replace
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Northstar Workflow · Fictional company and speakers
          </p>
          <span className="mt-7 block text-xs font-bold uppercase tracking-widest text-brass">
            Audit the source →
          </span>
        </a>
      </div>
    </section>
  )
}
