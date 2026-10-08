export function DiffColumnLabels() {
  return (
    <div className="grid gap-6 px-4 pb-1 pt-2 md:grid-cols-[4.5rem_minmax(0,1fr)] md:px-5">
      <span aria-hidden="true" />
      <div className="eyebrow grid text-muted-foreground md:grid-cols-2 md:gap-8">
        <span>Raw machine transcript</span>
        <span>Corrected, reflecting your decisions</span>
      </div>
    </div>
  )
}
