FILLERS = (('you', 'know'), ('uh',), ('um',), ('er',), ('ah',))


def disfluency_free(tokens):
    """Drop filler words and immediate repetitions so clean-verbatim and verbatim text compare on content."""
    out = []
    for token in tokens:
        out.append(token)
        for filler in FILLERS:
            if tuple(out[-len(filler):]) == filler:
                del out[-len(filler):]
        for n in (3, 2, 1):
            if len(out) >= 2 * n and out[-n:] == out[-2 * n:-n]:
                del out[-n:]
                break
    return out
