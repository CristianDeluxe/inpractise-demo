import { submitQuestion } from '@/operations/submitQuestion'
import { submitSearch } from '@/operations/submitSearch'
import { useRequest } from '@/runtime/hooks/useRequest'
import type { SubmitEvent } from 'react'
import { useState } from 'react'

export function useResearch(company: string) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'search' | 'ask'>('ask')
  const search = useRequest(submitSearch)
  const answer = useRequest(submitQuestion)
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filter = company ? { company } : {}
    if (mode === 'search')
      void search.run({ action: 'search', query, ...filter, limit: 10 })
    else void answer.run({ action: 'ask', query, ...filter })
  }
  return { query, setQuery, mode, setMode, search, answer, submit }
}
