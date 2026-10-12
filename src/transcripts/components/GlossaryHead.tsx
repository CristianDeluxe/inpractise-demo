export function GlossaryHead() {
  return (
    <thead className="border-b border-border text-sm">
      <tr>
        <th scope="col" className="py-2 pr-4 font-medium">
          Raw heard
        </th>
        <th scope="col" className="py-2 pr-4 font-medium">
          Corrected to
        </th>
        <th scope="col" className="py-2 pr-4 font-medium">
          Category
        </th>
        <th scope="col" className="py-2 pr-4 text-right font-medium">
          Seen
        </th>
        <th scope="col" className="py-2 pr-4 font-medium">
          Episodes
        </th>
        <th scope="col" className="py-2 font-medium">
          Vouched by
        </th>
      </tr>
    </thead>
  )
}
