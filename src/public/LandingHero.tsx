import { animationDelay } from './animationDelay'
import { HeroActions } from './HeroActions'
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
          <HeroActions />
        </div>
        <LandingComparisonCard />
      </div>
      <HeroStatistics />
    </section>
  )
}
