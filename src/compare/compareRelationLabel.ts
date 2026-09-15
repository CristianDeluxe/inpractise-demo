import { compareRelationLabels } from './compareRelationLabels'

export function compareRelationLabel(
  relation: keyof typeof compareRelationLabels,
): string {
  return compareRelationLabels[relation]
}
