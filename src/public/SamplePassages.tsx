import type { SampleCardProps } from './SampleCardProps'

export function SamplePassages({ source }: SampleCardProps) {
  return (
    <div className="mt-6">
      <p className="text-sm">
        {source.company} · {source.interviewDate}
      </p>
      {source.passages.map((passage) => (
        <blockquote
          className={`source-text mt-4 border-l-2 pl-4 ${passage.passageId === source.passages[0].passageId ? 'border-primary bg-accent/60 py-2' : 'border-border'}`}
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
