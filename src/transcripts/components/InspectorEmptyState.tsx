export function InspectorEmptyState() {
  return (
    <section className="lab-card space-y-3 p-4 text-sm text-muted-foreground">
      <h2 className="font-sans text-sm font-semibold tracking-normal text-foreground">
        No edit selected
      </h2>
      <p>
        Hover a highlighted change to preview it. Click it to review it here.
      </p>
      <p className="font-mono text-xs">
        <kbd className="kbd">j</kbd> <kbd className="kbd">k</kbd> next or
        previous flagged paragraph
      </p>
    </section>
  )
}
