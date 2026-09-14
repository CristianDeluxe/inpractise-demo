import { meOutput } from '../http-api/meOutput.ts'

export function parseMeData(input: unknown) {
  return meOutput.parse(input)
}
