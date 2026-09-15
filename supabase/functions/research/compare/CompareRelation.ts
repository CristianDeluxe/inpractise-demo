export type CompareRelation = {
  interviewClaimId: string
  filingClaimId: string
  relation: 'agrees' | 'contradicts' | 'extends'
}
