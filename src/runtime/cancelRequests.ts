import type { BrowserRuntime } from './BrowserRuntime'

export function cancelRequests(runtime: BrowserRuntime) {
  for (const controller of runtime.controllers) controller.abort()
  runtime.controllers.clear()
}
