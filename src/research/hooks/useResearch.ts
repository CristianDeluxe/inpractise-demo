import { submitInvestigation } from '@/operations/submitInvestigation'
import { submitQuestion } from '@/operations/submitQuestion'
import { submitSearch } from '@/operations/submitSearch'
import { useAnswerStages } from '@/research/hooks/useAnswerStages'
import { useInvestigationStages } from '@/research/hooks/useInvestigationStages'
import { useRequest } from '@/runtime/hooks/useRequest'
import type { SubmitEvent } from 'react'
import { useState } from 'react'

export function useResearch(company: string) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'search' | 'ask' | 'investigate'>('ask')
  const search = useRequest(submitSearch)
  const answer = useRequest(submitQuestion)
  const investigation = useRequest(submitInvestigation)
  const progress = useAnswerStages()
  const investigationProgress = useInvestigationStages()
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filter = company ? { company } : {}
    if (mode === 'search') {
      void search.run({ action: 'search', query, ...filter, limit: 10 })
      return
    }
    if (mode === 'investigate') {
      investigationProgress.reset()
      void investigation.run({
        request: { action: 'investigate', question: query, ...filter },
        onStage: investigationProgress.push,
      })
      return
    }
    progress.reset()
    void answer.run({
      request: { action: 'ask', query, ...filter },
      onStage: progress.push,
    })
  }
  return {
    query,
    setQuery,
    mode,
    setMode,
    search,
    answer,
    investigation,
    submit,
    progress,
    investigationProgress,
  }
}
