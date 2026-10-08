import { transcriptFixture } from './transcriptFixture'

/** Words spelling `text`, one per space-separated token. */
export function wordsOf(text: string) {
  const template = transcriptFixture().paragraphs[0]?.words[0]
  if (template === undefined) throw new Error('fixture')
  return text.split(' ').map((word) => ({ ...template, text: word }))
}
