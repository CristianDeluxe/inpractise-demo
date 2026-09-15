import type { CompareRelation } from './CompareRelation.ts'
import type { CompareScope } from './CompareScope.ts'
import type { CompareSide } from './CompareSide.ts'
import type { CompareSideName } from './CompareSideName.ts'

export type CompareResult = CompareScope & {
  sides: Record<CompareSideName, CompareSide>
  relations: CompareRelation[]
  uncovered: CompareSideName[]
}
