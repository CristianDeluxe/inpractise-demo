import { Reveal } from './Reveal'
import { researchPillars } from './pillarContent'

export function ResearchPillars() {
  return (
    <section
      id="research"
      className="page-shell mb-24"
      aria-label="Research principles"
    >
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
        {researchPillars.map((item, index) => (
          <Reveal
            key={item.index}
            delay={index * 110}
            className="bg-background p-8 md:p-10"
          >
            <article>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary">
                {item.index} / {item.kicker}
              </p>
              <h2 className="mt-6 text-2xl">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
