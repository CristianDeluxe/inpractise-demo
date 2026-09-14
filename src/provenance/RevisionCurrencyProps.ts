import type { parseProvenanceData } from '@/contracts/parseProvenanceData'

export type RevisionCurrencyProps = {
  revisions: ReturnType<typeof parseProvenanceData>['revisions']
}
