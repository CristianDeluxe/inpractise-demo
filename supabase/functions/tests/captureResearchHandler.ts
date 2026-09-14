import type { ResearchHandler } from './ResearchHandler.ts'

export async function captureResearchHandler(): Promise<ResearchHandler> {
  const original = Object.getOwnPropertyDescriptor(Deno, 'serve')
  if (!original) throw new Error('Missing Deno.serve descriptor')
  let captured: ResearchHandler | undefined
  Object.defineProperty(Deno, 'serve', {
    configurable: true,
    enumerable: original.enumerable ?? false,
    value: (handler: ResearchHandler) => {
      captured = handler
    },
  })
  try {
    await import('../research/index.ts')
  } finally {
    Object.defineProperty(Deno, 'serve', original)
  }
  if (!captured) throw new Error('Research handler was not registered')
  return captured
}
