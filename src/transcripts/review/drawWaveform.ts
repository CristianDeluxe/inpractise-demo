import { drawRelistenLane } from './drawRelistenLane'
import { relistenLaneHeight } from './relistenLaneHeight'
import { waveformBarPitch } from './waveformBarPitch'
import type { WaveformScene } from './WaveformScene'

/**
 * Mirrored bars, played part in ink, and a continuous track underneath marking the
 * windows a reviewer still has to hear.
 */
export function drawWaveform(
  context: CanvasRenderingContext2D,
  scene: WaveformScene,
) {
  const { width, height, bars, progress, duration, palette } = scene
  const middle = (height - relistenLaneHeight - 3) / 2
  context.clearRect(0, 0, width, height)
  if (bars.length === 0) {
    context.fillStyle = palette.unplayed
    context.fillRect(0, middle - 1, width, 2)
    context.fillStyle = palette.played
    context.fillRect(0, middle - 1, width * progress, 2)
  }
  bars.forEach((level, index) => {
    const x = index * waveformBarPitch
    const half = Math.max(1, level * middle)
    context.fillStyle =
      x / width <= progress ? palette.played : palette.unplayed
    context.fillRect(x, middle - half, waveformBarPitch - 1, half * 2)
  })
  if (duration <= 0) return
  drawRelistenLane(context, scene)
}
