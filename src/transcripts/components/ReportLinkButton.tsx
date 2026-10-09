import { FileText } from 'lucide-react'
import type { ReportLinkButtonProps } from './ReportLinkButtonProps'

export function ReportLinkButton({ onOpenReport }: ReportLinkButtonProps) {
  return (
    <button
      type="button"
      className="quiet-action min-h-11 w-full gap-2 whitespace-nowrap md:min-h-9"
      onClick={onOpenReport}
    >
      <FileText aria-hidden="true" className="size-4" />
      Open report
    </button>
  )
}
