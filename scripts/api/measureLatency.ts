import { measureWorkflow } from './latency/measureWorkflow.ts'
import { writeLatencyReport } from './latency/writeLatencyReport.ts'

/**
 * Records one labelled latency run in docs/api-latency.json and prints it.
 * Usage: pnpm api:latency [label] [count]
 */
export async function measureLatency(argv: readonly string[]): Promise<void> {
  const run = await measureWorkflow(Number(argv[1] ?? 10))
  writeLatencyReport(argv[0] ?? 'deployed', run)
  console.log(JSON.stringify(run, null, 2))
}

await measureLatency(process.argv.slice(2))
