/** The dev-only /local-api is not being served (production build or no dev server). */
export class LabApiUnavailableError extends Error {
  constructor() {
    super('The local lab API is not available.')
    this.name = 'LabApiUnavailableError'
  }
}
