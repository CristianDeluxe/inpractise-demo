import { loadCorpus } from './loadCorpus.ts'

export function loadRetrievalGold() {
  const document = loadCorpus().find((d) => d.documentId === 's1')
  const gold = document?.passages.find((p) => p.passageId === 'P2')
  if (!document || !gold)
    throw new Error('G01 source missing from frozen corpus')
  return { document, gold }
}
