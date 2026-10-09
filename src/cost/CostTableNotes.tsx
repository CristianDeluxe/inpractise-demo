/** What each column's number is, so the headers can stay short. */
export function CostTableNotes() {
  return (
    <p className="prose-measure mt-3 text-xs text-muted-foreground">
      Speech recognition is local (measured), with no API cost. Token counts are
      measured. The AI cleanup pass runs on a subscription lane, so it has no
      per-token API charge. Reliability is computed from the recorded words and
      edits. Spot-check time and minutes per audio hour are estimated from
      decision timestamps and are optional.
    </p>
  )
}
