import { readFileSync, writeFileSync } from 'node:fs'

/**
 * Adds one labelled run under `research` in the existing report, leaving the
 * facade measurement and any other run in place.
 */
export function writeLatencyReport(label: string, run: unknown): void {
  const current = JSON.parse(readFileSync('docs/api-latency.json', 'utf8')) as {
    research?: Record<string, unknown>
  }
  const next = {
    ...current,
    research: { ...current.research, [label]: run },
  }
  writeFileSync('docs/api-latency.json', `${JSON.stringify(next, null, 2)}\n`)
}
