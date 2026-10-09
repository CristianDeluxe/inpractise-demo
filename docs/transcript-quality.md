# Transcript quality, measured

Measured on 2026-10-09 for the two public podcast episodes. Results:
[transcript-quality.json](transcript-quality.json). Scripts: `scripts/quality/`.

No human-verified reference transcript exists for either episode: the publisher
posts no transcript and YouTube only has automatic captions. So this measures
the AI final against **independent machine recognisers**, not against the truth.
It shows where the AI pass moves the text towards or away from what other
systems hear; it is not an accuracy figure.

## Method

1. **References.** YouTube automatic captions (Google's recogniser) and Whisper
   large-v3 run locally (`scripts/quality/fetch_references.sh`). Neither shares
   a model with the Parakeet TDT v3 first pass.
2. **Clean-verbatim normalisation.** The AI pass removes fillers and stutters
   ("is is" to "is"); the references keep them. Both sides are normalised with
   Whisper's English normaliser, then fillers ("uh", "um", "you know") and
   immediate repetitions are dropped, so the comparison is about content words.
3. **Agreement.** Word error rate of the raw first pass and of the AI final,
   each against each reference. Lower means closer to what that system heard.
4. **Edit adjudication.** An edit whose two sides normalise to the same words is
   style only. Every other edit gets three votes: whether each reference
   contains the AI wording or the raw wording around the edit's timestamps, and
   an acoustic vote, Whisper large-v3's log-probability of the sentence with
   each wording given the audio (a margin above 1 nat decides). Two votes for a
   side and none against confirm or contradict the edit; anything else is
   contested.

## Results

Agreement (word error rate against each reference, clean-verbatim):

| Episode  | Reference        | Raw first pass | AI final | Change |
| -------- | ---------------- | -------------- | -------- | ------ |
| Roche    | Whisper large-v3 | 3.36%          | 2.74%    | -18%   |
| Roche    | YouTube captions | 3.69%          | 3.51%    | -5%    |
| Novartis | Whisper large-v3 | 4.35%          | 3.55%    | -18%   |
| Novartis | YouTube captions | 3.43%          | 3.25%    | -5%    |

Edits (the AI final applies edits scored 0.8 or more; the counts include the
filler edits added by `pnpm transcripts:fillers`, 54 and 40, which are style
only):

| Episode  | Edits | Style only | Content, applied: confirmed / contradicted / contested | Content, not applied: confirmed / contradicted / contested |
| -------- | ----- | ---------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Roche    | 387   | 327        | 29 / 5 / 14                                            | 0 / 5 / 7                                                  |
| Novartis | 378   | 258        | 36 / 7 / 29                                            | 11 / 14 / 23                                               |

## What it says

- The AI final is closer to both independent recognisers than the raw pass on
  both episodes.
- Most edits (84% and 68%) are clean-verbatim style: fillers, stutters, number
  and acronym formatting ("RD" to "R&D", "in2010" to "in 2010").
- Among applied content edits with a decision, 85% (Roche) and 84% (Novartis)
  are confirmed. On Novartis the 0.8 threshold leaves out 11 edits the signals
  confirm.
- Machine signals share errors. Several "contradicted" edits are correct: "The
  Emperor of All Maladies" (the book), "the Hoffmann family", "build breadth".
  All three systems hear the common wording. Real AI errors in that list are
  dropped words: "we can micro basically target" lost "micro", "focus on our
  finding" lost "our".
- So the contested and contradicted edits (31 on Roche, 73 on Novartis) are the
  ones that still need a listener. A human-verified reference for those clips is
  the step that would turn this into an accuracy figure.

## Reproduce

```sh
scripts/quality/fetch_references.sh LQ6lAvNMjPE A_z4Jow0c7A
uv run --with mlx-whisper==0.4.2 --with jiwer==3.1.0 --with whisper-normalizer==0.1.12 \
  scripts/quality/measure.py LQ6lAvNMjPE A_z4Jow0c7A > docs/transcript-quality.json
```

Inputs live in the ignored `work/` folder (`pnpm transcripts:*` produces them).
The acoustic pass runs Whisper large-v3 on Apple silicon through MLX, about one
minute per episode after the model download.
