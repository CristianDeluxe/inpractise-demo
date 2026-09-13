import type { ParticleNode } from './ParticleNode'

export function createParticleNode(
  width: number,
  height: number,
): ParticleNode {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
  }
}
