import { usePasswordLogin } from '@/auth/hooks/usePasswordLogin'
import { RequestFeedback } from '@/components/RequestFeedback'

export function LoginForm() {
  const login = usePasswordLogin()
  return (
    <>
      <form onSubmit={login.submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            className="field"
            type="email"
            name="email"
            id="email"
            autoComplete="username"
            required
            disabled={login.state.status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            className="field"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            disabled={login.state.status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={login.state.status === 'loading'}
          className="action w-full"
        >
          Sign in →
        </button>
      </form>
      <RequestFeedback state={login.state} cancel={login.cancel} />
    </>
  )
}
