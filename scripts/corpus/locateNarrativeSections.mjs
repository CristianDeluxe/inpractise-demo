export function locateNarrativeSections(blocks) {
  const business = blocks
    .map((block, index) =>
      /^ITEM\s+1\s*(?:[.\-–—:]\s*)?BUSINESS\s*\.?$/i.test(block.text)
        ? index
        : -1,
    )
    .filter((index) => index >= 0)
  const risks = blocks
    .map((block, index) =>
      /^ITEM\s+1A\s*(?:[.\-–—:]\s*)?RISK FACTORS\s*\.?$/i.test(block.text)
        ? index
        : -1,
    )
    .filter((index) => index >= 0)
  const ends = blocks
    .map((block, index) =>
      /^ITEM\s+1B\s*(?:[.\-–—:]\s*)?UNRESOLVED STAFF COMMENTS\s*\.?$/i.test(
        block.text,
      )
        ? index
        : -1,
    )
    .filter((index) => index >= 0)
  if (
    business.length !== 1 ||
    risks.length !== 1 ||
    ends.length !== 1 ||
    !(business[0] < risks[0] && risks[0] < ends[0])
  )
    throw new Error('SEC_NARRATIVE_BOUNDARIES_AMBIGUOUS')
  return [
    ['business', 'Item 1. Business', business[0], risks[0]],
    ['risk', 'Item 1A. Risk Factors', risks[0], ends[0]],
  ]
}
