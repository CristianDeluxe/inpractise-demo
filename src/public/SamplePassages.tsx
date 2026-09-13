import { DemoNotice } from '@/components/DemoNotice'
import type { SampleCardProps } from './SampleCardProps'

export function SamplePassages({ source }: SampleCardProps) {
  return (
    <div className="mt-6">
      <DemoNotice />
      <p className="mt-4 text-sm">
        {source.company} · {source.interviewDate}
      </p>
      {source.passages.map((passage) => (
        <blockquote
          className="source-text mt-4 border-l-2 border-primary pl-4"
          key={passage.passageId}
        >
          <span className="meta-text block">
            {passage.passageId} · {passage.speaker}
          </span>
          {passage.text}
        </blockquote>
      ))}
      <p className="mt-5 break-all font-mono text-xs text-muted-foreground">
        Document: {source.documentId}
        <br />
        Revision: {source.revisionId}
      </p>
    </div>
  )
}
