import type { Library } from '@/contracts/Library'

export type InterviewFiltersProps = {
  library: Library
  company: string
  onCompanyChange: (company: string) => void
  titleText: string
  onTitleTextChange: (text: string) => void
}
