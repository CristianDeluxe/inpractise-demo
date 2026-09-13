import { Link } from '@tanstack/react-router'
import { animationDelay } from './animationDelay'
import { HeroHeading } from './HeroHeading'
import { HeroStatistics } from './HeroStatistics'
import { LandingComparisonCard } from './LandingComparisonCard'
import { ParticleField } from './ParticleField'

export function LandingHero() {
  return (
    <section className="ink-panel grain beam intro-wipe relative overflow-hidden">
      <ParticleField />
      <div className="page-shell relative z-10 grid grid-cols-12 items-end gap-y-12 lg:gap-x-10 pb-16 pt-24 md:pt-32">
        <div className="col-span-12 lg:col-span-7">
          <p
            className="eyebrow intro-fade text-brass"
            style={animationDelay(620)}
          >
            Independent research engineering demo
          </p>
          <HeroHeading />
          <p
            className="intro-fade mt-8 max-w-[46ch] text-ink-muted"
            style={animationDelay(760)}
          >
            Explore public filings and fictional interviews. Ask a standalone
            question, inspect the evidence, and see where an answer stops.
          </p>
          <div
            className="intro-fade mt-10 flex flex-wrap items-center gap-6"
            style={animationDelay(880)}
          >
            <Link to="/login" className="action">
              Log in
            </Link>
            <a
              href="#evidence"
              className="hover-underline text-xs font-bold uppercase tracking-widest"
            >
              Explore the evidence
            </a>
          </div>
        </div>
        <LandingComparisonCard />
      </div>
      <HeroStatistics />
    </section>
  )
}
