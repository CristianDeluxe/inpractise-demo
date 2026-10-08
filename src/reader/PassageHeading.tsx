import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { SourceLabel } from '@/components/SourceLabel'
import type { PassageViewProps } from './PassageViewProps'

export function PassageHeading({ passage }: PassageViewProps) {
  const { citation } = passage
  return (
    <>
      <div>
        <SourceLabel origin={citation.origin} kind={citation.kind} />
      </div>
      <h2 className="mt-4 text-2xl">{citation.title}</h2>
      <p className="mt-3 text-base font-medium">
        {citation.speaker ?? formatCompanyName(citation.company)}
        {citation.speakerRole ? `, ${citation.speakerRole}` : ''}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {citation.interviewDate
          ? `Interview: ${citation.interviewDate} · `
          : null}
        Published: {formatPublishedDate(citation.publishedAt)}
      </p>
    </>
  )
}
