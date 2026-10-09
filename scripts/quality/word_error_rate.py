import jiwer

from content_tokens import content_tokens


def word_error_rate(reference, hypothesis):
    ref = ' '.join(content_tokens(reference))
    out = jiwer.process_words(ref, ' '.join(content_tokens(hypothesis)))
    return {'wer': round(out.wer, 4), 'substitutions': out.substitutions, 'deletions': out.deletions,
            'insertions': out.insertions, 'referenceWords': len(ref.split())}
