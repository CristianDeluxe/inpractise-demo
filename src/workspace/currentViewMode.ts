import type { ViewAs } from '@/api/ViewAs'
import type { ViewMode } from './ViewMode'

export function currentViewMode(viewAs: ViewAs | undefined): ViewMode {
  if (viewAs?.premium === false) return 'basic-member'
  return viewAs?.role === 'member' ? 'member' : 'full'
}
