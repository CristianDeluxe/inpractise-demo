import podcastCover from '@/assets/podcast-cover.jpg'
import { podcastContent } from './podcastContent'
import { PodcastPlayCard } from './PodcastPlayCard'

export function PodcastSection() {
  return (
    <section
      id="podcast"
      className="ink-panel grain relative mb-28 w-full overflow-hidden"
    >
      <img
        src={podcastCover}
        alt="IP Fieldwork studio — two microphones over a wooden table; illustrative artwork"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        loading="lazy"
        width={1024}
        height={768}
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/40" />
      <div className="page-shell relative grid gap-10 py-16 md:grid-cols-12 md:items-center md:py-20">
        <div className="md:col-span-7">
          <p className="eyebrow text-brass">{podcastContent.eyebrow}</p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight text-ink-foreground">
            {podcastContent.title}
          </h2>
          <p className="mt-5 max-w-xl italic leading-relaxed text-ink-muted">
            {podcastContent.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ink-muted">
            {podcastContent.platforms.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="transition-colors hover:text-ink-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <p
            id="podcast-disclosure"
            className="mt-6 max-w-xl text-xs text-ink-muted"
          >
            {podcastContent.disclosure}
          </p>
        </div>
        <PodcastPlayCard />
      </div>
    </section>
  )
}
