import { animationDelay } from './animationDelay'
import { heroAnswer } from './heroAnswer'
import { HeroCitation } from './HeroCitation'

export function HeroAnswerCard() {
  return (
    <article
      aria-labelledby="hero-answer-question"
      style={animationDelay(1000)}
      className="lift-card intro-fade col-span-12 bg-background text-foreground lg:col-span-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-6 py-3">
        <p className="eyebrow text-muted-foreground">
          Synthetic example · case {heroAnswer.caseId} · {heroAnswer.recordedOn}
        </p>
        <p className="rounded-full bg-success px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-success-foreground">
          answered
        </p>
      </header>
      <div className="px-6 py-5">
        <p className="eyebrow text-muted-foreground">Question</p>
        <p id="hero-answer-question" className="mt-1 text-[15px] font-medium">
          {heroAnswer.question}
        </p>
        <p className="eyebrow mt-5 text-muted-foreground">Answer</p>
        <ul className="mt-2">
          <li className="border-l-2 border-primary pl-4">
            <p className="font-serif text-lg leading-snug">
              {heroAnswer.claim}
            </p>
            <p className="mt-2 font-mono text-xs text-primary">
              Source: {heroAnswer.citation.documentId} ·{' '}
              {heroAnswer.citation.passageId}
            </p>
          </li>
        </ul>
        <HeroCitation citation={heroAnswer.citation} />
      </div>
    </article>
  )
}
