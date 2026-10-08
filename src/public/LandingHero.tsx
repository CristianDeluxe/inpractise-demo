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
            A working model of an expert-interview workflow: a call becomes a
            transcript, a person cleans the transcript up, and Ask answers only
            with literal quotes from it. If no quote supports an answer, there
            is no answer.
          </p>
          <p
            className="intro-fade mt-4 max-w-[48ch] text-sm text-ink-muted"
            style={animationDelay(820)}
          >
            The material here is two public podcast interviews with the CEOs of
            Roche and Novartis. It is not In Practise content, and the
            transcripts are automatic and not human-reviewed.
          </p>
          <HeroActions />
        </div>
        <HeroAnswerCard />
      </div>
      <HeroStatistics />
    </section>
  )
}
