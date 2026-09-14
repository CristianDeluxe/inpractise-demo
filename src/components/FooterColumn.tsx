import { Link } from '@tanstack/react-router'
import type { FooterColumnProps } from './FooterColumnProps'

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <nav aria-label={column.heading}>
      <h4 className="eyebrow text-ink-muted">{column.heading}</h4>
      <ul className="mt-6 space-y-3 text-[15px]">
        {column.links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              title={'description' in link ? link.description : undefined}
              className="hover-underline text-ink-foreground/75 transition-colors hover:text-ink-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
