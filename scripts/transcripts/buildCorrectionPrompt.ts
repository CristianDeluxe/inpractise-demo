import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import type { TranscriptSource } from '@/transcripts/contracts/TranscriptSource.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'

/** The user turn of one correction request. */
export function buildCorrectionPrompt(
  source: TranscriptSource,
  glossary: readonly MemoryEntry[],
  examples: readonly MemoryExample[],
  paragraphs: readonly PreparedParagraph[],
): string {
  const sections = [`Domain context: "${source.title}" from ${source.channel}.`]
  if (glossary.length > 0)
    sections.push(
      'Glossary of learned corrections (already applied; keep them):',
      ...glossary.map((entry) => `- "${entry.from}" -> "${entry.to}"`),
    )
  if (examples.length > 0)
    sections.push(
      'Examples of accepted corrections from earlier transcripts:',
      ...examples.map(
        (example) => `Raw: ${example.raw}\nCorrected: ${example.corrected}`,
      ),
    )
  sections.push(
    'Paragraphs to correct:',
    ...paragraphs.map(
      (paragraph) =>
        `<paragraph id="${paragraph.id}">\n${paragraph.marked}\n</paragraph>`,
    ),
  )
  return sections.join('\n\n')
}
