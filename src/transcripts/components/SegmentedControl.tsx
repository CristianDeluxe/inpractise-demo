import type { SegmentedControlProps } from './SegmentedControlProps'

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full bg-secondary p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={option.disabled}
          aria-pressed={option.value === value}
          onClick={() => {
            onChange(option.value)
          }}
          className="min-h-11 whitespace-nowrap md:min-h-8 rounded-full px-3 py-1 text-sm text-muted-foreground transition-[background-color,color,box-shadow] duration-150 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:bg-card aria-pressed:font-medium aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_oklch(0.203_0.032_252/12%),0_0_0_1px_var(--color-border)]"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
