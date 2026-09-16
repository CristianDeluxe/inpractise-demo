import { PDF_FOOTER_PATTERNS } from './pdfFooterPatterns.mjs'

/** True for the report's own running header/footer or rotated side label. */
export function isPdfFooterText(text) {
  return PDF_FOOTER_PATTERNS.some((pattern) =>
    pattern.test(text.replace(/\s+/gu, ' ')),
  )
}
