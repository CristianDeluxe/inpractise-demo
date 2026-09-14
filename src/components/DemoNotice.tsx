import { CloseGlyph } from './CloseGlyph'
import { demoNotice } from './disclosureText'
import { useDemoNotice } from './hooks/useDemoNotice'

export function DemoNotice() {
  const { dismissed, dismiss } = useDemoNotice()
  if (dismissed) return null
  return (
    <div className="flex items-center gap-3 border-b border-border bg-warning px-4 py-2 text-xs text-warning-foreground">
      <p className="flex-1 text-center">{demoNotice}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the demo notice"
        className="-my-1 shrink-0 rounded-sm p-1 opacity-70 transition-[opacity,scale] duration-150 hover:opacity-100 motion-safe:active:scale-[0.96]"
      >
        <CloseGlyph />
      </button>
    </div>
  )
}
