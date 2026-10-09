import json

from mlx_whisper.audio import load_audio

from acoustic_scorer import acoustic_scorer
from acoustic_vote import acoustic_vote
from edit_context import edit_context
from locate_edits import locate_edits
from reference_vote import reference_vote
from tally import tally
from verdict import verdict
from whisper_words import whisper_words
from word_error_rate import word_error_rate
from youtube_words import youtube_words

AUTO_ACCEPT = 0.8


def measure_episode(transcript_dir, reference_dir):
    raw, final, edits = locate_edits(transcript_dir, AUTO_ACCEPT)
    refs = {'youtube': youtube_words(f'{reference_dir}/youtube.json3'),
            'whisper': whisper_words(f'{reference_dir}/whisper.json')}
    agreement = {}
    for name, words in refs.items():
        text = ' '.join(t for t, _ in words)
        agreement[name] = {'raw': word_error_rate(text, raw), 'final': word_error_rate(text, final)}
    paragraphs = {p['id']: p['words'] for p in json.load(open(f'{transcript_dir}/transcript.json'))['paragraphs']}
    score = acoustic_scorer(load_audio(f'{transcript_dir}/audio.wav'))
    rows, style_only = [], 0
    for edit in edits:
        votes = [reference_vote(edit, words) for words in refs.values()]
        if 'style-only' in votes:
            style_only += 1
            continue
        context = edit_context(paragraphs[edit['paragraph']], edit)
        raw_logp, ai_logp = score(context['start'], context['end'], [context['raw'], context['ai']])
        votes.append(acoustic_vote(ai_logp - raw_logp))
        rows.append({k: edit[k] for k in ('id', 'from', 'to', 'confidence', 'category', 'applied', 'start')}
                    | {'votes': dict(zip(['youtube', 'whisper', 'acoustic'], votes)),
                       'acousticMargin': round(ai_logp - raw_logp, 2), 'verdict': verdict(votes)})
    return {'edits': len(edits), 'applied': sum(e['applied'] for e in edits), 'styleOnly': style_only,
            'agreement': agreement,
            'contentEdits': {'applied': tally(rows, True), 'notApplied': tally(rows, False)}, 'rows': rows}
