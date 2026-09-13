import { passwordLogin } from '@/auth/passwordLogin'
import { readCredential } from '@/auth/readCredential'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useNavigate } from '@tanstack/react-router'
import type { SubmitEvent } from 'react'
import { useEffect } from 'react'

export function usePasswordLogin() {
  const request = useRequest(passwordLogin)
  const navigate = useNavigate()
  useEffect(() => {
    if (request.state.status === 'success') void navigate({ to: '/app' })
  }, [navigate, request.state.status])
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
