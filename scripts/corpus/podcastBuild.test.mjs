import assert from 'node:assert/strict'
import test from 'node:test'
import { createPodcastSource } from './createPodcastSource.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { readPodcastRecords } from './readPodcastRecords.mjs'
import { sectionLabel } from './sectionLabel.mjs'

test('podcast records normalise into attributed public_interview passages', async (context) => {
  const records = await readPodcastRecords(process.cwd())
  assert.equal(records.length, 2)
  await context.test('timestamps use mm:ss and h:mm:ss', () => {
    assert.equal(sectionLabel(0), '00:00')
    assert.equal(sectionLabel(28.32), '00:28')
    assert.equal(sectionLabel(3599.9), '59:59')
    assert.equal(sectionLabel(3600), '1:00:00')
    assert.equal(sectionLabel(3725), '1:02:05')
  })
  for (const record of records)
    await context.test(`${record.documentId} maps speakers and bounds`, () => {
      const source = createPodcastSource(record)
      const document = normaliseDocument(source, source.turns)
      assert.equal(document.kind, 'public_interview')
      assert.equal(document.origin, 'public')
      assert.equal(document.synthetic, false)
      assert.equal(document.sourceUrl, record.url)
      assert.equal(document.interviewDate, record.uploadDate)
      assert.ok(document.passages.length >= record.turns.length)
      assert.ok(
        document.passages.every(
          (passage) => Array.from(passage.text).length <= 1200,
        ),
      )
      const names = new Set([record.host.name, record.guest.name])
      assert.ok(document.passages.every((p) => names.has(p.speaker)))
      const first = document.passages[0]
      assert.equal(first.speaker, record.host.name)
      assert.equal(first.speakerRole, record.host.role)
      assert.equal(first.section, sectionLabel(record.turns[0].startSeconds))
      assert.equal(
        document.sourceText,
        record.turns.map((turn) => turn.text).join('\n\n'),
      )
    })
})
