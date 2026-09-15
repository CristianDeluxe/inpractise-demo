import { z } from 'zod'

/** A cross-reference is always about one company, so its scope is required. */
export const scopedCompanySchema = z.string().min(1).max(80)
