import { reliabilityDefinition } from './reliabilityDefinition'

export function ReliabilityExplainer() {
  return (
    <details className="px-4 pt-2 text-sm text-muted-foreground">
      <summary className="cursor-pointer text-foreground">
        How reliability is computed
      </summary>
      <p className="mt-2 leading-relaxed">{reliabilityDefinition()}</p>
    </details>
  )
}
