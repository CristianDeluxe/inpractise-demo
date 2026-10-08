import { Check, X } from 'lucide-react'
import type { VerdictButtonsProps } from './VerdictButtonsProps'

export function VerdictButtons({ verdict, onDecide }: VerdictButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Decision">
      <button
        type="button"
        aria-pressed={verdict === 'accepted'}
        onClick={() => {
          onDecide(verdict === 'accepted' ? null : 'accepted')
        }}
        className="verdict-action hover:border-success-foreground/40 aria-pressed:border-transparent aria-pressed:bg-success-foreground aria-pressed:text-success"
      >
        <Check aria-hidden="true" className="size-4" />
        {verdict === 'accepted' ? 'Accepted' : 'Accept'}
      </button>
      <button
        type="button"
        aria-pressed={verdict === 'rejected'}
        onClick={() => {
          onDecide(verdict === 'rejected' ? null : 'rejected')
        }}
        className="verdict-action hover:border-destructive/40 aria-pressed:border-transparent aria-pressed:bg-destructive aria-pressed:text-destructive-foreground"
      >
        <X aria-hidden="true" className="size-4" />
        {verdict === 'rejected' ? 'Rejected' : 'Reject'}
      </button>
    </div>
  )
}
