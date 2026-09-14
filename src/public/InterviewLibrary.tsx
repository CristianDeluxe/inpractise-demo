import { useLibraryTab } from './hooks/useLibraryTab'
import { LibraryCard } from './LibraryCard'
import { libraryContent } from './libraryContent'
import { interviewLibrary } from './libraryEntries'
import { libraryTabs } from './libraryTabOptions'
import { LibraryTabs } from './LibraryTabs'

export function InterviewLibrary() {
  const [tab, setTab] = useLibraryTab()
  return (
    <section id="library" className="page-shell mb-28">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)]">
            {libraryContent.heading}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {libraryContent.description}
          </p>
        </div>
        <LibraryTabs tab={tab} onSelect={setTab} />
      </div>
      <p
        id="library-destination"
        className="mb-6 text-sm text-muted-foreground"
      >
        {libraryContent.disclosure}
      </p>
      {libraryTabs.map(({ key }) => (
        <div
          key={key}
          role="tabpanel"
          id={`library-panel-${key}`}
          aria-labelledby={`library-tab-${key}`}
          hidden={tab !== key}
        >
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {interviewLibrary[key].map((item, index) => (
              <LibraryCard key={item.externalId} item={item} index={index} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
