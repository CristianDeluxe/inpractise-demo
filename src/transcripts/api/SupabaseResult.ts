export type SupabaseResult<T> = {
  readonly data: T | null
  readonly error: { readonly message: string } | null
}
