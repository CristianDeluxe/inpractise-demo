import { animationDelay } from './animationDelay'
import { demoCorpusStats } from './demoCorpusStats'

export function HeroStatistics() {
  return (
    <div
      className="intro-fade relative z-10 border-t border-ink-border"
      style={animationDelay(1150)}
    >
      <dl className="page-shell grid grid-cols-2 gap-x-6 divide-ink-border md:grid-cols-4 md:gap-x-0 md:divide-x">
        {demoCorpusStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-7 ${index === 0 ? '' : 'md:pl-8'}`}
          >
            <dt className="eyebrow text-ink-muted">{stat.label}</dt>
            <dd className="mt-3 font-serif text-3xl leading-none text-ink-foreground">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
