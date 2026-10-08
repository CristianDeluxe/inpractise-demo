import type { TranscriptBundle } from '../api/TranscriptBundle'
import { correctionFixture } from './correctionFixture'
import { transcriptFixture } from './transcriptFixture'

export function bundleFixture(): TranscriptBundle {
  return {
    transcript: transcriptFixture(),
    correction: correctionFixture(),
    review: [],
  }
}
