import { EvidenceId } from '@/components/EvidenceId'
import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { SourceLabel } from '@/components/SourceLabel'
import { useCopyPassage } from '@/reader/hooks/useCopyPassage'
import type { PassageViewProps } from './PassageViewProps'

export function PassageText({ passage }: PassageViewProps) {
  const copy = useCopyPassage(passage.citation.readerPath)
  return (
    <article className="mt-6">
      <div>
        <SourceLabel origin={passage.citation.origin} />
      </div>
      <h2 className="mt-4 text-2xl">{passage.citation.title}</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        {passage.citation.company} · {passage.citation.speaker}{' '}
        {passage.citation.speakerRole}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {passage.citation.interviewDate
          ? `Interview: ${passage.citation.interviewDate} · `
          : null}
        Published: {formatPublishedDate(passage.citation.publishedAt)}
      </p>
      <p className="mt-5 text-xs font-medium text-primary">
        {passage.section} ·{' '}
        {passage.isCurrentRevision
          ? 'Current revision'
          : 'Retained historical revision'}
      </p>
      <blockquote className="my-8 whitespace-pre-wrap break-words border-l-2 border-primary pl-5 font-serif text-xl leading-[1.78]">
        {passage.citation.quote}
      </blockquote>
      <EvidenceId identifier={passage.citation.citationId} label="passage" />
      <button
        type="button"
        className="quiet-action mt-5"
        onClick={() => {
          void copy.copy()
        }}
      >
        {copy.status}
      </button>
    </article>
  )
}
