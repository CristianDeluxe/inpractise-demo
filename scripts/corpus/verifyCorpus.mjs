import { readJson } from './readJson.mjs'
import { verifyAcceptedDocuments } from './verifyAcceptedDocuments.mjs'
import { verifyAcquisition } from './verifyAcquisition.mjs'
import { verifyAnnualReportAcquisition } from './verifyAnnualReportAcquisition.mjs'
import { verifyAnnualReportCandidates } from './verifyAnnualReportCandidates.mjs'
import { verifyCorpusArtifacts } from './verifyCorpusArtifacts.mjs'
import { verifyCorpusFixtures } from './verifyCorpusFixtures.mjs'
import { verifyFrozenCore } from './verifyFrozenCore.mjs'
import { verifyGenerationRecords } from './verifyGenerationRecords.mjs'
import { verifyGenerationRound } from './verifyGenerationRound.mjs'
import { verifyManifest } from './verifyManifest.mjs'
import { verifyReviewCandidates } from './verifyReviewCandidates.mjs'

export async function verifyCorpus(root) {
  const manifest = await readJson(`${root}/corpus/manifest.json`)
  const authority = await readJson(`${root}/corpus/authority.json`)
  const core = await verifyFrozenCore(root, authority)
  await verifyManifest(root, manifest)
  const accepted = await verifyAcceptedDocuments(root, manifest, {
    core,
    authority,
  })
  await verifyCorpusArtifacts(root, { manifest, accepted, core })
  await verifyCorpusFixtures(root, manifest, core)
  await verifyAcquisition(root, manifest)
  await verifyAnnualReportAcquisition(root, manifest)
  const { reviews, candidatePassages } = await verifyReviewCandidates(root)
  const annualReports = await verifyAnnualReportCandidates(root)
  const attempts = await verifyGenerationRecords(root, manifest, authority)
  const regenerationAttempts = await verifyGenerationRound(root, manifest, core)
  return [
    `PASS: ${manifest.documentCount} accepted documents; ${manifest.passageCount} passages; 24/24 immutable gold paragraphs.`,
    `PASS: raw/canonical hashes, deterministic replay, Unicode offsets, attribution, token bounds and S1/S2-only sample.`,
    `PASS: 2 isolated revision/access fixtures; ${reviews.documents.filter((entry) => entry.status === 'parsed_pending_review').length} acquired SEC candidates; ${candidatePassages} candidate passages replayed from raw HTML.`,
    `PASS: ${annualReports.candidates} acquired annual-report candidate(s); ${annualReports.candidatePassages} candidate passages replayed from raw PDF bytes.`,
    `PASS: ${attempts}/10 generation attempts accounted for; indexMode=lexical_only; vectorCount=0.`,
    `PASS: ${regenerationAttempts}/12 Briefing I attempts accounted for; ${manifest.regeneration.records.filter((record) => record.status === 'generated_pending_review').length}/5 expanded drafts passed; owner review pending.`,
    `MODE: ${manifest.mode}; public accepted=${manifest.publicDocumentCount}; public excluded=${manifest.excluded.length}; short synthetic fixtures.`,
  ]
}
