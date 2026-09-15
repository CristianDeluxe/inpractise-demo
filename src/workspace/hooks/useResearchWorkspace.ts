import { companySearchSchema } from '@/routes/companySearchSchema'
import { useLibrary } from '@/workspace/hooks/useLibrary'
import { useLocation, useNavigate } from '@tanstack/react-router'

/**
 * The company scope lives in the URL, so a link from the workspace entry opens
 * Ask or the library already narrowed and a reload keeps the same scope. The
 * router is not type-registered here, so the search object is re-validated
 * through the route schema rather than trusted as typed.
 */
export function useResearchWorkspace() {
  const library = useLibrary()
  const search: unknown = useLocation().search
  const navigate = useNavigate()
  const company = companySearchSchema.parse(search).company ?? ''
  const setCompany = (value: string) => {
    const options: {
      to: string
      search: Record<string, string>
      replace: boolean
    } = { to: '.', search: value ? { company: value } : {}, replace: true }
    void navigate(options)
  }
  return { library, company, setCompany }
}
