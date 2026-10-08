import { formatCount } from './formatCount'

export function formatWordCount(count: number): string {
  return `${formatCount(count)} ${count === 1 ? 'word' : 'words'}`
}
