import assert from 'node:assert/strict'
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises'
import { dirname } from 'node:path'
import test from 'node:test'
import { assertSecUrl } from './assertSecUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import './generationBudget.test.mjs'
import './generationValidation.test.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseSecNarrative } from './parseSecNarrative.mjs'
import { readJson } from './readJson.mjs'
import { selectFiling } from './selectors/selectFiling.mjs'
import { sha256 } from './sha256.mjs'
import { verifyDocument } from './verifyDocument.mjs'
import { writeJson } from './writeJson.mjs'

test('corpus failure detection and source boundaries', async (context) => {
  const root = process.cwd()
  const core = await readJson(`${root}/corpus/core.json`)
  const manifest = await readJson(`${root}/corpus/manifest.json`)
  await context.test(
    'single-speaker Unicode fragments retain every code point',
    () => {
      const source = structuredClone(core.documents[0])
      source.turns = [
        {
          ...source.turns[1],
          paragraphId: 'P5',
          text: 'Café, a supplementary character 𝄞, and a careful handoff. '.repeat(
            75,
          ),
        },
      ]
      const document = normaliseDocument(source)
      assert.ok(document.passages.length > 1)
      assert.equal(
        document.passages.map((passage) => passage.text).join(''),
        source.turns[0].text,
      )
      assert.ok(
        document.passages.every(
          (passage) => passage.endChar <= 1200 && passage.tokenCount <= 450,
        ),
      )
      assert.deepEqual(normaliseDocument(source), document)
    },
  )
  await context.test(
    'SEC source selection rejects guesses and hostile URLs',
    () => {
      for (const url of [
        'http://www.sec.gov/Archives/x',
        'https://evil.example/submissions/CIK0000789019.json',
        'https://data.sec.gov/submissions/../../secret',
        'https://data.sec.gov/submissions/CIK0000789019.json?redirect=evil',
        'https://user:password@data.sec.gov/submissions/CIK0000789019.json',
      ])
        assert.throws(() => assertSecUrl(url))
      const rows = {
        form: ['10-K/A', '10-K'],
        reportDate: ['2024-06-30', '2024-06-30'],
        accessionNumber: ['0000000000-24-000001', '0000000000-24-000002'],
        primaryDocument: ['amend.htm', 'actual.htm'],
        filingDate: ['2024-08-01', '2024-07-30'],
      }
      assert.deepEqual(
        selectFiling(rows, { form: '10-K', reportDate: '2024-06-30' }),
        [
          {
            accession: rows.accessionNumber[1],
            primaryDocument: 'actual.htm',
            filingDate: '2024-07-30',
          },
        ],
      )
    },
  )
  await context.test(
    'narrative boundaries exclude TOC, hidden content and tables',
    () => {
      const paragraph =
        'A narrative paragraph describes an observed business process and its operating context. '.repeat(
          5,
        )
      const html = `<table><tr><td>ITEM 1. BUSINESS</td><td>ITEM 1A. RISK FACTORS</td></tr></table><h2 id="business">Item 1—Business</h2><p>${paragraph}</p><p>${paragraph}</p><div style="display:none">HIDDEN FACT</div><script>HOSTILE SCRIPT</script><h2 id="risk">ITEM 1A. RISK FACTORS</h2><p>${paragraph}</p><p>${paragraph}</p><table><tr><td>EXCLUDED FIGURE</td></tr></table><h2>ITEM 1B. UNRESOLVED STAFF COMMENTS</h2>`
      const parsed = parseSecNarrative(html)
      assert.equal(parsed.turns.length, 4)
      assert.equal(parsed.coverage.excludedTables, 2)
      assert.ok(
        !JSON.stringify(parsed.turns).match(
          /HIDDEN FACT|HOSTILE SCRIPT|EXCLUDED FIGURE/,
        ),
      )
      assert.throws(() =>
        parseSecNarrative('<p>No verifiable section boundaries.</p>'),
      )
      assert.throws(() =>
        parseSecNarrative(
          html.replace(
            '<h2 id="risk">',
            '<h2>ITEM 1. BUSINESS</h2><h2 id="risk">',
          ),
        ),
      )
    },
  )
  await context.test(
    'tampered file bytes, offsets, speaker and omitted passages are rejected',
    async () => {
      const temporary = await mkdtemp(`${root}/scripts/corpus/.test-run-`)
      const originalEntry = manifest.documents[0]
      try {
        await mkdir(dirname(`${temporary}/${originalEntry.normalisedPath}`), {
          recursive: true,
        })
        await mkdir(dirname(`${temporary}/${originalEntry.rawPath}`), {
          recursive: true,
        })
        await copyFile(
          `${root}/${originalEntry.rawPath}`,
          `${temporary}/${originalEntry.rawPath}`,
        )
        const originalBytes = await readFile(
          `${root}/${originalEntry.normalisedPath}`,
        )
        await writeFile(
          `${temporary}/${originalEntry.normalisedPath}`,
          originalBytes,
        )
        await verifyDocument(temporary, originalEntry)
        await writeFile(
          `${temporary}/${originalEntry.normalisedPath}`,
          `${originalBytes} `,
        )
        await assert.rejects(
          verifyDocument(temporary, originalEntry),
          /NORMALISED_FILE_HASH/,
        )
        for (const mutation of ['offset', 'speaker', 'missing', 'text']) {
          const document = JSON.parse(originalBytes.toString('utf8'))
          if (mutation === 'offset') document.passages[1].sourceStartChar = 1
          if (mutation === 'speaker')
            document.passages[1].speaker = document.moderatorName
          if (mutation === 'missing') document.passages.splice(1, 1)
          if (mutation === 'text')
            document.passages[1].text = 'An invented replacement claim.'
          const payload = Object.fromEntries(
            Object.entries(document).filter(([key]) => key !== 'revisionId'),
          )
          document.revisionId = sha256(`${canonicalJson(payload)}\n`)
          await writeJson(
            `${temporary}/${originalEntry.normalisedPath}`,
            document,
          )
          const entry = {
            ...originalEntry,
            revisionId: document.revisionId,
            passageCount: document.passages.length,
            normalisedSha256: sha256(
              await readFile(`${temporary}/${originalEntry.normalisedPath}`),
            ),
          }
          await assert.rejects(verifyDocument(temporary, entry))
        }
      } finally {
        assert.ok(temporary.startsWith(`${root}/scripts/corpus/.test-run-`))
        await rm(temporary, { recursive: true })
      }
    },
  )
})
