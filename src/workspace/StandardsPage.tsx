import { MethodSectionList } from '@/public/MethodSectionList'
import { WorkspacePage } from './WorkspacePage'

export function StandardsPage() {
  return (
    <WorkspacePage
      eyebrow="Engineering"
      title="How quotes and sources are checked"
      intro="Where the material comes from, what an answer can establish, and what the interviews do not cover."
    >
      <MethodSectionList />
    </WorkspacePage>
  )
}
