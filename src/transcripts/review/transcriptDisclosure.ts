/** Mandatory on every surface that shows transcript text. */
export function transcriptDisclosure(model: string | null) {
  const second =
    model === null ? 'second pass not run yet' : `second pass by ${model}`
  return `Public podcast audio processed locally for an engineering demo. Machine transcript (Parakeet TDT v3), ${second}. Not human-verified. Not In Practise content.`
}
