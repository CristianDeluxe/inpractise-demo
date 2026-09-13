import type { AnimationStyle } from './AnimationStyle'

export function animationDelay(delay: number): AnimationStyle {
  return { '--delay': `${String(delay)}ms` }
}
