import { submitQuestion } from '@/operations/submitQuestion'
import { submitSearch } from '@/operations/submitSearch'
import { useAnswerStages } from '@/research/hooks/useAnswerStages'
import { useRequest } from '@/runtime/hooks/useRequest'
import type { SubmitEvent } from 'react'
import { useState } from 'react'

export function useResearch(company: string) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'search' | 'ask'>('ask')
  const search = useRequest(submitSearch)
  const answer = useRequest(submitQuestion)
  const progress = useAnswerStages()
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filter = company ? { company } : {}
    if (mode === 'search') {
      void search.run({ action: 'search', query, ...filter, limit: 10 })
      return
    }
    progress.reset()
    void answer.run({
      request: { action: 'ask', query, ...filter },
      onStage: progress.push,
    })
  }
  return { query, setQuery, mode, setMode, search, answer, submit, progress }
}
