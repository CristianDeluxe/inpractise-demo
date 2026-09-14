// @vitest-environment jsdom
import { DemoNotice } from '@/components/DemoNotice'
import { demoNoticeStorageKey } from '@/components/demoNoticeStorageKey'
import { demoNotice } from '@/components/disclosureText'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('DemoNotice', () => {
  it('stays dismissed for the next visit once the reader closes it', () => {
    render(<DemoNotice />)
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))

    expect(screen.queryByText(demoNotice)).toBeNull()
    expect(window.localStorage.getItem(demoNoticeStorageKey)).toBe('true')

    cleanup()
    render(<DemoNotice />)
    expect(screen.queryByText(demoNotice)).toBeNull()
  })

  it('shows the disclosure again when the stored preference is gone', () => {
    render(<DemoNotice />)
    expect(screen.getByText(demoNotice)).toBeTruthy()
  })
})
