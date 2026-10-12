import { Spinner } from '@/components/Spinner'
import type { LabResourceViewProps } from './LabResourceViewProps'

export function LabResourceView<T>({
  resource,
  noun,
  children,
}: LabResourceViewProps<T>) {
  if (resource.status === 'ready') return <>{children(resource.data)}</>
  // A full-height placeholder keeps what follows below the fold, so the
  // loaded page replacing it does not shift visible content.
  return (
    <main id="main-content" className="page-shell min-h-dvh py-20">
      <div role="status" className="flex items-center gap-3">
        {resource.status === 'loading' ? <Spinner /> : null}
        <p>
          {resource.status === 'loading'
            ? `Loading ${noun}...`
            : `Could not load ${noun}: ${resource.message}`}
        </p>
      </div>
    </main>
  )
}
