import { ArrowRight } from '@/components/ArrowRight'
import { Link } from '@tanstack/react-router'
import type { LibraryCardProps } from './LibraryCardProps'

export function LibraryCard({ item, index }: LibraryCardProps) {
  return (
    <li>
      <Link
        to="/app"
        className="group block"
        aria-describedby="library-destination"
      >
        <div
          className={`relative flex aspect-[4/3] items-end overflow-hidden p-5 ${index % 2 === 0 ? 'ink-panel' : 'bg-steel'}`}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brass">
              {item.sector}
            </p>
            <p className="mt-1 font-serif text-[19px] text-ink-foreground">
              {item.company}
            </p>
          </div>
          <span className="absolute right-4 top-4 text-ink-foreground/0 transition-colors group-hover:text-ink-foreground group-focus-visible:text-ink-foreground">
            <ArrowRight />
          </span>
        </div>
        <p className="mt-4 text-[15px] font-medium">{item.role}</p>
        <p className="meta-text mt-1">{item.date}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Fictional company · Illustrative source
        </p>
      </Link>
    </li>
  )
}
