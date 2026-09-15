// Every claim on the /built page points at the public repository file that
// carries it. Anchors follow GitHub's heading slugs.
export const buildSourceLinks = {
  plan: 'https://github.com/CristianDeluxe/inpractise-demo/blob/main/docs/research/07-one-day-execution-plan.md',
  disposition:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/docs/research/07-one-day-execution-plan.md#2-adversarial-disposition-of-the-old-specifications',
  ownership:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/docs/research/07-one-day-execution-plan.md#44-exact-prompts-and-agent-ownership',
  commits: 'https://github.com/CristianDeluxe/inpractise-demo/commits/main',
  collector:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/scripts/build/collectBuildStats.mjs',
  workLog:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/TODO_LOG.md',
  baseline:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/docs/baseline.md',
  evals:
    'https://github.com/CristianDeluxe/inpractise-demo/blob/main/docs/evals.md',
  decisions:
    'https://github.com/CristianDeluxe/inpractise-demo/tree/main/docs/adr',
  slices:
    'https://github.com/CristianDeluxe/inpractise-demo/tree/main/docs/superpowers',
} as const
