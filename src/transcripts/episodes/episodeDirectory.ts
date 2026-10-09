import type { Episode } from './Episode'

// Keyed by the YouTube id that identifies a transcript. The titles match the
// Interviews page, so one episode reads the same everywhere.
export const episodeDirectory: Record<string, Episode> = {
  LQ6lAvNMjPE: {
    documentId: 'pod-roche-2024',
    title: 'Roche CEO Thomas Schinecker on In Good Company',
    host: 'Nicolai Tangen',
    guest: 'Thomas Schinecker',
  },
  A_z4Jow0c7A: {
    documentId: 'pod-novartis-2025',
    title: 'Novartis CEO Vasant Narasimhan on In Good Company',
    host: 'Nicolai Tangen',
    guest: 'Vasant Narasimhan',
  },
}
