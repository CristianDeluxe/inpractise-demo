/** Mandatory on every surface that shows transcript text. */
export function transcriptDisclosure(model: string | null) {
  const second =
    model === null ? 'second AI pass not run yet' : `second AI pass by ${model}`
  return `Public podcast audio processed locally for an engineering demo: automatic Parakeet TDT v3 transcript, ${second}, speakers inferred from the audio. Not human-verified. Not In Practise content.`
}
