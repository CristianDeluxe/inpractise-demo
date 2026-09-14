import { advanceParticles } from './advanceParticles'
import { createParticlePointer } from './createParticlePointer'
import { drawParticles } from './drawParticles'
import { resizeParticleScene } from './resizeParticleScene'
import { subscribeParticlePointer } from './subscribeParticlePointer'

export function animateParticles(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  let scene = resizeParticleScene(canvas, context)
  const pointer = createParticlePointer()
  const stopPointer = subscribeParticlePointer(canvas, pointer)
  let frame = 0
  const resize = () => {
    scene = resizeParticleScene(canvas, context)
  }
  const draw = () => {
    advanceParticles(scene)
    drawParticles(context, scene, pointer)
    frame = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', resize)
  return () => {
    cancelAnimationFrame(frame)
    stopPointer()
    window.removeEventListener('resize', resize)
    context.clearRect(0, 0, scene.width, scene.height)
  }
}
