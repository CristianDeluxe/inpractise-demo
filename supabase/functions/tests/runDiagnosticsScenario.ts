import { handleAsk } from '../research/actions/handleAsk.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import type { ViewAs } from '../research/ViewAs.ts'
import { diagnosticsTransportFixture } from './diagnosticsTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/** Answers one question as the given viewing mode and reports whether the
 * response carried a diagnostic record. */
export async function runDiagnosticsScenario(viewAs: ViewAs | undefined) {
  const fetcher = diagnosticsTransportFixture()
  const principal = effectivePrincipal(viewAsPrincipalFixture(fetcher), viewAs)
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  let result: unknown
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
      },
      async () => {
        result = await handleAsk(
          principal,
          'What does the source say?',
          undefined,
        )
      },
    )
  } finally {
    globalThis.fetch = original
  }
  return (result as { diagnostics?: unknown }).diagnostics
}
