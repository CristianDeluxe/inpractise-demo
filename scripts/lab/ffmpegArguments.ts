/** Mono, 48 kbps AAC with the moov atom first. */
export function ffmpegArguments(source: string, target: string): string[] {
  return [
    '-y',
    '-loglevel',
    'error',
    '-i',
    source,
    '-vn',
    '-ac',
    '1',
    '-c:a',
    'aac',
    '-b:a',
    '48k',
    '-movflags',
    '+faststart',
    target,
  ]
}
