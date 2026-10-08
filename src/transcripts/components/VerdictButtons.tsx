import type { VerdictButtonsProps } from './VerdictButtonsProps'

export function VerdictButtons({ verdict, onDecide }: VerdictButtonsProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="Decision">
      <button
        type="button"
        aria-pressed={verdict === 'accepted'}
        onClick={() => {
          onDecide(verdict === 'accepted' ? null : 'accepted')
        }}
        className="quiet-action py-1 aria-pressed:border-success-foreground/40 aria-pressed:bg-success aria-pressed:text-success-foreground"
      >
        {verdict === 'accepted' ? 'Accepted' : 'Accept'}
      </button>
      <button
        type="button"
        aria-pressed={verdict === 'rejected'}
        onClick={() => {
          onDecide(verdict === 'rejected' ? null : 'rejected')
        }}
        className="quiet-action py-1 aria-pressed:border-destructive/50 aria-pressed:bg-destructive/10 aria-pressed:text-destructive"
      >
        {verdict === 'rejected' ? 'Rejected' : 'Reject'}
      </button>
    </div>
  )
}
