import type { PassageRef } from '../passages/PassageRef.ts'

export type NoteSaveInput = PassageRef & {
  question: string | undefined
  note: string | undefined
}
