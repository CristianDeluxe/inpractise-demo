import { useEffect, useRef } from 'react'
import { animateParticles } from '../animateParticles'
import { subscribeMotion } from '../subscribeMotion'

export function useParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    return subscribeMotion(() => animateParticles(canvas))
  }, [])
  return ref
}
