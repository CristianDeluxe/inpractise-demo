import { requestListener } from './requestListener.mjs'

export function originListener(apiListener) {
  return (request, response) => {
    let pathname
    try {
      pathname = new URL(request.url ?? '/', 'http://localhost').pathname
    } catch {
      void apiListener(request, response)
      return
    }
    if (pathname === '/api/v1' || pathname.startsWith('/api/v1/')) {
      void apiListener(request, response)
      return
    }
    requestListener(request, response)
  }
}
