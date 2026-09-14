/**
 * Start only when motion is allowed and stop before every preference restart.
 * If preference detection is unavailable, leave the static presentation intact.
 * The callback must return cleanup that also restores any altered visual state.
 */
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
