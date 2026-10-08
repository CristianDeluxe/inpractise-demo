import { seekStepSeconds } from './seekStepSeconds'

/** New position for a waveform key press, or null when the key is not a seek key. */
export function seekKeyTarget(key: string, current: number, duration: number) {
  const targets: Record<string, number> = {
    ArrowLeft: current - seekStepSeconds,
    ArrowDown: current - seekStepSeconds,
    ArrowRight: current + seekStepSeconds,
    ArrowUp: current + seekStepSeconds,
    Home: 0,
    End: duration,
  }
  const target = targets[key]
  return target === undefined ? null : Math.min(duration, Math.max(0, target))
}
