export function NotEstablishedExample() {
  return (
    <div className="lift-card border border-border bg-card p-6 md:p-8 lg:col-span-7">
      <p className="eyebrow mb-4 text-muted-foreground">
        A question the interviews cannot answer
      </p>
      <p className="text-[15px] font-medium">
        What will Roche’s revenue be in 2030?
      </p>
      <div className="mt-5 border-l-2 border-border pl-4">
        <p className="eyebrow text-muted-foreground">
          Not established by these interviews
        </p>
        <p className="mt-2 font-serif text-lg leading-snug">
          No quote in these two interviews answers this.
        </p>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Ask never fills the gap with a guess. A missing answer is shown as
        missing, and a failed lookup is shown as an error instead.
      </p>
    </div>
  )
}
