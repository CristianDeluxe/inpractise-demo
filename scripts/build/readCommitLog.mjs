import { execFileSync } from 'node:child_process'

// Oldest first. Author dates keep the committer's own offset, so the half-day
// grouping reads the clock the commits were made on, not the machine's.
export function readCommitLog() {
  const output = execFileSync(
    'git',
    ['log', '--reverse', '--format=%h%x09%aI%x09%s'],
    { encoding: 'utf8' },
  )
  return output
    .trim()
    .split('\n')
    .map((line) => {
      const [hash = '', date = '', ...subject] = line.split('\t')
      return { hash, date, subject: subject.join('\t') }
    })
}
