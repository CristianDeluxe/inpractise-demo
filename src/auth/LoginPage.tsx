import { Wordmark } from '@/components/Wordmark'
import { Link } from '@tanstack/react-router'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  return (
    <main id="main-content" className="grid lg:grid-cols-2">
      <section className="ink-panel grain flex flex-col justify-between gap-16 p-8 md:p-16">
        <Link to="/">
          <Wordmark />
        </Link>
        <div>
          <p className="eyebrow text-brass">Evidence, within reach</p>
          <h1 className="mt-6 max-w-xl text-4xl leading-tight">
            Understand the business.
            <br />
            <em className="text-brass">Inspect the source.</em>
          </h1>
          <p className="mt-8 max-w-lg text-ink-muted">
            Public filings and fictional interviews, with exact passage
            citations and explicit limitations.
          </p>
        </div>
        <p className="text-sm text-ink-muted">
          Independent demonstration · Provisioned accounts only
        </p>
      </section>
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="eyebrow text-muted-foreground">Member access</p>
          <h2 className="mt-4 text-3xl">Welcome back.</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Sign in with your privately provisioned demo credentials. Public
            signup and password recovery are not part of this demo.
          </p>
          <LoginForm />
          <Link to="/" className="mt-8 block text-sm text-muted-foreground">
            ← Back to the demo
          </Link>
        </div>
      </section>
    </main>
  )
}
