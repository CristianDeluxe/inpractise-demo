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
            Independent engineering demo · Interview transcripts
          </p>
          <HeroHeading />
          <p
            className="intro-fade mt-8 max-w-[48ch] text-ink-muted"
            style={animationDelay(760)}
          >
            In Practise publishes executive interviews for long-term investors.
            This demo models the production side of an interview library: the
            recording becomes a machine transcript, an AI pass turns it into
            readable, client-ready text and marks the words worth a second
            listen, and an editor reviews only those. Ask then answers only with
            literal quotes from the finished transcripts.
          </p>
          <p
            className="intro-fade mt-4 max-w-[48ch] text-sm text-ink-muted"
            style={animationDelay(820)}
          >
            The material is two public podcast interviews with the CEOs of Roche
            and Novartis, processed automatically. It is not In Practise
            content, and no person has reviewed the transcripts.
          </p>
          <HeroActions />
        </div>
        <HeroAnswerCard />
      </div>
      <HeroStatistics />
    </section>
  )
}
