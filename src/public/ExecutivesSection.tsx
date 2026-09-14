import { Link } from '@tanstack/react-router'
import { executiveContent } from './executiveContent'

export function ExecutivesSection() {
  return (
    <section id="executives" className="page-shell mb-28 text-center">
      <div className="inline-block max-w-2xl border border-border bg-card p-10 md:p-12">
        <h3 className="font-serif text-[24px]">{executiveContent.heading}</h3>
        <p className="mt-4 text-muted-foreground">
          {executiveContent.description}
        </p>
        <Link
          to="/login"
          aria-describedby="executives-destination"
          className="mt-8 inline-block border-b border-foreground pb-1 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
        >
          {executiveContent.action}
        </Link>
        <p
          id="executives-destination"
          className="mt-4 text-xs text-muted-foreground"
        >
          {executiveContent.disclosure}
        </p>
      </div>
    </section>
  )
}
