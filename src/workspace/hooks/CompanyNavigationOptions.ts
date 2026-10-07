/** The router options that scope the current page to one company. */
export type CompanyNavigationOptions = {
  to: string
  search: Record<string, string>
  replace: boolean
}
