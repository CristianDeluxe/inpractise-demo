import { percentile } from './percentile.ts'

export function summariseSamples(samples: readonly number[]) {
  return {
    p50: percentile(samples, 50),
    p95: percentile(samples, 95),
    min: Math.round(Math.min(...samples)),
    max: Math.round(Math.max(...samples)),
  }
}
