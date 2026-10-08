/** Two document rows shaped like the library list; offline, not live revisions. */
export function podcastDocumentsFixture() {
  return [
    {
      document_id: 'pod-roche-2024',
      title: 'Roche CEO Thomas Schinecker on In Good Company',
      company: 'roche',
      interview_date: '2024-11-20',
      published_at: '2024-11-20T00:00:00Z',
      source_url: 'https://www.youtube.com/watch?v=LQ6lAvNMjPE',
    },
    {
      document_id: 'pod-novartis-2025',
      title: 'Novartis CEO Vasant Narasimhan on In Good Company',
      company: 'novartis',
      interview_date: '2025-06-25',
      published_at: '2025-06-25T00:00:00Z',
      source_url: 'https://www.youtube.com/watch?v=A_z4Jow0c7A',
    },
  ].map((row) => ({
    ...row,
    revision_id: 'rev-1',
    kind: 'public_interview',
    origin: 'public',
  }))
}
