import { branchRowFixture } from '../../../tests/helpers/branchRowFixture.ts'
import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'
import { filingSourceFixture } from '../../../tests/helpers/filingSourceFixture.ts'
import type { CompareFixtureSides } from './CompareFixtureSides.ts'

/** One ranked row for the requested kind, or none when that side is switched off. */
export function compareRowsFixture(
  kind: string | null,
  sides: CompareFixtureSides,
) {
  const filing = kind === 'sec_filing'
  if (filing ? !sides.filings : !sides.interviews) return []
  const source = filing ? filingSourceFixture() : citationSourceFixture()
  return [
    branchRowFixture({
      document_id: source.documentId,
      revision_id: source.revisionId,
      passage_id: source.passageId,
    }),
  ]
}
