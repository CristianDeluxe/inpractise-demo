/**
 * The guest, company and document identity for each imported podcast episode,
 * keyed by YouTube id. The transcript and diarization carry no reliable names,
 * so the owner-approved mapping lives here and is written into the committed
 * corpus/podcasts source file by importPodcast.mjs.
 */
export const PODCAST_GUESTS = {
  LQ6lAvNMjPE: {
    documentId: 'pod-roche-2024',
    company: 'Roche',
    companySlug: 'roche',
    guest: {
      name: 'Thomas Schinecker',
      role: 'Chief Executive Officer, Roche',
    },
  },
  A_z4Jow0c7A: {
    documentId: 'pod-novartis-2025',
    company: 'Novartis',
    companySlug: 'novartis',
    guest: {
      name: 'Vasant Narasimhan',
      role: 'Chief Executive Officer, Novartis',
    },
  },
}
