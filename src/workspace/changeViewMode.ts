import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { cancelRequests } from '@/runtime/cancelRequests'
import type { ViewMode } from './ViewMode'

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
