export function observeCanvasContexts() {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLCanvasElement.prototype,
    'getContext',
  )
  const original: unknown = descriptor?.value
  if (typeof original !== 'function')
    throw new Error('Missing canvas context method')
  let contexts = 0
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    ...descriptor,
    value: new Proxy(original, {
      apply(target, receiver: unknown, args: unknown[]) {
        contexts += 1
        document.documentElement.dataset['probeCanvasContexts'] =
          String(contexts)
        const result: unknown = Reflect.apply(target, receiver, args)
        return result
      },
    }),
  })
}
