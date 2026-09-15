import type { EvaluationReportNoticeProps } from './EvaluationReportNoticeProps'

export function EvaluationReportNotice({
  diagnosis,
}: EvaluationReportNoticeProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-sans text-xl">No reviewed evaluation report</h2>
      <p className="mt-4 text-sm text-muted-foreground">
        No report is connected to this endpoint. Diagnosis: {diagnosis}. These
        counts do not measure answer quality.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Candidate recall and context selection are separate measurements. An
        induced retrieval miss must remain a failed diagnostic; an unreviewed
        question is not a measured correct refusal.
      </p>
    </section>
  )
}
