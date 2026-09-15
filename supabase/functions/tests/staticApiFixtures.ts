/** Routes whose fixture response never depends on the shared citation source. */
export const staticApiFixtures: Readonly<Record<string, unknown>> = {
  '/rest/v1/rpc/debit_request': '00000000-0000-0000-0000-000000000001',
  '/rest/v1/rpc/record_request_usage': null,
  '/rest/v1/query_embeddings': [],
}
