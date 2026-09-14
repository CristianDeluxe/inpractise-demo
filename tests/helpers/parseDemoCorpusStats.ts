/**
 * Reads the landing figures out of their source file rather than importing it.
 * `src/` is typed for the browser and carries no Node types, so a test that
 * needs both the constant and `corpus/manifest.json` has to meet them here.
 */
export function parseDemoCorpusStats(source: string): Map<string, string> {
  const entries = [...source.matchAll(/label: '([^']+)', value: '([^']+)'/g)]
  return new Map(entries.map((entry) => [entry[1] ?? '', entry[2] ?? '']))
}
