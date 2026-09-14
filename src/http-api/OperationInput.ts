import type { z } from 'zod'
import type { OperationName } from './OperationName.ts'
import type { operations } from './operations.ts'

export type OperationInput<K extends OperationName> = z.infer<
  (typeof operations)[K]['input']
>
