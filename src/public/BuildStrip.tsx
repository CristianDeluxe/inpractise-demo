import { ArrowRight } from '@/components/ArrowRight'
import { Link } from '@tanstack/react-router'
import { buildProperties } from './buildProperties'

export function BuildStrip() {
  return (
    <section
      id="built"
      aria-labelledby="built-heading"
      className="page-shell mb-24 pt-20"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 id="built-heading">How it is built</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Three properties nothing on this page is allowed to compromise.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
        {buildProperties.map((property) => (
          <li key={property.kicker} className="bg-background">
            <Link
              to={property.to}
              className="group flex h-full flex-col p-8 transition-colors hover:bg-secondary md:p-10"
            >
              <p className="eyebrow text-primary">{property.kicker}</p>
              <h3 className="mt-5 text-xl">{property.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {property.body}
              </p>
              <span className="hover-underline mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-widest">
                {property.action} <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
