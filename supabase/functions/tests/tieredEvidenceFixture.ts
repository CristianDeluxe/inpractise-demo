import { researchApiFixture } from './researchApiFixture.ts'

/**
 * Evidence reads as the database would answer them: a premium document is
 * absent whenever the query carries the basic-tier filter the restricted
 * principal adds, and present otherwise. Every other route keeps the shared
 * fixture's answer.
 */
export function tieredEvidenceFixture(url: URL): unknown {
  const restricted = [...url.searchParams.entries()].some(
    ([key, value]) => key.endsWith('required_tier') && value === 'eq.basic',
  )
  if (restricted && url.searchParams.get('document_id') === 'eq.premium')
    return []
  return researchApiFixture(url.pathname)
}
