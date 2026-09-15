/**
 * Documents carry a company slug, which is the key the database filters on.
 * On screen the slug reads as a name: hyphens become spaces and each word is
 * capitalised. A value that already has spaces or capitals passes through
 * unchanged apart from the capitals, so no table of display names is needed.
 */
export function formatCompanyName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
