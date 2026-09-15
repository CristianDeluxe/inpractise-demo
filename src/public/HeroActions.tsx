import { Link } from '@tanstack/react-router'
import { animationDelay } from './animationDelay'

export function HeroActions() {
  return (
    <div
      className="intro-fade mt-10 flex flex-wrap items-center gap-6"
      style={animationDelay(880)}
    >
      <Link to="/login" className="action">
        Log in
      </Link>
      <a
        href="#evidence"
        className="hover-underline text-xs font-bold uppercase tracking-widest"
      >
        Explore the evidence
      </a>
      <a
        href="#built"
        className="hover-underline text-xs font-bold uppercase tracking-widest"
      >
        How it is built
      </a>
    </div>
  )
}
