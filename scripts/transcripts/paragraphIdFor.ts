export function paragraphIdFor(position: number): string {
  return `p${String(position).padStart(4, '0')}`
}
