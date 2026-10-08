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
      className="inline-flex border border-border"
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
          className="px-3 py-1.5 text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:bg-foreground aria-pressed:text-background"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
