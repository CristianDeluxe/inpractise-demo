import { createServer } from 'node:http'
import { fixtureResearchListener } from '../../tests/api/fixtureResearchListener.ts'

export function startFixtureBackend(): void {
  const server = createServer((request, response) => {
    void fixtureResearchListener(request, response)
  })
  server.listen(
    Number(process.env['FIXTURE_PORT'] ?? 4398),
    '127.0.0.1',
    () => {
      process.stdout.write('Offline fixture ready\n')
    },
  )
  setTimeout(() => {
    server.closeAllConnections()
    server.close()
  }, 120000).unref()
}
