import { Reveal } from './Reveal'
import { researchPillars } from './pillarContent'

export function ResearchPillars() {
  return (
    <section
      className="page-shell grid gap-10 py-20 md:grid-cols-3"
      aria-label="Research principles"
    >
      {researchPillars.map((item, index) => (
        <Reveal key={item.index} delay={index * 110}>
          <article className="border-t border-border pt-6">
            <p className="eyebrow text-muted-foreground">
              {item.index} / {item.kicker}
            </p>
            <h2 className="mt-5 text-2xl">{item.title}</h2>
            <p className="mt-4 text-muted-foreground">{item.body}</p>
          </article>
        </Reveal>
      ))}
    </section>
  )
}
