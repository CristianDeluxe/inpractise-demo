export type PublishDocumentFunction = {
  Args: {
    document_id: string
    expected_hash: string
    expected_passages: number
    org_id: string
    revision_id: string
  }
  Returns: string
}
