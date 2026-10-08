import { EvidenceId } from '@/components/EvidenceId'
import { SaveNoteButton } from '@/notebook/SaveNoteButton'
import { useCopyPassage } from '@/reader/hooks/useCopyPassage'
import { PassageHeading } from './PassageHeading'
import type { PassageViewProps } from './PassageViewProps'

export function PassageText({ passage }: PassageViewProps) {
  const copy = useCopyPassage(passage.citation.readerPath)
  return (
    <article className="mt-6">
      <PassageHeading passage={passage} />
      <p className="mt-5 text-xs font-medium text-primary">
        Episode time {passage.section} ·{' '}
        {passage.isCurrentRevision
          ? 'Current revision'
          : 'Retained historical revision'}
      </p>
      <blockquote className="my-8 whitespace-pre-wrap break-words border-l-2 border-primary pl-5 font-serif text-xl leading-[1.78]">
        {passage.citation.quote}
      </blockquote>
      <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        Reference
        <EvidenceId identifier={passage.citation.citationId} label="excerpt" />
      </p>
      {passage.citation.sourceUrl ? (
        <a
          href={passage.citation.sourceUrl}
          className="mt-3 inline-block text-sm text-primary underline"
          rel="noreferrer"
          target="_blank"
        >
          Listen to the episode
        </a>
      ) : null}
      <button
        type="button"
        className="quiet-action mt-5"
        onClick={() => {
          void copy.copy()
        }}
      >
        {copy.status}
      </button>
      <SaveNoteButton citation={passage.citation} />
    </article>
  )
}
