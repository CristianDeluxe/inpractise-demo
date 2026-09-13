import desk from '@/assets/parallax-desk.jpg'
import { Parallax } from './Parallax'

export function DeskInterlude() {
  return (
    <section
      aria-label="A closer reading"
      className="ink-panel relative overflow-hidden"
    >
      <Parallax speed={0.55} className="absolute -inset-y-20 inset-x-0">
        <img
          src={desk}
          alt="Printed research pages on a boardroom table; decorative artwork"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      </Parallax>
      <div className="page-shell relative py-28 md:py-36">
        <p className="eyebrow text-brass">A closer reading</p>
        <p className="mt-6 max-w-3xl font-serif text-3xl italic leading-snug text-ink-foreground">
          Understand the claim.
          <br />
          Read the passage.
          <br />
          Keep the limits in view.
        </p>
      </div>
    </section>
  )
}
