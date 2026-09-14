export type HttpResult<T> =
  | { status: 200; data: T; etag: string | null; requestId: string }
  | { status: 304; etag: string; requestId: string }
