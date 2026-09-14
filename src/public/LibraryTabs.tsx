import { handleLibraryTabKey } from './handleLibraryTabKey'
import { libraryTabs } from './libraryTabOptions'
import type { LibraryTabsProps } from './LibraryTabsProps'

export function LibraryTabs({ tab, onSelect }: LibraryTabsProps) {
  return (
    <div
      className="flex max-w-full gap-2 border-b border-border"
      role="tablist"
      tabIndex={-1}
      aria-label="Library"
      onKeyDown={handleLibraryTabKey}
    >
      {libraryTabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          id={`library-tab-${key}`}
          aria-controls={`library-panel-${key}`}
          aria-selected={tab === key}
          tabIndex={tab === key ? 0 : -1}
          onFocus={() => {
            onSelect(key)
          }}
          onClick={() => {
            onSelect(key)
          }}
          className={`-mb-px min-w-0 flex-1 border-b-2 px-3 pb-2 text-[13px] font-bold uppercase tracking-[0.1em] transition-colors md:px-4 ${tab === key ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
