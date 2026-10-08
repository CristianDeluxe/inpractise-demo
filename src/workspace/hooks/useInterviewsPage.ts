import { filterInterviews } from '@/workspace/filterInterviews'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { useState } from 'react'

export function useInterviewsPage() {
  const { library, company, setCompany } = useResearchWorkspace()
  const [titleText, setTitleText] = useState('')
  const items =
    library.state.status === 'success' ? library.state.data.data.items : []
  return {
    library,
    company,
    setCompany,
    titleText,
    setTitleText,
    total: items.length,
    interviews: filterInterviews(items, company, titleText),
  }
}
