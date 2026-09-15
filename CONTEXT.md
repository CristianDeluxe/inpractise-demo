# Domain glossary

## Document

A logical source identified within an organization by its document ID, with a
basic or premium access requirement. A document can have several revisions.
Avoid: file, revision.

## Revision

A content version of a document with its own revision ID and source metadata.
Publication, rights approval and withdrawal govern readability; being the
current revision governs library and search inclusion. Avoid: document, latest
text.

## Passage

An immutable, ordered piece of one published revision, identified by a passage
ID within that revision. Its exact text has provenance and, where applicable, a
speaker and speaker role. Avoid: snippet, answer.

## Citation

A server-owned reference to one complete passage, carrying its exact quote,
document/revision/passage IDs, source dates, attribution and reader path. Its
citation ID joins the three IDs; access is decided separately, on every read.
Avoid: model-generated source, link alone.

## Principal

The authenticated user together with the active organization membership, role
and premium entitlement used for a request. A caller can lower this through the
view switcher; the only way to raise it is a different login. Avoid: API key,
client identity.

## Allowance

The fixed request budget per principal: 100 Ask requests per UTC calendar day,
debited by `debit_request` before any provider work, failed attempts included.
It bounds request count, not provider spend. Avoid: measured spend, enforced
invoice cap.

## Candidate recall at ten

Coverage of labeled gold passages in the first ten retrieved candidates, before
context selection. It measures retrieval coverage; answer correctness and which
passages were cited are measured separately. Avoid: answer accuracy, context
recall.

## Context selection

The subset of retrieved passages admitted to the answer's evidence budget,
bounded by passage count, tokens and document diversity. A selection miss means
gold evidence was retrieved but excluded from this subset. Avoid: retrieval,
generation.

## Induced miss

A deliberately removed known gold candidate used to demonstrate that the
retrieval gate reports a retrieval miss. It is a labeled negative test; a real
question whose answer is absent from the corpus is an ordinary refusal. Avoid:
missing knowledge, ordinary refusal.

## Synthetic interview

An invented interview about a fictional company and speakers, disclosed with
synthetic provenance. Avoid: private research, real expert testimony.

## Public filing

An acquired public SEC filing with public provenance, a real issuer and source
URL. Its copy in the demo is read under the same membership rules as every other
document. Avoid: synthetic interview, private filing.

## Member

An active organization membership with the member role, permitted to read
evidence within its organization and tier. Membership is provisioned in addition
to the authenticated user. Avoid: signed-in visitor, premium role.

## Reviewer

A membership role that permits corpus inspection while keeping the same
organization and tier boundaries; premium access is a separate entitlement.
Avoid: administrator, unrestricted reader.

## Premium

A membership entitlement, separate from role, that permits premium-required
documents within the same authorized organization. Avoid: reviewer,
administrator.
