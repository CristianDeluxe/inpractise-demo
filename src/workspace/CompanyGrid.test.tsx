// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { CompanyGrid } from './CompanyGrid'

afterEach(() => {
  cleanup()
})

it('says so when the database returned no company at all', () => {
  render(<CompanyGrid library={{ items: [] }} />)
  expect(
    screen.getByText('No company is visible to this account.'),
  ).toBeTruthy()
  expect(screen.queryByRole('list')).toBeNull()
})
