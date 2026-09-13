import { isPageFurniture } from './isPageFurniture.mjs'

export function readNarrativeBlock($, element) {
  if ($(element).find('p,div,h1,h2,h3,h4,h5,h6,li').length) return
  const text = $(element).text().replace(/\s+/gu, ' ').trim()
  if (isPageFurniture(text)) return
  return {
    text,
    anchor:
      $(element).attr('id') ??
      $(element).find('[id]').first().attr('id') ??
      null,
    sourceHtmlStartUtf16: element.sourceCodeLocation?.startOffset ?? null,
    sourceHtmlEndUtf16: element.sourceCodeLocation?.endOffset ?? null,
  }
}
