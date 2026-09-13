import { z } from 'zod'

export const querySchema = z.string().min(1).max(2_000)
