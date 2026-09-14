import type { interviewLibrary } from './libraryEntries'

export type LibraryCardProps = {
  item:
    | (typeof interviewLibrary)['inPractise'][number]
    | (typeof interviewLibrary)['partner'][number]
  index: number
}
