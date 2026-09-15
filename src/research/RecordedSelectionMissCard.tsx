import { recordedSelectionMiss } from './recordedSelectionMiss'

/**
 * The retained failure, stated as a measurement rather than a demonstration.
 * It is deliberately separate from whatever the reader just asked: this case
 * has gold passages, and an unlabeled live query does not.
 */
export function RecordedSelectionMissCard() {
  return (
    <section
      aria-label="Recorded selection miss"
      className="border border-border bg-secondary p-4 text-sm text-secondary-foreground"
    >
      <h3 className="font-sans text-base">
        A retained failure: case {recordedSelectionMiss.caseId}
      </h3>
      <p className="mt-2 text-xs">
        &ldquo;{recordedSelectionMiss.question}&rdquo; as the{' '}
        {recordedSelectionMiss.persona} persona. Expected{' '}
        <span className="font-mono">
          {recordedSelectionMiss.expectedStatus}
        </span>
        , observed{' '}
        <span className="font-mono">
          {recordedSelectionMiss.observedStatus}
        </span>
        .
      </p>
      <p className="mt-2 text-xs">{recordedSelectionMiss.capDecision}</p>
      <dl className="mt-3 space-y-1 font-mono text-xs">
        <div className="flex gap-3">
          <dt className="w-28 shrink-0 text-muted-foreground">Gold passages</dt>
          <dd className="break-all">
            {recordedSelectionMiss.goldIds.join(', ')}
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-28 shrink-0 text-muted-foreground">Ranked at</dt>
          <dd>{recordedSelectionMiss.observedRanks.join(' and ')}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-28 shrink-0 text-muted-foreground">Decision</dt>
          <dd className="break-all">{recordedSelectionMiss.adrPath}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs">
        Retrieval found the answer and selection dropped it. That is a selection
        loss, and it is fixed differently from a retrieval miss. The induced
        missing-gold control is a separate test.
      </p>
    </section>
  )
}
