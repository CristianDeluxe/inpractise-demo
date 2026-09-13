import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { normaliseDocument } from './normaliseDocument.mjs'
import { renderTranscript } from './renderTranscript.mjs'
import { sha256 } from './sha256.mjs'
import { writeJson } from './writeJson.mjs'

export async function writeDocument(root, source, turns, options = {}) {
  const {
    extra = {},
    directory = 'corpus/normalised',
    stem = source.documentId,
  } = options
  const document = normaliseDocument(source, turns)
  let rawPath = extra.rawPath
  if (source.origin === 'synthetic') {
    await mkdir(`${root}/corpus/transcripts`, { recursive: true })
    rawPath = `corpus/transcripts/${stem}.txt`
    await writeFile(`${root}/${rawPath}`, renderTranscript(source, turns))
  }
  const normalisedPath = `${directory}/${stem}.json`
  await writeJson(`${root}/${normalisedPath}`, document)
  return {
    ...extra,
    sourceId: source.sourceId,
    documentId: source.documentId,
    title: source.title,
    company: source.company,
    companySlug: source.companySlug,
    origin: source.origin,
    kind: document.kind,
    sourceType: source.origin === 'synthetic' ? 'synthetic' : 'public_filing',
    synthetic: document.synthetic,
    fictional: document.fictional,
    requiredTier: source.requiredTier,
    sourceUrl: source.sourceUrl ?? null,
    interviewDate: source.interviewDate ?? null,
    publishedAt: source.publishedAt,
    disclosure: source.disclosure,
    rawPath,
    rawSha256: sha256(await readFile(`${root}/${rawPath}`)),
    normalisedPath,
    normalisedSha256: sha256(await readFile(`${root}/${normalisedPath}`)),
    revisionId: document.revisionId,
    passageCount: document.passages.length,
    vectorCount: 0,
    totalTokens: document.passages.reduce(
      (sum, passage) => sum + passage.tokenCount,
      0,
    ),
    parserVersion: document.configuration.parser,
    chunkerVersion: document.configuration.chunker,
    model: document.configuration.embeddingModel,
    indexMode: 'lexical_only',
  }
}
