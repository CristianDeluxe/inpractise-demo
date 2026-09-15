import { animationDelay } from './animationDelay'

export function HeroHeading() {
  return (
    <h1 className="mt-7 font-serif text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] tracking-tight text-ink-foreground">
      <span className="intro-line -mb-[0.15em] pb-[0.15em]">
        <span style={animationDelay(180)}>Answers that</span>
      </span>
      <span className="intro-line -mb-[0.15em] pb-[0.15em]">
        <span style={animationDelay(320)}>
          open the <em className="font-normal text-brass">passage</em>
        </span>
      </span>
      <span className="intro-line -mb-[0.15em] pb-[0.15em]">
        <span style={animationDelay(460)}>they cite.</span>
      </span>
    </h1>
  )
}
