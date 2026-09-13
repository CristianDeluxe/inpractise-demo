import { readFileSync } from 'node:fs'
import { assertRetrievalGate } from './assertRetrievalGate.ts'
import type { DiagnosticInput } from './DiagnosticInput.ts'

export function checkRetrievalGate() {
  const path = process.argv[process.argv.indexOf('--input') + 1]
  if (!process.argv.includes('--input') || !path)
    throw new Error('Usage: pnpm eval:gate -- --input <report.json>')
  assertRetrievalGate(JSON.parse(readFileSync(path, 'utf8')) as DiagnosticInput)
  console.log('PASS: retrieval gate')
}

checkRetrievalGate()
