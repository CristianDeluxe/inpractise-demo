import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

/** Reads one lab resource through the caller's runtime. */
export type LabLoader<A, T> = (runtime: BrowserRuntime, arg: A) => Promise<T>
