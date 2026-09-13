import { DocumentCard } from './DocumentCard'
import type { LibraryPanelProps } from './LibraryPanelProps'

export function LibraryPanel({ library, company }: LibraryPanelProps) {
  return (
    <section id="library">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-sans text-2xl">Source library</h2>
        <p className="text-sm text-muted-foreground">
          {library.items.length} authorized documents
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {library.items
          .filter((document) => !company || document.company === company)
          .map((document) => (
            <DocumentCard key={document.document_id} document={document} />
          ))}
      </div>
      {library.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No authorized documents are available.
        </p>
      ) : null}
    </section>
  )
}
