import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { audioBucket } from './audioBucket'
import { audioUrlSeconds } from './audioUrlSeconds'

/**
 * A signed URL issued under the caller's session; Storage checks the read
 * policy before signing, and the URL itself supports range requests.
 */
export async function signAudioUrl(
  runtime: BrowserRuntime,
  object: string,
): Promise<string> {
  const { data, error } = await runtime.data.storage
    .from(audioBucket)
    .createSignedUrl(object, audioUrlSeconds)
  if (error) throw new Error(error.message)
  return data.signedUrl
}
