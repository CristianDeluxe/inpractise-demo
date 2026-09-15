import { errorCopy } from '@/components/errorCopy'
import { submitQuestion } from '@/operations/submitQuestion'
import type { AskExchange } from '@/research/AskExchange'
import { askRequestFor } from '@/research/askRequestFor'
import { useAnswerStages } from '@/research/hooks/useAnswerStages'
import { settleExchange } from '@/research/settleExchange'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { requestFailure } from '@/runtime/requestFailure'
import type { SubmitEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

/**
 * One question at a time, each retrieved on its own. The transcript keeps what
 * was asked; it is never sent back to the model, so an answer depends on the
 * corpus rather than on the question before it.
 */
export function useAskChat(company: string) {
  const runtime = useRuntime()
  const [query, setQuery] = useState('')
  const [exchanges, setExchanges] = useState<AskExchange[]>([])
  const [pending, setPending] = useState(false)
  const progress = useAnswerStages()
  const active = useRef<AbortController | null>(null)
  useEffect(() => () => active.current?.abort(), [])
  const ask = async (question: string) => {
    const id = crypto.randomUUID()
    const controller = new AbortController()
    active.current?.abort()
    active.current = controller
    runtime.controllers.add(controller)
    setExchanges((current) => [
      ...current,
      { id, question, answer: undefined, failure: undefined },
    ])
    setQuery('')
    progress.reset()
    setPending(true)
    try {
      const envelope = await submitQuestion(
        runtime,
        { request: askRequestFor(question, company), onStage: progress.push },
        controller.signal,
      )
      setExchanges((current) =>
        settleExchange(current, id, { answer: envelope.data }),
      )
    } catch (error) {
      const failure = requestFailure(runtime, error)
      setExchanges((current) =>
        settleExchange(current, id, {
          failure:
            failure.status === 'cancelled' ? undefined : errorCopy(error),
        }),
      )
    } finally {
      runtime.controllers.delete(controller)
      if (active.current === controller) setPending(false)
    }
  }
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const question = query.trim()
    if (question) void ask(question)
  }
  return { query, setQuery, exchanges, pending, submit, progress }
}
