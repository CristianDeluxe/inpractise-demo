/** True for a legend word, digit or short caption rather than a sentence. */
export function isPdfLabelItem(item, text) {
  const size = item.transform[0]
  if (/^\d+$/u.test(text)) return true
  if (size <= 7.2 && text.length < 20) return true
  if (size >= 12) return true
  return text.length < 40 && text === text.toUpperCase() && /[A-Z]/u.test(text)
}
