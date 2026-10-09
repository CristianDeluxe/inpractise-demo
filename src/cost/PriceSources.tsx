import { PriceRow } from './PriceRow'
import { knownPrices } from './prices/knownPrices'

export function PriceSources() {
  return (
    <section aria-labelledby="price-sources-heading" className="mt-12">
      <h2 id="price-sources-heading" className="text-2xl">
        Prices used
      </h2>
      <p className="prose-measure mt-3 text-muted-foreground">
        Public list prices in USD per million tokens, read from each
        provider&apos;s official pricing page on the date shown.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Model prices and their sources</caption>
          <thead className="border-b border-border">
            <tr>
              <th scope="col" className="py-2 pr-4 font-medium">
                Model
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Input
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Output
              </th>
              <th scope="col" className="py-2 font-medium">
                Source, read on
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {knownPrices.map((price) => (
              <PriceRow key={price.modelId} price={price} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
