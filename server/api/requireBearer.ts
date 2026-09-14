import { FacadeError } from './FacadeError.ts'

export function requireBearer(request: Request): string {
  const authorization = request.headers.get('authorization')
  if (!authorization || !/^Bearer \S+$/i.test(authorization))
    throw new FacadeError(
      401,
      'unauthenticated',
      'A caller bearer token is required.',
    )
  return authorization
}
