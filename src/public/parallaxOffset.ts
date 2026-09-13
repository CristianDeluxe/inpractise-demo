export function parallaxOffset(
  rect: DOMRect,
  viewportHeight: number,
  speed: number,
) {
  const progress =
    (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight
  return Math.max(-80, Math.min(80, progress * speed * 240))
}
