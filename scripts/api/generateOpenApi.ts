import { openApiDocument } from '@/http-api/openApiDocument.ts'
import { writeFile } from 'node:fs/promises'

await writeFile(
  'docs/openapi.json',
  `${JSON.stringify(openApiDocument, null, 2)}\n`,
)
