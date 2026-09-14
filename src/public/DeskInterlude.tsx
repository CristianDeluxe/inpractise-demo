import desk from '@/assets/parallax-desk.jpg'
import { Parallax } from './Parallax'
import { Reveal } from './Reveal'

export function DeskInterlude() {
  return (
    <section
      aria-label="A closer reading"
      className="ink-panel grain relative mb-28 w-full overflow-hidden"
    >
      <Parallax speed={0.55} className="absolute -inset-y-20 inset-x-0">
        <img
          src={desk}
          alt="Printed research pages on a boardroom table; decorative artwork"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
      </Parallax>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[color-mix(in_oklab,var(--color-ink-border)_92%,black)] via-transparent to-[color-mix(in_oklab,var(--color-ink-border)_70%,black)]" />
      <div className="page-shell relative z-[2] py-28 md:py-40">
        <Reveal>
          <p className="eyebrow text-brass">A closer reading</p>
          <p className="mt-6 max-w-3xl font-serif text-[clamp(1.7rem,3.4vw,2.9rem)] italic leading-[1.15] text-ink-foreground">
            Understand the claim.
            <br />
            Read the passage.
            <br />
            Keep the limits in view.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
