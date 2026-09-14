# ADR 0007: Debit Ask allowance before provider work

Debit one of 100 per-principal UTC daily Ask units in a committed database RPC
before embedding or generation starts. Serialize debits by JWT principal and
enforce ledger scope with RLS under a non-login function owner without bypass.
Failures, refusals and cancellations retain their debit: this bounds repeated
provider attempts without an unsafe refund race. Store actual completion usage
when supplied, leave it unknown otherwise, and fail explicitly if recording
reported usage fails. Search remains outside this Ask allowance; the completion
ledger excludes embedding tokens and is not a financial billing authority.
