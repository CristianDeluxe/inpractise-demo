import type { Citation } from '@/api/Citation'

/**
 * A claim can cite several passages, and every link under it used to read
 * "Source: s1:<64 hex>:P2" - unreadable on screen and indistinguishable to a
 * screen reader. The visible label names the document and the passage; the
 * exact server identity stays on the element's title, and the citation card
 * below still carries it in full.
 */
export function citationLinkLabel(citation: Citation) {
  return `${citation.company}, passage ${citation.passageId}`
}
