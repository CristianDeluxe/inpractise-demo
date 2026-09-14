import type { LibraryTab } from './LibraryTab'

export type LibraryTabsProps = {
  tab: LibraryTab
  onSelect: (tab: LibraryTab) => void
}
