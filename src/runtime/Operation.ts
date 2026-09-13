import type { BrowserRuntime } from './BrowserRuntime'

export type Operation<A, T> = (
  runtime: BrowserRuntime,
  args: A,
  signal: AbortSignal,
) => Promise<T>
