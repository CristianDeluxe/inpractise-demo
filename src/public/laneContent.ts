// The division of labour as the execution plan describes it, section 4.4.
export const laneContent = [
  {
    name: 'Planning documents',
    body: 'Seven research documents were written before the clock started: market and landing research, reusable assets, a Lovable brief, a members and admin specification, an askbot and MCP specification, a first build plan, and the one-day execution plan that replaced it. Where an earlier document disagrees with plan 07, the plan wins. Later slices got a spec and a task-by-task plan of their own, and ten ADRs record the decisions the code cannot explain.',
  },
  {
    name: 'Codex lane',
    body: 'Owns the files that must have exactly one owner: package.json and the lockfile, configuration, schemas and migrations, supabase/, the unit and integration tests, evals/ and scripts/db. Each block starts from named failing tests, and two of them must detect a deliberately dropped gold passage and a forged citation. Codex may not broaden the schema without owner review.',
  },
  {
    name: 'Claude Code lane',
    body: 'Owns corpus/ and the corpus scripts, src/, mcp/ and their tests. It imports the Lovable views onto the real evidence contract, builds the two-tool stdio MCP server, the reader and the read-only diagnostics screen. It may request a contract change from the other lane; it cannot introduce one.',
  },
  {
    name: 'Owner',
    body: 'Chooses the scope, holds every credential, stages and commits at checkpoints, reviews the live answers by hand, runs the real Claude Code MCP session and approves each deployment. During the six sleeping hours both lanes work only on already identified defects: two repair attempts per failure, no contract, schema, fixture or threshold change, and a handoff file instead of a guess.',
  },
] as const
