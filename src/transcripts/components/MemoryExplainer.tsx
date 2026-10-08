export function MemoryExplainer() {
  return (
    <ol className="prose-measure mt-6 list-decimal space-y-3 pl-5 text-muted-foreground">
      <li>
        <strong className="text-foreground">You decide.</strong> Every accepted
        correction is stored as a substitution in the glossary, with how often
        it has been seen. Every accepted paragraph is stored as a raw and
        corrected pair.
      </li>
      <li>
        <strong className="text-foreground">Pre-pass.</strong> On the next
        transcript, glossary entries are applied to the raw text before the
        model runs. These edits are marked learned in the review.
      </li>
      <li>
        <strong className="text-foreground">Few-shot retrieval.</strong> The
        stored paragraph pairs most similar to the new text are retrieved and
        shown to the model as examples, so it fixes new errors the way you fixed
        old ones.
      </li>
      <li>
        <strong className="text-foreground">Backfill from history.</strong> An
        archive of raw machine transcripts and their human-final versions is the
        same signal at scale.{' '}
        <code className="font-mono text-sm">pnpm transcripts:pairs</code> aligns
        each pair word by word, reports the raw word error rate, and adds a
        substitution to the glossary only once it recurs across pairs, so
        one-off rewrites stay out.
      </li>
    </ol>
  )
}
