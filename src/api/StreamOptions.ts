import type { RequestOptions } from './RequestOptions.ts'

/** Request options plus the callback that receives each streamed stage. */
export type StreamOptions<S> = RequestOptions & { onStage: (stage: S) => void }
