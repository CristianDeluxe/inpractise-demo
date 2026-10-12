import { episodeDirectory } from './episodeDirectory'

/** A glossary source reads as the episode's guest; an unknown id stays as it is. */
export function episodeSourceLabel(id: string): string {
  return episodeDirectory[id]?.guest ?? id
}
