// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ledgerParagraphFixture } from '../fixtures/ledgerParagraphFixture'
import { ConfidenceWords } from './ConfidenceWords'

afterEach(cleanup)

describe('ConfidenceWords', () => {
  it('tints low and medium words and explains them in the title', () => {
    render(
      <ConfidenceWords
        words={ledgerParagraphFixture().words}
        onSeek={vi.fn()}
      />,
    )
    const low = screen.getByRole('button', { name: 'Northwynd' })
    expect(low.className).toContain('bg-destructive/15')
    expect(low.title).toBe('31% confidence, low. Flags: low-confidence, entity')
    expect(screen.getByRole('button', { name: 'twelve' }).className).toContain(
      'bg-warning',
    )
    expect(
      screen.getByRole('button', { name: 'Revenue' }).className,
    ).not.toMatch(/bg-(warning|destructive)/u)
  })

  it('underlines flagged words and strikes replaced ones', () => {
    render(
      <ConfidenceWords
        words={ledgerParagraphFixture().words}
        onSeek={vi.fn()}
        struck={[true]}
      />,
    )
    expect(screen.getByRole('button', { name: 'Ledgar' }).className).toContain(
      'decoration-dotted',
    )
    expect(screen.getByRole('button', { name: 'Revenue' }).className).toContain(
      'line-through',
    )
  })

  it('seeks to the start of a clicked word', () => {
    const onSeek = vi.fn()
    render(
      <ConfidenceWords
        words={ledgerParagraphFixture().words}
        onSeek={onSeek}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Northwynd' }))
    expect(onSeek).toHaveBeenCalledWith(2.5)
  })
})
