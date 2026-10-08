/** Horizontal position of a pointer inside an element, clamped to 0..1. */
export function pointerRatio(clientX: number, element: Element) {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0) return 0
  return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
}
