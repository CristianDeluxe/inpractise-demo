import { resolve } from 'node:path'

export function retrievalOutputPath(args: string[]): string {
  const index = args.indexOf('--out')
  const output = index < 0 ? 'supabase/.temp/retrieval.json' : args[index + 1]
  if (!output || !resolve(output).startsWith(`${resolve('supabase/.temp')}/`))
    throw new Error('Report path must be inside supabase/.temp/')
  return output
}
