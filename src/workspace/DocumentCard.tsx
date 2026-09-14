import { SourceLabel } from '@/components/SourceLabel'
import { FileText } from 'lucide-react'
import type { DocumentCardProps } from './DocumentCardProps'

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <SourceLabel origin={document.origin} />
        <FileText
          size={18}
          strokeWidth={1.5}
          className="shrink-0 text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="mt-5 text-xs uppercase tracking-widest text-primary">
        {document.company}
      </p>
      <h3 className="mt-2 font-sans text-lg leading-snug">{document.title}</h3>
      <p className="mt-4 text-xs text-muted-foreground">
        {document.interview_date
          ? `Interview: ${document.interview_date}`
          : null}
        <br />
        Published: {document.published_at}
      </p>
      <details className="mt-4 text-xs text-muted-foreground">
        <summary>Source identity</summary>
        <p className="mt-2 break-all font-mono">
          {document.document_id}
          <br />
          {document.revision_id}
        </p>
      </details>
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        Search passages below to open exact evidence.
      </p>
    </article>
  )
}
