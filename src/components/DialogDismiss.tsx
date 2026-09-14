import * as Dialog from '@radix-ui/react-dialog'
import { CloseGlyph } from './CloseGlyph'

export function DialogDismiss() {
  return (
    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2">
      <CloseGlyph />
      <span className="sr-only">Close</span>
    </Dialog.Close>
  )
}
