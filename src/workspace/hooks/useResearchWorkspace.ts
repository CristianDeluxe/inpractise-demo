import { useLibrary } from '@/workspace/hooks/useLibrary'
import { useState } from 'react'

export function useResearchWorkspace() {
  const library = useLibrary()
  const [company, setCompany] = useState('')
  return { library, company, setCompany }
}
