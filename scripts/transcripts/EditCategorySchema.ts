import { z } from 'zod'

export const EditCategorySchema = z.enum([
  'entity',
  'term',
  'number',
  'grammar',
  'filler',
  'punctuation',
  'other',
])
