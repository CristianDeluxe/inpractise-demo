import { createJiti } from 'jiti'

export default createJiti(import.meta.url)(
  '@syntopica/quality-config/commitlint',
).createCommitlintConfig()
