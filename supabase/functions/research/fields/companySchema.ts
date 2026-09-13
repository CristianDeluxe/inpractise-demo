import { z } from 'zod'

export const companySchema = z.string().max(80).optional()
