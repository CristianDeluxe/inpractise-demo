/**
 * A passage is text a third party wrote, so it must never be able to end its
 * own block and address the model as if it were an instruction. Every `<<<` the
 * passage contains is separated before the boundaries are added, which leaves
 * the prose readable and the boundary unforgeable.
 */
export function fenceSourceText(label: number, text: string): string {
  const neutralised = text.replaceAll('<<<', '< <<')
  const id = String(label)
  return `<<<PASSAGE ${id}>>>\n${neutralised}\n<<<END PASSAGE ${id}>>>`
}
