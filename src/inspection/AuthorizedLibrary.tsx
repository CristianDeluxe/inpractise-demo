import { LibraryStatsRow } from '@/workspace/LibraryStatsRow'
import type { AuthorizedLibraryProps } from './AuthorizedLibraryProps'

export function AuthorizedLibrary({ library }: AuthorizedLibraryProps) {
  return (
    <section aria-label="Authorized library" className="mt-8">
      <h2 className="font-sans text-xl">Authorized interviews</h2>
      <p className="mb-6 mt-2 text-sm text-muted-foreground">
        The same list a member sees, summarised. Counts describe what this
        reviewer may read: the two public podcast interviews.
      </p>
      <LibraryStatsRow library={library} company="" />
    </section>
  )
}
