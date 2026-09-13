import { Link, useLocation } from '@tanstack/react-router'

export function SignInInvitation() {
  const destination = useLocation({ select: (location) => location.href })
  return (
    <main id="main-content" className="page-shell py-16">
      <h1 className="text-3xl">Sign in to continue</h1>
      <p className="mt-5 text-muted-foreground">
        Sign in with your demo account to open{' '}
        <span className="break-all font-mono text-sm">{destination}</span>.
      </p>
      <Link to="/login" className="action mt-8">
        Sign in
      </Link>
    </main>
  )
}
