import type { TranscriptBundle } from '../api/TranscriptBundle'
import { bundleFixture } from './bundleFixture'
import { correctionFixture } from './correctionFixture'

/** The synthetic bundle where the model is unsure of the second edit (0.6): it stays unapplied. */
export function uncertainBundleFixture(): TranscriptBundle {
  const correction = correctionFixture()
  return {
    ...bundleFixture(),
    correction: {
      ...correction,
      paragraphs: correction.paragraphs.map((paragraph) => ({
        ...paragraph,
        edits: paragraph.edits.map((edit) =>
          edit.id === 'e2' ? { ...edit, confidence: 0.6 } : edit,
        ),
      })),
    },
  }
}
