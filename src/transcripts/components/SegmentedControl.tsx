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
      className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-md border border-border bg-secondary p-0.5"
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
          className="min-h-11 whitespace-nowrap rounded border border-transparent px-3 py-1 text-sm text-muted-foreground transition-[background-color,color] duration-150 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:min-h-8 aria-pressed:border-border aria-pressed:bg-card aria-pressed:font-medium aria-pressed:text-primary"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
