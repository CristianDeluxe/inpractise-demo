import type { ResponseMetaProps } from './ResponseMetaProps'

export function ResponseMeta({ buildId, requestId }: ResponseMetaProps) {
  return (
    <details className="mt-6 text-xs text-muted-foreground">
      <summary className="cursor-pointer">Request details</summary>
      <p className="mt-2 break-all font-mono">
        Build: {buildId}
        <br />
        Request: {requestId}
      </p>
    </details>
  )
}
