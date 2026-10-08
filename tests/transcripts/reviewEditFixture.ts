export function reviewEditFixture(
  id: string,
  from: string,
  to: string,
  category: 'entity' | 'grammar' = 'entity',
) {
  return { id, paragraphId: id.split('-')[0] ?? '', from, to, category }
}
