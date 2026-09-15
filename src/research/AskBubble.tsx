import * as Dialog from '@radix-ui/react-dialog'
import { MessagesSquare } from 'lucide-react'
import { AskBubblePanel } from './AskBubblePanel'
import { useAskBubbleHidden } from './hooks/useAskBubbleHidden'

export function AskBubble() {
  if (useAskBubbleHidden()) return null
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lg transition-[background-color,scale] duration-150 motion-safe:active:scale-[0.96] hover:bg-primary/90">
        <MessagesSquare size={16} strokeWidth={1.5} aria-hidden="true" />
        Ask IP
      </Dialog.Trigger>
      <Dialog.Portal>
        <AskBubblePanel />
      </Dialog.Portal>
    </Dialog.Root>
  )
}
