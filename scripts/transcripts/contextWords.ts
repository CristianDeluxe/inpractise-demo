/** Up to `count` whole words from the end (side 'before') or start (side 'after') of text. */
export function contextWords(
  text: string,
  side: 'before' | 'after',
  count: number,
): string {
  const words = text.split(' ').filter((word) => word !== '')
  return (side === 'before' ? words.slice(-count) : words.slice(0, count)).join(
    ' ',
  )
}
