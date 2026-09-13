import type { TransactionSql } from 'postgres'
import type { CorpusDocument } from '../../scripts/db/CorpusDocument.ts'
import { toRevision } from '../../scripts/db/toRevision.ts'

export async function stageFixture(
  sql: TransactionSql,
  document: CorpusDocument,
  manifest: Record<string, unknown>,
  limit = document.passages.length,
): Promise<void> {
  const revision = toRevision(document, 'org-a', manifest, 'lexical_only')
  await sql`insert into public.documents(org_id,document_id,required_tier) values('org-a',${document.documentId},'basic') on conflict do nothing`
  await sql`insert into public.document_revisions ${sql(revision as never)}`
  for (const p of document.passages.slice(0, limit))
    await sql`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,speaker,speaker_role,text_content,token_count,embedding_model) values('org-a',${document.documentId},${document.revisionId},${p.passageId},${p.ordinal},${p.section},${p.speaker},${p.speakerRole},${p.text},${p.tokenCount + p.metadataTokenCount},'text-embedding-3-small')`
}
