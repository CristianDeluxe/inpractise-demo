import type { libraryTabs } from './libraryTabOptions'

export type LibraryTab = (typeof libraryTabs)[number]['key']
