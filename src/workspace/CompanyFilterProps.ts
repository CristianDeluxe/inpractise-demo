import type { Library } from '@/contracts/Library'

export type CompanyFilterProps = {
  library: Library
  company: string
  onChange: (company: string) => void
}
