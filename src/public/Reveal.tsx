import { animationDelay } from './animationDelay'
import { useReveal } from './hooks/useReveal'
import type { RevealProps } from './RevealProps'

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      data-visible="true"
      style={animationDelay(delay)}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  )
}
