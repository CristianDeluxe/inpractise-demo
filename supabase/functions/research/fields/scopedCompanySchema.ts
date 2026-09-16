import { z } from 'zod'

/** A cross-reference's company scope, when given, must name one company: an
 * empty string is rejected rather than silently treated as "every company". */
export const scopedCompanySchema = z.string().min(1).max(80)
