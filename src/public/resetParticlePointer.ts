import type { ParticlePointer } from './ParticlePointer'

export function resetParticlePointer(pointer: ParticlePointer) {
  pointer.x = -9999
  pointer.y = -9999
}
