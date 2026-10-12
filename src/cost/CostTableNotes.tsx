/** What each column's number is, so the headers can stay short. */
export function CostTableNotes() {
  return (
    <p className="prose-measure mt-3 text-xs text-muted-foreground">
      Speech recognition runs locally (measured), with no API cost. Token counts
      are measured. The AI cleanup pass runs on a subscription lane, so it has
      no per-token API charge. Reliability is computed from the recorded words
      and edits. Spot-check counts the edits a person has decided; its time is
      estimated from decision timestamps and is optional.
    </p>
  )
}
