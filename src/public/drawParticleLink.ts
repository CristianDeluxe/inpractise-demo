import { particleColors } from './particleColors'
import type { ParticleNode } from './ParticleNode'

export function drawParticleLink(
  context: CanvasRenderingContext2D,
  a: ParticleNode,
  b: ParticleNode,
) {
  const distance = Math.hypot(a.x - b.x, a.y - b.y)
  if (distance > 128) return
  context.beginPath()
  context.moveTo(a.x, a.y)
  context.lineTo(b.x, b.y)
  context.strokeStyle = `rgba(${particleColors.line},${String((1 - distance / 128) * 0.16)})`
  context.lineWidth = 0.6
  context.stroke()
}
