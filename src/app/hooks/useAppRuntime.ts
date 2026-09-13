import { createBrowserRuntime } from '@/runtime/createBrowserRuntime'
import { useState } from 'react'

export function useAppRuntime() {
  const [runtime] = useState(createBrowserRuntime)
  return runtime
}
