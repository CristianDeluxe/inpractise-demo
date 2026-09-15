import { execFileSync } from 'node:child_process'

export function countTrackedFiles() {
  const areas = {
    tracked: [],
    source: ['src'],
    edge: ['supabase/functions'],
    migrations: ['supabase/migrations'],
    tests: ['tests'],
    docs: ['docs'],
  }
  const counts = {}
  for (const [area, paths] of Object.entries(areas)) {
    const output = execFileSync('git', ['ls-files', '--', ...paths], {
      encoding: 'utf8',
    })
    counts[area] = output.split('\n').filter(Boolean).length
  }
  return counts
}
