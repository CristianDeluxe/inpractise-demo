import type { InterviewProfile } from './InterviewProfile'

// The list API row carries a title, company, date and revision but no speaker
// names and no excerpt ids, so these are kept here by document id.
// tests/unit/interviewProfiles.test.ts checks every value against
// corpus/normalised/*.json, so a re-import cannot leave them stale.
export const interviewProfiles: Record<string, InterviewProfile> = {
  'pod-roche-2024': {
    guest: 'Thomas Schinecker',
    guestRole: 'Chief Executive Officer, Roche',
    host: 'Nicolai Tangen',
    firstPassageId: 'T001',
  },
  'pod-novartis-2025': {
    guest: 'Vasant Narasimhan',
    guestRole: 'Chief Executive Officer, Novartis',
    host: 'Nicolai Tangen',
    firstPassageId: 'T001',
  },
}
