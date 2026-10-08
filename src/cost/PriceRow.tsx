import type { PriceRowProps } from './PriceRowProps'

export function PriceRow({ price }: PriceRowProps) {
  return (
    <tr>
      <th scope="row" className="py-3 pr-4 text-left font-mono font-normal">
        {price.modelId}
      </th>
      <td className="py-3 pr-4 font-mono">{price.inputUsdPerMillion}</td>
      <td className="py-3 pr-4 font-mono">
        {price.outputUsdPerMillion === 0 ? 'n/a' : price.outputUsdPerMillion}
      </td>
      <td className="py-3">
        <a
          href={price.sourceUrl}
          className="break-all underline underline-offset-4"
        >
          {price.sourceUrl}
        </a>{' '}
        ({price.fetchedOn})
      </td>
    </tr>
  )
}
