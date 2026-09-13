import { parallaxOffset } from './parallaxOffset'

export function animateParallax(element: HTMLDivElement, speed: number) {
  let frame = 0
  const update = () => {
    frame = 0
    const rect = element.parentElement?.getBoundingClientRect()
    if (rect)
      element.style.transform = `translate3d(0, ${parallaxOffset(rect, window.innerHeight, speed).toFixed(2)}px, 0)`
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  element.style.willChange = 'transform'
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    element.style.removeProperty('transform')
    element.style.removeProperty('will-change')
  }
}
