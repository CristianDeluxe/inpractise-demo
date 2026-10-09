import json


def whisper_words(path):
    """Timed words of an mlx_whisper JSON transcript written with word timestamps."""
    segments = json.load(open(path))['segments']
    return [(w['word'].strip(), w['start']) for seg in segments for w in seg.get('words', [])]
