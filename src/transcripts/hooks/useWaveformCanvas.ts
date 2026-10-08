import { useEffect, useMemo, useRef } from 'react'
import { drawWaveform } from '../review/drawWaveform'
import { readWaveformPalette } from '../review/readWaveformPalette'
import { resamplePeaks } from '../review/resamplePeaks'
import { waveformBarPitch } from '../review/waveformBarPitch'
import type { WaveformInput } from '../review/WaveformInput'
import { useElementWidth } from './useElementWidth'
import { waveformHeight } from './waveformHeight'

/** Sizes the canvas to its box at device resolution and redraws on every change. */
export function useWaveformCanvas(input: WaveformInput) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useElementWidth(canvasRef)
  const bars = useMemo(
    () => resamplePeaks(input.peaks, Math.floor(width / waveformBarPitch)),
    [input.peaks, width],
  )
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || width === 0) return
    const ratio = window.devicePixelRatio || 1
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(waveformHeight * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    drawWaveform(context, {
      width,
      height: waveformHeight,
      bars,
      progress: input.progress,
      duration: input.duration,
      relisten: input.relisten,
      palette: readWaveformPalette(canvas),
    })
  }, [bars, width, input.progress, input.duration, input.relisten])
  return canvasRef
}
