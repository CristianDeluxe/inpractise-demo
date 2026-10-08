/** Removes the [[word|0.81]] markup the corrector prompt adds, including fragments the model echoes back. */
export function stripUncertaintyMarkup(text: string): string {
  return text
    .replaceAll(/\[\[([^|\]]+)\|[\d.]+\]\]/g, '$1')
    .replaceAll(/\|[\d.]+(?:\]\])?/g, '')
    .replaceAll(/\[\[|\]\]/g, '')
}
