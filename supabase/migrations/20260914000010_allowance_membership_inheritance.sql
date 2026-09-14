-- PostgreSQL 16+ stores inheritance on each membership, independently of the
-- role's default for future grants. Enable the existing narrow membership.
grant authenticated to request_usage_writer with inherit true;
