/**
 * The follow-up rewrite is a short, low-stakes completion, so it can run on a
 * cheaper and faster model than the answer itself. Override with
 * CONDENSATION_MODEL if the provider's fast tier changes name.
 */
export const condensationModel =
  Deno.env.get('CONDENSATION_MODEL') ?? 'gpt-4.1-nano-2025-04-14'
