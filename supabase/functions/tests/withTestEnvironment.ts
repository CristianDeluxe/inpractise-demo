export async function withTestEnvironment(
  values: Readonly<Record<string, string>>,
  run: () => Promise<void>,
) {
  const previous = Object.keys(values).map(
    (name) => [name, Deno.env.get(name)] as const,
  )
  for (const [name, value] of Object.entries(values)) Deno.env.set(name, value)
  try {
    await run()
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) Deno.env.delete(name)
      else Deno.env.set(name, value)
    }
  }
}
