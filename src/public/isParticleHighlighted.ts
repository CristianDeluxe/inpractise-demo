import type { ParticleNode } from './ParticleNode'
import type { ParticlePointer } from './ParticlePointer'

export function isParticleHighlighted(
  node: ParticleNode,
  pointer: ParticlePointer,
) {
  return Math.hypot(node.x - pointer.x, node.y - pointer.y) < 140
}
