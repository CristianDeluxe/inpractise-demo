import { SourceLabel } from '@/components/SourceLabel'
import type { LibraryPanelProps } from './LibraryPanelProps'

export function RecentDocuments({ library, company }: LibraryPanelProps) {
  const documents = library.items
    .filter((item) => !company || item.company === company)
    .toSorted((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 5)
  return (
    <section
      aria-label="Recent documents"
      className="mb-8 border-b border-border pb-6"
    >
      <h2 className="font-sans text-xl">Recent documents</h2>
      <ul className="mt-4 divide-y divide-border">
        {documents.map((document) => (
          <li
            key={document.document_id}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div className="min-w-0">
              <SourceLabel origin={document.origin} />
              <h3 className="mt-2 break-words font-sans text-sm">
                {document.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {document.company} · Published {document.published_at}
              </p>
            </div>
            {document.passage_count === undefined ? null : (
              <p className="font-mono text-xs">
                {document.passage_count} paragraphs
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
