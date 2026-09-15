import { submitQuestion } from '@/operations/submitQuestion'
import type { AskExchange } from '@/research/AskExchange'
import { askRequestFor } from '@/research/askRequestFor'
import { chatFailureText } from '@/research/chatFailureText'
import { chatQuestionFromSubmit } from '@/research/chatQuestionFromSubmit'
import { useAnswerStages } from '@/research/hooks/useAnswerStages'
import { settleExchange } from '@/research/settleExchange'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import type { SubmitEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

/**
 * One question at a time. A follow-up travels with the last few settled turns,
 * which the server uses only to rewrite it into a standalone question; that
 * rewritten question is what gets retrieved, and it comes back with the answer.
 * Nothing is stored server-side and a reload starts an empty transcript.
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
        {
          request: askRequestFor(question, company, exchanges),
          onStage: progress.push,
        },
        controller.signal,
      )
      setExchanges((current) =>
        settleExchange(current, id, { answer: envelope.data }),
      )
    } catch (error) {
      setExchanges((current) =>
        settleExchange(current, id, {
          failure: chatFailureText(runtime, error),
        }),
      )
    } finally {
      runtime.controllers.delete(controller)
      if (active.current === controller) setPending(false)
    }
  }
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    const question = chatQuestionFromSubmit(event, query)
    if (question) void ask(question)
  }
  return { query, setQuery, exchanges, pending, submit, progress }
}
