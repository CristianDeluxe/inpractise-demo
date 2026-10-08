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
        href="#workflow"
        className="hover-underline text-xs font-bold uppercase tracking-widest"
      >
        How the workflow runs
      </a>
    </div>
  )
}
