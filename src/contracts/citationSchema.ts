import { validateCitation } from '@/api/validators/validateCitation'
import { z } from 'zod'

export const citationSchema = z.unknown().transform(validateCitation)
