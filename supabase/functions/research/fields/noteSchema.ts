import { z } from 'zod'

/** One line: the database enforces the same bound. */
export const noteSchema = z.string().min(1).max(300)
