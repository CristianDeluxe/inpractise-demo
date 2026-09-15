import { expect, it } from 'vitest'
import { shortenIdentifier } from './shortenIdentifier'

it('abbreviates the digest and keeps the segments a reader can act on', () => {
  const revision =
    '15160e34c3737894ed8c389ea682cd7f6109d11a614b8d581cd69e64a1bf4b54'
  expect(shortenIdentifier(revision)).toBe('15160e34…')
  expect(shortenIdentifier(`cost-2024:${revision}:business-0002`)).toBe(
    'cost-2024:15160e34…:business-0002',
  )
})

it('leaves a short or non-hexadecimal segment whole', () => {
  expect(shortenIdentifier('s1:P2')).toBe('s1:P2')
  expect(shortenIdentifier('northstar-workflow-interview-2026')).toBe(
    'northstar-workflow-interview-2026',
  )
})
