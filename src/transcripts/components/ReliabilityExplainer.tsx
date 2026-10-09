import { reliabilityDefinition } from './reliabilityDefinition'

export function ReliabilityExplainer() {
  return (
    <details className="text-sm text-muted-foreground">
      <summary className="cursor-pointer text-foreground">
        How reliability is computed
      </summary>
      <p className="mt-2 leading-relaxed">{reliabilityDefinition()}</p>
    </details>
  )
}
