import { advanceParticles } from './advanceParticles'
import { drawParticles } from './drawParticles'
import { resizeParticleScene } from './resizeParticleScene'

export function animateParticles(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  let scene = resizeParticleScene(canvas, context)
  let frame = 0
  const resize = () => {
    scene = resizeParticleScene(canvas, context)
  }
  const draw = () => {
    advanceParticles(scene)
    drawParticles(context, scene)
    frame = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', resize)
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    context.clearRect(0, 0, scene.width, scene.height)
  }
}
