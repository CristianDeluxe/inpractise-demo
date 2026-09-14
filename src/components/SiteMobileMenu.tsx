import * as Dialog from '@radix-ui/react-dialog'
import { DialogDismiss } from './DialogDismiss'
import { useSiteMobileMenu } from './hooks/useSiteMobileMenu'
import { MenuGlyph } from './MenuGlyph'
import { SiteNav } from './SiteNav'

export function SiteMobileMenu() {
  const { open, setOpen, close } = useSiteMobileMenu()
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="border border-border px-3 py-2 transition-colors hover:bg-secondary md:hidden"
        aria-label="Open menu"
      >
        <MenuGlyph />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-72 max-w-full border-l border-border bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <DialogDismiss />
          <Dialog.Title className="font-serif text-lg">
            In Practise
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-xs text-muted-foreground">
            Independent demo navigation
          </Dialog.Description>
          <div className="mt-6">
            <SiteNav onNavigate={close} />
          </div>
          <Dialog.Close className="quiet-action mt-6">Close menu</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
