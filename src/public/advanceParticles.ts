import type { ParticleScene } from './ParticleScene'

export function advanceParticles({ nodes, width, height }: ParticleScene) {
  for (const node of nodes) {
    node.x += node.vx
    node.y += node.vy
    if (node.x < 0 || node.x > width) node.vx *= -1
    if (node.y < 0 || node.y > height) node.vy *= -1
  }
}
