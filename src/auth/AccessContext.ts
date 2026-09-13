import type { Access } from '@/contracts/Access'
import { createContext } from 'react'

export const AccessContext = createContext<Access | null>(null)
