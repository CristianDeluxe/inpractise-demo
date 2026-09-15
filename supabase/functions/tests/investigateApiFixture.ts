import type { InvestigateScenarioOptions } from './InvestigateScenarioOptions.ts'
import { researchApiFixture } from './researchApiFixture.ts'

/**
 * The Supabase routes an investigation adds to a standalone ask: the company
 * list the planner reads, and candidate retrieval that returns nothing for
 * the queries the scenario names empty.
 */
export async function investigateApiFixture(
  key: string,
  request: Request,
  options: InvestigateScenarioOptions,
): Promise<unknown> {
  if (key === '/rest/v1/document_revisions?companies')
    return [{ company: 'northstar-workflow' }, { company: 'harbor-logistics' }]
  if (key.startsWith('/rest/v1/rpc/search_candidates')) {
    const body = (await request.clone().json()) as { query_text?: string }
    if (options.emptyQueries?.includes(body.query_text ?? '')) return []
  }
  return researchApiFixture(key)
}
