import { useParallax } from './hooks/useParallax'
import type { ParallaxProps } from './ParallaxProps'

export function Parallax({
  children,
  speed = 0.2,
  className = '',
}: ParallaxProps) {
  const ref = useParallax(speed)
  return (
    <div ref={ref} className={`parallax-art ${className}`}>
      {children}
    </div>
  )
}
