export type RequestState<T> =
  | { status: 'idle' | 'loading' | 'cancelled'; data?: never; error?: never }
  | { status: 'success'; data: T; error?: never }
  | { status: 'error'; error: unknown; data?: never }
