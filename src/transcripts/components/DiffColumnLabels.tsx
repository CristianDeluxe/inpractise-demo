export function DiffColumnLabels() {
  return (
    <div className="grid gap-6 px-3 pb-2 pt-6 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-6">
      <span aria-hidden="true" />
      <div className="eyebrow grid text-muted-foreground md:grid-cols-2 md:gap-8">
        <span>Raw machine transcript</span>
        <span>Corrected, reflecting your decisions</span>
      </div>
    </div>
  )
}
