from whisper_normalizer.english import EnglishTextNormalizer

from disfluency_free import disfluency_free

NORMALIZE = EnglishTextNormalizer()


def content_tokens(text):
    """Whisper's English normalisation (case, punctuation, numbers, spelling) without disfluencies."""
    return disfluency_free(NORMALIZE(text).split())
