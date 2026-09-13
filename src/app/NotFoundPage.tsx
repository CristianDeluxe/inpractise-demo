import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main id="main-content" className="page-shell py-20">
      <h1 className="text-3xl">Page unavailable</h1>
      <p className="mt-5">
        This route is not part of the demo. Old document links cannot identify
        an exact passage.
      </p>
      <Link to="/app" className="action mt-8">
        Open the workspace
      </Link>
    </main>
  )
}
