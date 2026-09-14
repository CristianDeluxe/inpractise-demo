import { drawParticleLink } from './drawParticleLink'
import { isParticleHighlighted } from './isParticleHighlighted'
import { particleColors } from './particleColors'
import type { ParticlePointer } from './ParticlePointer'
import type { ParticleScene } from './ParticleScene'

export function drawParticles(
  context: CanvasRenderingContext2D,
  { width, height, nodes }: ParticleScene,
  pointer: ParticlePointer,
) {
  context.clearRect(0, 0, width, height)
  for (const [index, node] of nodes.entries()) {
    const highlighted = isParticleHighlighted(node, pointer)
    context.beginPath()
    context.arc(node.x, node.y, highlighted ? 1.9 : 1.2, 0, Math.PI * 2)
    context.fillStyle = highlighted
      ? particleColors.highlight
      : particleColors.dot
    context.fill()
    for (const other of nodes.slice(index + 1))
      drawParticleLink(context, node, other)
  }
}
