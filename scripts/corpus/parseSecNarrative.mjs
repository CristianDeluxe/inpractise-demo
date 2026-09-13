import { load } from 'cheerio'
import { collectNarrativeBlocks } from './collectNarrativeBlocks.mjs'
import { locateNarrativeSections } from './locateNarrativeSections.mjs'
import { readNarrativeSection } from './readNarrativeSection.mjs'

export function parseSecNarrative(html) {
  const $ = load(html, { sourceCodeLocationInfo: true })
  const excludedTables = $('table').length
  $(
    'script,style,noscript,nav,header,footer,[hidden],[aria-hidden="true"],ix\\:hidden,ix\\:header',
  ).remove()
  $('[style]').each((_, element) => {
    if (
      /display\s*:\s*none|visibility\s*:\s*hidden/i.test(
        $(element).attr('style'),
      )
    )
      $(element).remove()
  })
  $('table').remove()
  const blocks = collectNarrativeBlocks($)
  const turns = []
  const sections = []
  for (const boundary of locateNarrativeSections(blocks)) {
    const section = readNarrativeSection(blocks, boundary)
    turns.push(...section.turns)
    sections.push(section.coverage)
  }
  return {
    turns,
    coverage: {
      sections,
      excludedTables,
      excluded: [
        {
          section: 'All other filing sections',
          reason:
            'Selected narrative only; tables and financial statements are not indexed.',
        },
        {
          section: 'Running page furniture',
          reason:
            'Standalone page numbers, PART labels, Item running headers, and Table of Contents links removed.',
        },
      ],
      boundaryReview: 'pending_owner',
    },
  }
}
