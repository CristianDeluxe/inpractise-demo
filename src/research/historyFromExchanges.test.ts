import { describe, expect, it } from 'vitest'
import { answeredAnswerFixture } from './answeredAnswerFixture'
import { historyFromExchanges } from './historyFromExchanges'

describe('historyFromExchanges', () => {
  it('sends the last three answered turns and skips the rest', () => {
    const history = historyFromExchanges([
      {
        id: '1',
        question: 'q1',
        answer: answeredAnswerFixture('a1'),
        failure: undefined,
      },
      { id: '2', question: 'q2', answer: undefined, failure: 'Network down' },
      {
        id: '3',
        question: 'q3',
        answer: answeredAnswerFixture('a3'),
        failure: undefined,
      },
      {
        id: '4',
        question: 'q4',
        answer: answeredAnswerFixture('a4'),
        failure: undefined,
      },
      {
        id: '5',
        question: 'q5',
        answer: answeredAnswerFixture('a5'),
        failure: undefined,
      },
      { id: '6', question: 'q6', answer: undefined, failure: undefined },
    ])
    expect(history).toEqual([
      { question: 'q3', answer: 'a3' },
      { question: 'q4', answer: 'a4' },
      { question: 'q5', answer: 'a5' },
    ])
  })
})
