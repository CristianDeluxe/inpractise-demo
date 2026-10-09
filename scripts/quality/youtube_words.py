import json


def youtube_words(path):
    """Timed words of a YouTube automatic-caption json3 file, without [Music]-style tags."""
    words = []
    for event in json.load(open(path))['events']:
        for seg in event.get('segs', []):
            text = seg['utf8'].strip()
            if text and not text.startswith('['):
                words.append((text, (event['tStartMs'] + seg.get('tOffsetMs', 0)) / 1000))
    return words
