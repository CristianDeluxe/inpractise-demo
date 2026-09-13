import type { Library } from '@/contracts/Library'

export function companyChoices(library: Library) {
  return [...new Set(library.items.map((document) => document.company))].sort()
}
