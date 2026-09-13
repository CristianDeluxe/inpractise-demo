import { demoNotice } from './disclosureText'

export function DemoNotice() {
  return (
    <div className="border-b border-border bg-warning px-4 py-2 text-center text-xs text-warning-foreground">
      {demoNotice}
    </div>
  )
}
