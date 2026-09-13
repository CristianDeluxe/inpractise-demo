import { useParticleField } from './hooks/useParticleField'

export function ParticleField() {
  const ref = useParticleField()
  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] size-full opacity-70"
      aria-hidden="true"
    />
  )
}
