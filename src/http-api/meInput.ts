import { z } from 'zod'
import { viewAsSchema } from '../api/viewAsSchema.ts'

export const meInput = z.strictObject({ viewAs: viewAsSchema.optional() })
