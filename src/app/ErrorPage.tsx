import { Link } from '@tanstack/react-router'

export function ErrorPage() {
  return (
    <main id="main-content" className="page-shell py-20">
      <h1 className="text-3xl">This page could not load</h1>
      <p className="mt-5">No unvalidated response will be displayed.</p>
      <Link to="/" className="action mt-8">
        Return home
      </Link>
    </main>
  )
}
