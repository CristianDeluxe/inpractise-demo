export type LabRoute =
  | { readonly kind: 'list' }
  | { readonly kind: 'memory' }
  | { readonly kind: 'invalid-id' }
  | { readonly kind: 'method-not-allowed' }
  | {
      readonly kind: 'bundle' | 'review' | 'audio'
      readonly id: string
    }
