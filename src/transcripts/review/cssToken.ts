export function cssToken(
  style: CSSStyleDeclaration,
  name: string,
  fallback: string,
) {
  return style.getPropertyValue(name).trim() || fallback
}
