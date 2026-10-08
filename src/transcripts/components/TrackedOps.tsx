import { Fragment } from 'react'
import { diffOps } from '../diff/diffOps'
import { splitTokens } from '../diff/splitTokens'
import { addedClass } from './addedClass'
import { removedClass } from './removedClass'
import type { TrackedOpsProps } from './TrackedOpsProps'

/** Word-level track changes inside one edit, so a long filler cleanup reads as a few strikes. */
export function TrackedOps({ from, to }: TrackedOpsProps) {
  const ops = diffOps(splitTokens(from), splitTokens(to))
  return ops.map((op, index) => {
    const key = `${String(index)}-${op.kind}`
    const space = index < ops.length - 1 ? ' ' : ''
    if (op.kind === 'removed') {
      return (
        <Fragment key={key}>
          <del className={removedClass}>{op.text}</del>
          {space}
        </Fragment>
      )
    }
    if (op.kind === 'added') {
      return (
        <Fragment key={key}>
          <ins className={addedClass}>{op.text}</ins>
          {space}
        </Fragment>
      )
    }
    return <Fragment key={key}>{`${op.text}${space}`}</Fragment>
  })
}
