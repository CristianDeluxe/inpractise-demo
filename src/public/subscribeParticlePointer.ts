import type { ParticlePointer } from './ParticlePointer'
import { resetParticlePointer } from './resetParticlePointer'
import { updateParticlePointer } from './updateParticlePointer'

export function subscribeParticlePointer(
  canvas: HTMLCanvasElement,
  pointer: ParticlePointer,
) {
  const move = (event: PointerEvent) => {
    updateParticlePointer(pointer, canvas, event)
  }
  const leave = () => {
    resetParticlePointer(pointer)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerleave', leave)
  return () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerleave', leave)
  }
}
