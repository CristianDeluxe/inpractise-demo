/**
 * Fixture responses for the Ask-allowance ledger RPCs, split out of
 * researchApiFixture to keep that function's branching under the lint limit.
 */
export function usageRpcFixture(path: string): unknown {
  switch (path) {
    case '/rest/v1/rpc/debit_request':
      return '00000000-0000-4000-8000-000000000001'
    case '/rest/v1/rpc/record_request_usage':
      return null
    default:
      return undefined
  }
}
