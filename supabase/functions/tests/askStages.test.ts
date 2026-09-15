import type { ViewAs } from '../research/ViewAs.ts'
import { runStageScenario } from './runStageScenario.ts'

Deno.test('no stage discloses evidence before the recheck', async (t) => {
  await t.step('stages carry counts and phases, never prose', async () => {
    const { stages, result } = await runStageScenario(undefined)
    const answer = result as {
      claims: { text: string }[]
      citations: { quote: string }[]
    }
    if (!answer.claims.length || !answer.citations.length)
      throw new Error('Expected the fixture to produce a cited claim')
    for (const stage of stages) {
      const serialised = JSON.stringify(stage)
      for (const claim of answer.claims)
        if (serialised.includes(claim.text))
          throw new Error(`Stage ${stage.phase} disclosed claim text`)
      for (const citation of answer.citations)
        if (serialised.includes(citation.quote))
          throw new Error(`Stage ${stage.phase} disclosed a passage quotation`)
    }
  })
  await t.step(
    'the phases run in the order that gives them meaning',
    async () => {
      const { stages } = await runStageScenario(undefined)
      const order = stages.map((stage) => stage.phase).join(' ')
      if (order !== 'debited retrieved selected generating verifying')
        throw new Error(`Unexpected phase order: ${order}`)
    },
  )
  await t.step('every stage carries its own server-side duration', async () => {
    const { stages } = await runStageScenario(undefined)
    for (const stage of stages)
      if (typeof stage.elapsedMs !== 'number' || stage.elapsedMs < 0)
        throw new Error(`Stage ${stage.phase} carried no valid elapsedMs`)
  })
  await t.step(
    'per-candidate detail follows the effective principal',
    async () => {
      const reviewer = await runStageScenario(undefined)
      const retrieved = reviewer.stages.find(
        (stage) => stage.phase === 'retrieved',
      )
      if (retrieved?.phase !== 'retrieved' || !retrieved.candidateAt10)
        throw new Error('Unrestricted reviewer received no ranked candidates')
      const restricted: ViewAs[] = [{ role: 'member' }, { premium: false }]
      for (const viewAs of restricted)
        for (const stage of (await runStageScenario(viewAs)).stages) {
          if (stage.phase === 'retrieved' && stage.candidateAt10)
            throw new Error('A restricted view received ranked candidates')
          if (stage.phase === 'selected' && stage.selectedIds)
            throw new Error('A restricted view received selected identifiers')
        }
    },
  )
})
