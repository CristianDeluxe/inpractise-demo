import { reviewVerdicts } from './reviewVerdicts'
import { VerdictButton } from './VerdictButton'
import type { VerdictButtonsProps } from './VerdictButtonsProps'

export function VerdictButtons({ verdict, onDecide }: VerdictButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Decision">
      {reviewVerdicts.map((target) => (
        <VerdictButton
          key={target}
          target={target}
          verdict={verdict}
          onDecide={onDecide}
        />
      ))}
    </div>
  )
}
