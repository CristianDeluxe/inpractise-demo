/** The part of an MCP tool result that carries text blocks. */
export type McpToolResult = {
  content?: { type: string; text?: string }[]
}
