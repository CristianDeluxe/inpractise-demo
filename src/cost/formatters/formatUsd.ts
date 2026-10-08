/** Four decimals under one dollar so a fraction of a cent stays visible. */
export function formatUsd(value: number): string {
  return `USD ${value < 1 ? value.toFixed(4) : value.toFixed(2)}`
}
