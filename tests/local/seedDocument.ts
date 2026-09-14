import type { TransactionSql } from 'postgres'
import { fixtureRevisionId } from './fixtureRevisionId.ts'

/**
 * Writes one document, its revision and one passage, then publishes. Evidence
 * has to be written before publication because the immutability triggers refuse
 * a passage under a published revision - the same order the importer uses.
 */
export async function seedDocument(
  sql: TransactionSql,
  orgId: string,
  documentId: string,
  requiredTier: string,
) {
  const digest = 'b'.repeat(64)
  await sql`insert into public.documents(org_id,document_id,required_tier) values(${orgId},${documentId},${requiredTier})`
  await sql`insert into public.document_revisions(org_id,document_id,revision_id,title,company,kind,origin,published_at,raw_sha256,normalized_sha256,passage_sha256,canonical_content,parser_version,chunker_version,embedding_model,index_mode,coverage,rights_basis,rights_status,published,is_current)
    values(${orgId},${documentId},${fixtureRevisionId},'Fixture interview','Fixture Company','synthetic_interview','synthetic','2026-09-01T00:00:00Z',${digest},${digest},${digest},'Migration constraints were rebuilt.','parser-v1','speaker-codepoint-v1','text-embedding-3-small','lexical_only','{}','Synthetic fixture','approved',false,false)`
  await sql`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,text_content,token_count,embedding_model)
    values(${orgId},${documentId},${fixtureRevisionId},'P1',1,'Interview','Migration requires rebuilding integrations.',7,'text-embedding-3-small')`
  await sql`update public.document_revisions set published=true, is_current=true
    where org_id=${orgId} and document_id=${documentId} and revision_id=${fixtureRevisionId}`
}
