"""Measure raw speech recognition against the AI final with independent recognisers.

Inputs per episode: work/transcripts/<id>/ (transcript, correction, audio.wav) and
work/quality/<id>/ (youtube.json3, whisper.json, from fetch_references.sh).
Run: uv run --with mlx-whisper==0.4.2 --with jiwer==3.1.0 --with whisper-normalizer==0.1.12 \
  scripts/quality/measure.py <id> [<id> ...] > docs/transcript-quality.json
"""
import datetime
import json
import sys

from measure_episode import measure_episode

episodes = {}
for episode in sys.argv[1:]:
    episodes[episode] = measure_episode(f'work/transcripts/{episode}', f'work/quality/{episode}')
    print(f'measured {episode}', file=sys.stderr)
json.dump({'measuredOn': datetime.date.today().isoformat(), 'episodes': episodes}, sys.stdout, indent=1)
