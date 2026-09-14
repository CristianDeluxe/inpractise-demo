import { libraryPayloadFixture } from './libraryPayloadFixture'
import { uiPayloadFixture } from './uiPayloadFixture'

export function viewAsPayloadFixture(request: Record<string, unknown>) {
  const action = String(request['action'])
  const mode = request['viewAs'] as
    { role?: 'member'; premium?: false } | undefined
  const realPrincipal = { orgId: 'demo-org', role: 'reviewer', premium: true }
  const effectivePrincipal = {
    ...realPrincipal,
    role: mode?.role ?? realPrincipal.role,
    premium: mode?.premium ?? realPrincipal.premium,
  }
  if (action === 'me')
    return { ...effectivePrincipal, realPrincipal, effectivePrincipal }
  if (action === 'list') {
    const first = libraryPayloadFixture().items[0]
    return {
      items: [
        { ...first, passage_count: 3 },
        ...(mode?.premium === false
          ? []
          : [
              {
                ...first,
                document_id: 'premium-document',
                company: 'Premium Company',
                passage_count: 7,
              },
            ]),
      ],
    }
  }
  return uiPayloadFixture(action)
}
