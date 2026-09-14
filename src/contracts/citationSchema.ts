import { z } from 'zod'
import { validateCitation } from '../api/validators/validateCitation.ts'

export const citationSchema = z.unknown().transform(validateCitation)
