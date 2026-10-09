import { speakerRuns } from '../speakers/speakerRuns'
import type { ReportBodyProps } from './ReportBodyProps'
import { ReportTurn } from './ReportTurn'

/** The AI-final transcript, one row per speaker turn. */
export function ReportBody({ paragraphs, speakers }: ReportBodyProps) {
  return (
    <section aria-label="AI-final transcript" className="mt-8 space-y-6">
      {paragraphs.flatMap((paragraph) =>
        speakerRuns(speakers, paragraph.words).map((run, index) => (
          <ReportTurn
            key={`${paragraph.id}-${String(index)}`}
            start={
              index === 0
                ? paragraph.start
                : (run.words[0]?.start ?? paragraph.start)
            }
            role={run.role}
            name={
              speakers === null || run.role === undefined
                ? null
                : speakers.names[run.role]
            }
            words={run.words}
          />
        )),
      )}
    </section>
  )
}
