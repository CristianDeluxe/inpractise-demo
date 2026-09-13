/**
 * Supply a runtime parser from the frozen backend action schema, never a type assertion.
 * It must validate the complete action response and reject undocumented fields. For ask,
 * strictly validate the actual ProviderAnswer boundary (including rejecting extra keys)
 * while accepting only the documented AnswerSchema model, usage, and evidence metadata.
 * The adapter's layout-independent projections validate core evidence fields only;
 * they cannot identify allowed metadata boundaries or enforce their extra-field policy.
 */
export type DataParser<T extends Record<string, unknown>> = (
  input: unknown,
) => T
