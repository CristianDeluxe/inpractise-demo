import { Check, Flag, X, type LucideIcon } from 'lucide-react'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'

export const verdictIcon: Readonly<Record<ReviewVerdict, LucideIcon>> = {
  accepted: Check,
  rejected: X,
  deferred: Flag,
}
