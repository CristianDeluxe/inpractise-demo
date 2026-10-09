export function DiffColumnLabels() {
  return (
    <div className="grid gap-1 px-3 pb-1 pt-2 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-5 md:px-4">
      <span aria-hidden="true" />
      <div className="eyebrow grid text-muted-foreground md:grid-cols-2 md:gap-8">
        <span>Raw machine transcript</span>
        <span>Corrected, reflecting your decisions</span>
      </div>
    </div>
  )
}
