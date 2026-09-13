import { readFile } from 'node:fs/promises'
import { sha256 } from './sha256.mjs'

export async function readCorpusArtifactHashes(root, authority) {
  return {
    core: { path: 'corpus/core.json', sha256: authority.coreSha256 },
    prompt: {
      path: 'corpus/generation-prompt.txt',
      sha256: authority.promptSha256,
    },
    sample: {
      path: 'corpus/sample.json',
      sha256: sha256(await readFile(`${root}/corpus/sample.json`)),
    },
    embeddings: {
      path: 'corpus/embeddings.json',
      sha256: sha256(await readFile(`${root}/corpus/embeddings.json`)),
    },
  }
}
