/** Reads the single text block a tool result carries. */
export function mcpToolText(result: unknown): string {
  const content = (result as { content?: { type: string; text?: string }[] })
    .content
  const first = content?.[0]
  if (!first || first.type !== 'text' || first.text === undefined)
    throw new Error('The tool result carried no text block')
  return first.text
}
