#!/bin/bash
# Independent references for scripts/quality/measure.py: YouTube automatic captions and Whisper large-v3.
set -euo pipefail
for id in "$@"; do
  out="work/quality/$id"
  mkdir -p "$out"
  yt-dlp --skip-download --write-auto-subs --sub-langs en-orig --sub-format json3 \
    -o "$out/youtube" "https://www.youtube.com/watch?v=$id"
  mv "$out/youtube.en-orig.json3" "$out/youtube.json3"
  uvx --from mlx-whisper==0.4.2 mlx_whisper "work/transcripts/$id/audio.wav" \
    --model mlx-community/whisper-large-v3-mlx --language en --word-timestamps True \
    --condition-on-previous-text False --output-format json --output-dir "$out" --output-name whisper
done
