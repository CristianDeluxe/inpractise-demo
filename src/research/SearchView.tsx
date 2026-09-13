import { CitationCard } from './CitationCard'
import type { SearchViewProps } from './SearchViewProps'

export function SearchView({ result }: SearchViewProps) {
  return (
    <section aria-label="Search results" className="mt-8">
      <h3 className="font-sans text-xl">Ranked passages</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {result.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} · Up to 10
        results{result.truncated ? ' · More matches exist' : ''}
      </p>
      {result.items.length === 0 ? (
        <p className="mt-5">No matching passages.</p>
      ) : null}
      <ol>
        {result.items.map((citation, index) => (
          <li key={citation.citationId}>
            <p className="mt-5 text-xs text-muted-foreground">
              Rank {index + 1}
            </p>
            <CitationCard citation={citation} />
          </li>
        ))}
      </ol>
    </section>
  )
}
