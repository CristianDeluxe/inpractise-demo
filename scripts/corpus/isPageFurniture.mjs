export function isPageFurniture(text) {
  return (
    !text ||
    /^\d+$/.test(text) ||
    /^Item\s+\d+[A-Z]?(?:,\s*\d+[A-Z]?)*\.?$/i.test(text) ||
    /^(?:PART\s+[IVX]+|Table of Contents)$/i.test(text)
  )
}
