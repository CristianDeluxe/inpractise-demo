import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { PairText } from './PairText.ts'

/** Every `<name>.raw.txt` in the directory that has a matching `<name>.final.txt`. */
export function readPairs(dir: string): PairText[] {
  if (!existsSync(dir)) throw new Error(`Pairs directory not found: ${dir}`)
  return readdirSync(dir)
    .filter((file) => file.endsWith('.raw.txt'))
    .toSorted()
    .flatMap((file) => {
      const name = file.slice(0, -'.raw.txt'.length)
      const finalPath = join(dir, `${name}.final.txt`)
      return existsSync(finalPath)
        ? [
            {
              name,
              raw: readFileSync(join(dir, file), 'utf8'),
              final: readFileSync(finalPath, 'utf8'),
            },
          ]
        : []
    })
}
