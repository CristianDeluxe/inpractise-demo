/**
 * Shortens only the opaque parts of a server-owned identifier. A composite key
 * like `cost-2024:<64 hex>:business-0002` keeps the halves a reader can act on
 * and abbreviates the digest between them; the full value stays available
 * through the element that displays this.
 */
export function shortenIdentifier(identifier: string): string {
  return identifier
    .split(':')
    .map((segment) =>
      segment.length >= 24 && /^[0-9a-f]+$/.test(segment)
        ? `${segment.slice(0, 8)}…`
        : segment,
    )
    .join(':')
}
