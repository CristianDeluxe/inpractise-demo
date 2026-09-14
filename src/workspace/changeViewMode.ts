import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { cancelRequests } from '@/runtime/cancelRequests'
import type { ViewMode } from './ViewMode'

/**
 * Cancel work from the previous scope before setting the restriction and asking
 * the access gate to reload. Full mode removes only the demo restriction; it
 * does not elevate the authenticated account's actual entitlements.
 */
export function changeViewMode(runtime: BrowserRuntime, mode: ViewMode) {
  cancelRequests(runtime)
  if (mode === 'full') delete runtime.client.viewAs
  else
    runtime.client.viewAs = {
      role: 'member',
      ...(mode === 'basic-member' ? { premium: false as const } : {}),
    }
  runtime.events.dispatchEvent(new Event('view-mode-changed'))
}
