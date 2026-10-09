from contains_span import contains_span
from content_tokens import content_tokens

WINDOW_SECONDS = 1.0


def reference_vote(edit, reference_words):
    """Which side an independent recogniser heard around the edit: 'ai', 'raw', 'undecided' or 'style-only'."""
    to, frm = content_tokens(edit['to']), content_tokens(edit['from'])
    if to == frm:
        return 'style-only'
    window = ' '.join(t for t, s in reference_words
                      if edit['start'] - WINDOW_SECONDS <= s <= edit['end'] + WINDOW_SECONDS)
    heard = content_tokens(window)
    ai, raw = contains_span(heard, to), contains_span(heard, frm)
    return 'ai' if ai and not raw else 'raw' if raw and not ai else 'undecided'
