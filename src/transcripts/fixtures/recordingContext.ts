import { vi } from 'vitest'

/** A canvas context stub that records the fill colour of every rectangle drawn. */
export function recordingContext() {
  const fills: string[] = []
  const context = {
    fillStyle: '',
    clearRect: vi.fn(),
    fillRect: vi.fn(() => {
      fills.push(context.fillStyle)
    }),
  }
  return { context: context as unknown as CanvasRenderingContext2D, fills }
}
