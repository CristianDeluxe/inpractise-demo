import { assertYoutubeId } from './assertYoutubeId.ts'
import { ingestTranscript } from './ingestTranscript.ts'

await ingestTranscript(assertYoutubeId(process.argv[2]))
