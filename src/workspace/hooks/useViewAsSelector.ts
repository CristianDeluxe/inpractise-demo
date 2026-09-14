import { useId } from 'react'
import { useWorkspace } from './useWorkspace'

export function useViewAsSelector() {
  return { id: useId(), ...useWorkspace() }
}
