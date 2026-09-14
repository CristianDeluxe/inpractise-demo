export type PublicationBarrier = {
  arrive: () => void
  cancel: () => void
  ready: Promise<undefined>
}
