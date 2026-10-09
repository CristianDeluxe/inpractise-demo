import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { beaconTab } from '../beaconTab'
import { sendBeacon } from '../sendBeacon'

/**
 * Records each page view and how long the page stayed visible before the
 * visitor moved on, hid the tab or closed it.
 */
export function usePageBeacon() {
  const path = useLocation({ select: (location) => location.pathname })
  useEffect(() => {
    let visibleSince: number | null = performance.now()
    let shown = 0
    const pause = () => {
      if (visibleSince !== null) shown += performance.now() - visibleSince
      visibleSince = null
    }
    const leave = () => {
      pause()
      if (shown > 0)
        sendBeacon({ kind: 'leave', path, ms: shown, tab: beaconTab })
      shown = 0
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') leave()
      else visibleSince = performance.now()
    }
    sendBeacon({ kind: 'view', path, ms: null, tab: beaconTab })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', leave)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', leave)
      leave()
    }
  }, [path])
}
