/** The model name without its publisher prefix: mlx-community/parakeet-tdt-0.6b-v3 reads parakeet-tdt-0.6b-v3. */
export function shortModelName(model: string): string {
  return model.split('/').at(-1) ?? model
}
