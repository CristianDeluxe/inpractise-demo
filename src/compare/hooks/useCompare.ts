import { submitComparison } from '@/operations/submitComparison'
import { useRequest } from '@/runtime/hooks/useRequest'
import type { SubmitEvent } from 'react'
import { useState } from 'react'
import { compareRequestFor } from '../compareRequestFor'
import { useCompareStages } from './useCompareStages'

export function useCompare(company: string) {
  const [topic, setTopic] = useState('')
  const request = useRequest(submitComparison)
  const progress = useCompareStages()
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    progress.reset()
    void request.run({
      request: compareRequestFor(topic, company),
      onStage: progress.push,
    })
  }
  return { company, topic, setTopic, request, submit, progress }
}
