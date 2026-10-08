import { autoAcceptThreshold } from '../reliability/autoAcceptThreshold'
import { reliableWordThreshold } from '../reliability/reliableWordThreshold'

/** How the figure is defined, in one sentence, wherever the figure is shown. */
export function reliabilityDefinition(): string {
  const reliable = String(Math.round(reliableWordThreshold * 100))
  const auto = String(Math.round(autoAcceptThreshold * 100))
  return `Reliability is the share of final words scoring at least ${reliable}%. A word the AI left alone keeps its speech-recognition confidence; a word the AI changed takes the edit's confidence (edits at ${auto}% or more are applied); a word a person checked counts as 100%.`
}
