export function projectPublicSample(documents) {
  return {
    notice:
      'Independent demo. Synthetic sources; no private In Practise research.',
    label: 'Curated example — not a live answer.',
    sources: documents
      .filter((document) => ['s1', 's2'].includes(document.documentId))
      .map((document) => ({
        documentId: document.documentId,
        revisionId: document.revisionId,
        title: document.title,
        company: document.company,
        synthetic: true,
        disclosure: document.disclosure,
        interviewDate: document.interviewDate,
        publishedAt: document.publishedAt,
        passages: document.passages.filter(
          (passage) =>
            passage.paragraphId === 'P2' ||
            passage.paragraphId === 'P3' ||
            passage.paragraphId === 'P4',
        ),
      })),
  }
}
