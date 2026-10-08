export type LabResource<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'unavailable' }
  | { readonly status: 'error'; readonly message: string }
  | { readonly status: 'ready'; readonly data: T }
