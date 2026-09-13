import { readNarrativeBlock } from './readNarrativeBlock.mjs'

export function collectNarrativeBlocks($) {
  const blocks = []
  $('p,div,h1,h2,h3,h4,h5,h6,li').each((_, element) => {
    const block = readNarrativeBlock($, element)
    if (block) blocks.push(block)
  })
  return blocks
}
