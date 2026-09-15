import { buildStats } from './buildStats'

export function BuildMetrics() {
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="metric">
        <dt>Commits</dt>
        <dd>{buildStats.commitCount}</dd>
      </div>
      <div className="metric">
        <dt>Elapsed hours</dt>
        <dd>{buildStats.elapsedHours}</dd>
      </div>
      <div className="metric">
        <dt>Tracked files</dt>
        <dd>{buildStats.files.tracked}</dd>
      </div>
      <div className="metric">
        <dt>Migrations</dt>
        <dd>{buildStats.files.migrations}</dd>
      </div>
    </dl>
  )
}
