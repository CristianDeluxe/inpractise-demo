import { demoNotice } from './disclosureText'
import { FooterColumn } from './FooterColumn'
import { footerColumns } from './footerColumns'
import { Wordmark } from './Wordmark'

export function SiteFooter() {
  return (
    <footer className="ink-panel border-t border-ink-border">
      <div className="page-shell pt-12">
        <Wordmark />
        <p className="mt-5 max-w-md text-sm text-ink-muted">{demoNotice}</p>
      </div>
      <div className="page-shell grid grid-cols-2 gap-10 py-20 md:grid-cols-4">
        {footerColumns.map((column) => (
          <FooterColumn key={column.heading} column={column} />
        ))}
      </div>
      <div className="page-shell flex flex-col gap-4 border-t border-ink-border py-7 text-[11px] uppercase tracking-[0.2em] text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>
          An independent engineering demonstration. No affiliation with In
          Practise.
        </p>
        <p>Interviews shown here use fictional companies and speakers</p>
      </div>
    </footer>
  )
}
