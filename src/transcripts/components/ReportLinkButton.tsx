import { FileText } from 'lucide-react'
import type { ReportLinkButtonProps } from './ReportLinkButtonProps'

export function ReportLinkButton({ onOpenReport }: ReportLinkButtonProps) {
  return (
    <button
      type="button"
      className="quiet-action min-h-11 gap-2 whitespace-nowrap rounded-full md:min-h-0"
      onClick={onOpenReport}
    >
      <FileText aria-hidden="true" className="size-4" />
      Open report
    </button>
  )
}
