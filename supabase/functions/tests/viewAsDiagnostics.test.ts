import { runDiagnosticsScenario } from './runDiagnosticsScenario.ts'

Deno.test(
  'the diagnostic record follows the effective principal',
  async (t) => {
    await t.step('an unrestricted reviewer receives it', async () => {
      if (!(await runDiagnosticsScenario(undefined)))
        throw new Error('Unrestricted reviewer received no diagnostic record')
    })
    await t.step('viewing as a member withholds it', async () => {
      if (await runDiagnosticsScenario({ role: 'member' }))
        throw new Error('A member view received a diagnostic record')
    })
    await t.step('dropping premium withholds it', async () => {
      if (await runDiagnosticsScenario({ premium: false }))
        throw new Error('A basic view received a diagnostic record')
    })
  },
)
