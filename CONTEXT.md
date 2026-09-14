# Domain glossary

## Document

A logical source identified within an organization by its document ID, with a
basic or premium access requirement. A document can have several revisions; it
is not one immutable text snapshot. Avoid: file, revision.

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
citation ID joins the three IDs; it is not a grant of access. Avoid:
model-generated source, link alone.

## Principal

The authenticated user together with the active organization membership, role
and premium entitlement used for a request. A caller cannot choose another
principal through a tool argument or research action. Avoid: API key, client
identity.

## Allowance

The execution plan's fixed request budget per principal and for the whole demo,
intended to count attempts before provider work, including failed attempts. It
is a planned control, not an implemented debit or usage ledger in this source
tree. Avoid: measured spend, enforced invoice cap.

## Candidate recall at ten

Coverage of labeled gold passages in the first ten retrieved candidates, before
context selection. It measures retrieval coverage, not answer correctness or
which passages were cited. Avoid: answer accuracy, context recall.

## Context selection

The subset of retrieved passages admitted to the answer's evidence budget,
bounded by passage count, tokens and document diversity. A selection miss means
gold evidence was retrieved but excluded from this subset. Avoid: retrieval,
generation.

## Induced miss

A deliberately removed known gold candidate used to demonstrate that the
retrieval gate reports a retrieval miss. It is a labeled negative test, distinct
from a real question whose answer is absent from the corpus. Avoid: missing
knowledge, ordinary refusal.

## Synthetic interview

An invented interview about a fictional company and speakers, disclosed with
synthetic provenance. It is not an In Practise interview or evidence about a
real business. Avoid: private research, real expert testimony.

## Public filing

An acquired public SEC filing with public provenance, a real issuer and source
URL. Public provenance does not make its copy in the authenticated demo
anonymously readable. Avoid: synthetic interview, private filing.

## Member

An active organization membership with the member role, permitted to read
evidence within its organization and tier. Membership requires provisioning in
addition to an authenticated user. Avoid: signed-in visitor, premium role.

## Reviewer

A membership role that permits corpus inspection while retaining the same
organization and tier boundaries. Reviewer status does not confer premium
access. Avoid: administrator, unrestricted reader.

## Premium

A membership entitlement separate from role that permits premium-required
documents within the same authorized organization. It is not a separate
authentication identity or cross-organization permission. Avoid: reviewer,
administrator.
