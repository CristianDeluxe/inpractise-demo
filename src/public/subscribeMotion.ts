export function subscribeMotion(start: () => () => void) {
  if (typeof window.matchMedia !== 'function') return () => {}
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let stop: (() => void) | undefined
  const update = () => {
    stop?.()
    stop = !preference.matches ? start() : undefined
  }
  update()
  preference.addEventListener('change', update)
  return () => {
    stop?.()
    preference.removeEventListener('change', update)
  }
}
