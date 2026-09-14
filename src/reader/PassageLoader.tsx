import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useNeighbor } from '@/reader/hooks/useNeighbor'
import { usePassage } from '@/reader/hooks/usePassage'
import { Link } from '@tanstack/react-router'
import type { PassageReference } from './PassageReference'
import { PassageText } from './PassageText'

/**
 * Opening a citation or neighbor performs a new authorized read instead of showing
 * an earlier search quote. Neighbor IDs have no directional contract, so labels
 * do not guess which is previous or next when only one neighbor is returned.
 */
export function PassageLoader(props: PassageReference) {
  const neighbor = useNeighbor(props)
  const request = usePassage(neighbor.reference)
  return (
    <div>
      <RequestFeedback
        state={request.state}
        cancel={request.cancel}
        retry={() => {
          void request.run({ action: 'read', ...neighbor.reference })
        }}
      />
      {request.state.status === 'success' ? (
        <>
          <PassageText passage={request.state.data.data} />
          <nav
            aria-label="Adjacent passages"
            className="mt-6 flex flex-wrap gap-3"
          >
            {request.state.data.data.neighbourIds.map((id) => (
              <button
                type="button"
                key={id}
                className="quiet-action"
                onClick={() => {
                  neighbor.select(id)
                }}
              >
                Adjacent passage {id}
              </button>
            ))}
          </nav>
          <Link
            to={request.state.data.data.citation.readerPath}
            className="mt-5 block text-sm text-primary underline"
          >
            Permalink to this exact passage
          </Link>
          <ResponseMeta {...request.state.data} />
        </>
      ) : null}
    </div>
  )
}
