/** Attribute selector for the marks of one edit; quotes and backslashes escaped. */
export function editMarkQuery(editId: string): string {
  return `[data-edit-id="${editId.replace(/["\\]/g, '\\$&')}"]`
}
