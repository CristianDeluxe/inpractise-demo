// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SubQuestionBreakdown } from './SubQuestionBreakdown'

afterEach(() => {
  cleanup()
})

describe('SubQuestionBreakdown', () => {
  it('shows the reformulation when a part was refined', () => {
    render(
      <SubQuestionBreakdown
        subQuestions={[
          {
            index: 2,
            question: 'What did harbor-logistics disclose about pricing?',
            originalQuestion: 'What did harbor-logistics say about pricing?',
            status: 'partial',
            mode: 'lexical_only',
            candidateCount: 3,
            selectedCount: 1,
            suppliedCount: 1,
            citationIds: ['harbor:rev-1:p-1'],
          },
        ]}
      />,
    )
    expect(screen.getByText(/Reformulated from:/u)).toBeDefined()
  })
  it('renders nothing when the answer supplied no sub-questions', () => {
    const { container } = render(<SubQuestionBreakdown subQuestions={[]} />)
    expect(container.innerHTML).toBe('')
  })
})
