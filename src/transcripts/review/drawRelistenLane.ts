import { relistenLaneHeight } from './relistenLaneHeight'
import { relistenUnplayedAlpha } from './relistenUnplayedAlpha'
import type { WaveformScene } from './WaveformScene'

/**
 * A continuous track, muted ink behind the playhead and faint ahead of it,
 * with the re-listen windows on it: full strength behind the playhead, dimmed
 * ahead of it.
 */
export function drawRelistenLane(
  context: CanvasRenderingContext2D,
  scene: WaveformScene,
) {
  const { width, height, progress, duration, relisten, palette } = scene
  const top = height - relistenLaneHeight
  const playhead = width * progress
  context.fillStyle = palette.track
  context.fillRect(0, top, width, relistenLaneHeight)
  context.fillStyle = palette.unplayed
  if (playhead > 0)
    context.fillRect(0, top, Math.min(playhead, width), relistenLaneHeight)
  context.fillStyle = palette.relisten
  for (const interval of relisten) {
    const x = (interval.start / duration) * width
    const end = (interval.end / duration) * width
    const split = Math.min(Math.max(playhead, x), end)
    context.globalAlpha = 1
    if (split > x) context.fillRect(x, top, split - x, relistenLaneHeight)
    context.globalAlpha = relistenUnplayedAlpha
    if (end > split)
      context.fillRect(split, top, end - split, relistenLaneHeight)
  }
  context.globalAlpha = 1
}
