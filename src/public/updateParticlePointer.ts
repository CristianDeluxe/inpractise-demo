import type { ParticlePointer } from './ParticlePointer'

export function updateParticlePointer(
  pointer: ParticlePointer,
  canvas: HTMLCanvasElement,
  event: PointerEvent,
) {
  const rect = canvas.getBoundingClientRect()
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
}
