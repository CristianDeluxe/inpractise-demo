import { useState } from 'react'
import type { LibraryTab } from '../LibraryTab'

export function useLibraryTab() {
  return useState<LibraryTab>('inPractise')
}
