import { nextPathFrom } from '@/auth/nextPathFrom'
import { passwordLogin } from '@/auth/passwordLogin'
import { readCredential } from '@/auth/readCredential'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useLocation, useNavigate } from '@tanstack/react-router'
import type { SubmitEvent } from 'react'
import { useEffect } from 'react'

export function usePasswordLogin() {
  const request = useRequest(passwordLogin)
  const navigate = useNavigate()
  const next = useLocation({
    select: (location) => nextPathFrom(location.searchStr),
  })
  useEffect(() => {
    if (request.state.status !== 'success') return
    if (next === undefined) void navigate({ to: '/app' })
    else void navigate({ href: next })
  }, [navigate, next, request.state.status])
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    void request.run({
      email: readCredential(form, 'email'),
      password: readCredential(form, 'password'),
    })
  }
  return { ...request, submit }
}
