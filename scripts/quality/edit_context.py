CONTEXT_SECONDS = 4.0
MARGIN_SECONDS = 0.2


def edit_context(words, edit):
    """The edit's sentence context as raw and AI wordings, with the audio span that covers it."""
    first, last = edit['words'][0], edit['words'][-1]
    lo = min(k for k in range(first + 1) if words[k]['start'] >= words[first]['start'] - CONTEXT_SECONDS)
    hi = max(k for k in range(last, len(words)) if words[k]['end'] <= words[last]['end'] + CONTEXT_SECONDS)
    raw = ' '.join(w['text'] for w in words[lo:hi + 1])
    return {'raw': raw, 'ai': raw.replace(edit['from'], edit['to'], 1),
            'start': words[lo]['start'] - MARGIN_SECONDS, 'end': words[hi]['end'] + MARGIN_SECONDS}
