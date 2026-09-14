export type RecordRequestUsageFunction = {
  Args: { request: string; prompt: number; completion: number; total: number }
  Returns: undefined
}
