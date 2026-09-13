/** Tool results are JSON text: a client renders them, it does not execute them. */
export function toolText(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  }
}
