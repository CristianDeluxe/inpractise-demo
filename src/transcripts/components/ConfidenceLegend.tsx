import { wordClassName } from './wordClassName'

export function ConfidenceLegend() {
  return (
    <ul
      aria-label="Legend"
      className="meta-text mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
    >
      <li>
        <span className={wordClassName('low', false)}>low</span> likely
        mis-transcribed
      </li>
      <li>
        <span className={wordClassName('medium', false)}>medium</span> uncertain
      </li>
      <li>
        <span className={wordClassName('high', false)}>high</span> confident
      </li>
      <li>
        <span className={wordClassName('high', true)}>dotted</span> flagged:
        entity, number, filler, repetition or learned term
      </li>
      <li>
        <del className="decoration-destructive">struck</del> replaced,{' '}
        <mark className="bg-success px-0.5 text-success-foreground underline decoration-2 underline-offset-4">
          inserted
        </mark>{' '}
        by the correction
      </li>
    </ul>
  )
}
