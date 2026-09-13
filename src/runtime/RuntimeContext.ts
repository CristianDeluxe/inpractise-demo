import { createContext } from 'react'
import type { BrowserRuntime } from './BrowserRuntime'

export const RuntimeContext = createContext<BrowserRuntime | null>(null)
