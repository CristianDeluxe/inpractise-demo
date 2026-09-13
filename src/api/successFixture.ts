export function successFixture(data: unknown, action = 'me'): Response {
  return Response.json({
    action,
    data,
    buildId: 'build-test',
    requestId: 'request-test',
  })
}
