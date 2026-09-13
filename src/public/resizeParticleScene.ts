import { createParticleNode } from './createParticleNode'
import type { ParticleScene } from './ParticleScene'

export function resizeParticleScene(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): ParticleScene {
  const { width, height } = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  const count = Math.min(90, Math.round((width * height) / 16000))
  return {
    width,
    height,
    nodes: Array.from({ length: count }, () =>
      createParticleNode(width, height),
    ),
  }
}
