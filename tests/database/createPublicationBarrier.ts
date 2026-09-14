import type { PublicationBarrier } from './PublicationBarrier.ts'

export function createPublicationBarrier(): PublicationBarrier {
  const ready = Promise.withResolvers<undefined>()
  const timeout = setTimeout(() => {
    ready.reject(new Error('Publication staging timed out'))
  }, 15000)
  let arrivals = 0
  return {
    ready: ready.promise,
    cancel: () => {
      clearTimeout(timeout)
      ready.resolve(undefined)
    },
    arrive: () => {
      arrivals += 1
      if (arrivals === 2) {
        clearTimeout(timeout)
        ready.resolve(undefined)
      }
    },
  }
}
