import { vi } from 'vitest'

export function canvasContextFixture() {
  const context = {
    clearRect: vi.fn(),
    setTransform: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    () =>
      Object.assign(context, {
        canvas: document.createElement('canvas'),
      }) as unknown as CanvasRenderingContext2D,
  )
  vi.spyOn(
    HTMLCanvasElement.prototype,
    'getBoundingClientRect',
  ).mockReturnValue(new DOMRect(0, 0, 800, 600))
  return context
}
