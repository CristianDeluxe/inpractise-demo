import { useEffect, useRef } from 'react'
import { animateParallax } from '../animateParallax'
import { subscribeMotion } from '../subscribeMotion'

export function useParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    return subscribeMotion(() => animateParallax(element, speed))
  }, [speed])
  return ref
}
