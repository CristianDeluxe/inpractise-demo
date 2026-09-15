// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { InvestigationTrail } from './InvestigationTrail'
import { investigationStagesFixture } from './investigationStagesFixture'

afterEach(() => {
  cleanup()
})

describe('InvestigationTrail', () => {
  it('renders every phase and nests the planned sub-questions', () => {
    render(
      <InvestigationTrail
        stages={investigationStagesFixture()}
        pending={false}
      />,
    )
    expect(screen.getByText('Allowance debited')).toBeDefined()
    expect(screen.getByText('Planned 2 sub-questions')).toBeDefined()
    expect(
      screen.getByText('What did northstar say about pricing?'),
    ).toBeDefined()
    expect(
      screen.getByText(
        'What did harbor-logistics say about pricing? (harbor-logistics)',
      ),
    ).toBeDefined()
    expect(screen.getByText(/Step 1: 4 of 12 candidates kept/u)).toBeDefined()
    expect(screen.getByText(/Step 2 reformulated/u)).toBeDefined()
    expect(
      screen.getByText(/Synthesising from 5 passages across 2 sub-questions/u),
    ).toBeDefined()
  })
  it('renders nothing before the first stage arrives', () => {
    const { container } = render(
      <InvestigationTrail stages={[]} pending={false} />,
    )
    expect(container.innerHTML).toBe('')
  })
})
