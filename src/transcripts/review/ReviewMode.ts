/**
 * final: the AI-corrected text with only low-reliability words marked (default).
 * spotcheck: tracked changes, limited to the edits the model was unsure of.
 * inline: every tracked change in one column; diff: raw and corrected side by
 * side; confidence: raw text with ASR confidence.
 */
export type ReviewMode =
  'final' | 'spotcheck' | 'inline' | 'diff' | 'confidence'
