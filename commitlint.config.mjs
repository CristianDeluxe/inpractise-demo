import { createJiti } from 'jiti'

export default createJiti(import.meta.url)(
  '@busirocket/quality-config/commitlint',
).createCommitlintConfig()
