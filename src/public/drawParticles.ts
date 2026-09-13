import { drawParticleLink } from './drawParticleLink'
import { particleColors } from './particleColors'
import type { ParticleScene } from './ParticleScene'

export function drawParticles(
  context: CanvasRenderingContext2D,
  { width, height, nodes }: ParticleScene,
) {
  context.clearRect(0, 0, width, height)
  for (const [index, node] of nodes.entries()) {
    context.beginPath()
    context.arc(node.x, node.y, 1.2, 0, Math.PI * 2)
    context.fillStyle = particleColors.dot
    context.fill()
    for (const other of nodes.slice(index + 1))
      drawParticleLink(context, node, other)
  }
}
