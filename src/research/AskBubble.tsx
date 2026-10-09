import * as Dialog from '@radix-ui/react-dialog'
import { MessageCircle } from 'lucide-react'
import { AskBubblePanel } from './AskBubblePanel'
import { useAskBubbleHidden } from './hooks/useAskBubbleHidden'

export function AskBubble() {
  if (useAskBubbleHidden()) return null
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger
        aria-label="Ask the interviews"
        className="fixed bottom-6 right-6 z-30 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,scale] duration-150 motion-safe:active:scale-[0.96] hover:bg-primary/90"
      >
        <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <AskBubblePanel />
      </Dialog.Portal>
    </Dialog.Root>
  )
}
