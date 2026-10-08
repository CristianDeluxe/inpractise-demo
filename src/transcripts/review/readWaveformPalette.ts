import { cssToken } from './cssToken'
import type { WaveformPalette } from './WaveformPalette'

/** Resolves the design tokens on the canvas element, so the waveform follows the theme. */
export function readWaveformPalette(element: Element): WaveformPalette {
  const style = getComputedStyle(element)
  return {
    played: cssToken(style, '--foreground', '#1b2433'),
    unplayed: cssToken(style, '--ink-muted', '#b8bec7'),
    relisten: cssToken(style, '--primary', '#e05f1e'),
  }
}
