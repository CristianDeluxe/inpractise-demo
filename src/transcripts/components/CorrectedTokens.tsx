import type { CorrectedTokensProps } from './CorrectedTokensProps'

export function CorrectedTokens({ tokens, inserted }: CorrectedTokensProps) {
  return (
    <p className="source-text">
      {tokens.map((token, index) => (
        <span key={`${String(index)}-${token}`}>
          {inserted[index] ? (
            <mark className="rounded-sm bg-success px-0.5 font-medium text-success-foreground underline decoration-2 underline-offset-4">
              {token}
            </mark>
          ) : (
            token
          )}{' '}
        </span>
      ))}
    </p>
  )
}
