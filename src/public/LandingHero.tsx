import { animationDelay } from './animationDelay'
import { HeroActions } from './HeroActions'
import { HeroAnswerCard } from './HeroAnswerCard'
import { HeroHeading } from './HeroHeading'
import { HeroStatistics } from './HeroStatistics'
import { ParticleField } from './ParticleField'

export function LandingHero() {
  return (
    <section className="ink-panel grain beam intro-wipe relative overflow-hidden">
      <ParticleField />
      <div className="page-shell relative z-10 grid grid-cols-12 gap-y-12 pb-16 pt-24 md:pt-28 lg:items-center lg:gap-x-10">
        <div className="col-span-12 lg:col-span-7">
          <p
            className="eyebrow intro-fade text-brass"
            style={animationDelay(620)}
          >
            Independent research engineering demo
          </p>
          <HeroHeading />
          <p
            className="intro-fade mt-8 max-w-[48ch] text-ink-muted"
            style={animationDelay(760)}
          >
            Search an authorised corpus of public filings and synthetic
            interviews, ask a standalone question, and open the exact passage
            behind each claim. Where the corpus cannot establish something, the
            answer says so.
          </p>
          <HeroActions />
        </div>
        <HeroAnswerCard />
      </div>
      <HeroStatistics />
    </section>
  )
}
