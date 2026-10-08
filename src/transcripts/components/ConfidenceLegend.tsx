import { addedClass } from './addedClass'
import { removedClass } from './removedClass'
import { wordClassName } from './wordClassName'

export function ConfidenceLegend() {
  return (
    <ul
      aria-label="Legend"
      className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-muted-foreground"
    >
      <li>
        <del className={removedClass}>removed</del>{' '}
        <ins className={addedClass}>added</ins> proposed change
      </li>
      <li>
        <span className={wordClassName('low', false)}>low</span> likely misheard
      </li>
      <li>
        <span className={wordClassName('medium', false)}>medium</span> uncertain
      </li>
      <li>
        <span className={wordClassName('high', true)}>dotted</span> entity,
        number, filler or learned term
      </li>
    </ul>
  )
}
