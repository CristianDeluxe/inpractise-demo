export function LabUnavailable() {
  return (
    <main id="main-content" className="page-shell py-20">
      <p className="eyebrow text-muted-foreground">Local-only lab</p>
      <h1 className="mt-3 text-3xl md:text-4xl">
        This page needs the development server
      </h1>
      <p className="prose-measure mt-5 text-muted-foreground">
        Transcripts and audio live in a gitignored folder and are served by a
        development-only API. The public build ships none of that material. Run{' '}
        <code className="font-mono">pnpm dev</code> and open this page on
        localhost.
      </p>
    </main>
  )
}
