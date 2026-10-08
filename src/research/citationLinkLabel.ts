import type { Citation } from '@/api/Citation'

/**
 * A claim can cite several excerpts, and every link under it used to read
 * "Source: s1:<64 hex>:P2" - unreadable on screen and indistinguishable to a
 * screen reader. The visible label names who said it and which excerpt of the
 * transcript it is; the exact server identity stays on the element's title,
 * and the citation card below still carries it in full.
 */
export function citationLinkLabel(citation: Citation) {
  return `${citation.speaker ?? citation.company}, excerpt ${citation.passageId}`
}
