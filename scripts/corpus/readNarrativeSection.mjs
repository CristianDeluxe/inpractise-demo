export function readNarrativeSection(blocks, boundary) {
  const [key, section, from, to] = boundary
  const selected = blocks.slice(from + 1, to)
  if (
    selected.length < 2 ||
    selected.reduce((sum, item) => sum + item.text.length, 0) < 500
  )
    throw new Error('SEC_NARRATIVE_EMPTY_OR_TOC')
  const coverage = {
    section,
    startBoundary: blocks[from],
    endBoundary: blocks[to],
    firstParagraph: selected.find((block) => block.text.length >= 200).text,
    lastParagraph: selected.findLast((block) => block.text.length >= 200).text,
    paragraphs: selected.length,
  }
  const turns = selected.map((block, index) => ({
    paragraphId: `${key}-${String(index + 1).padStart(4, '0')}`,
    section,
    speaker: 'Company disclosure',
    speakerRole: 'Company disclosure',
    text: block.text,
    sourceDom: block,
  }))
  return { turns, coverage }
}
