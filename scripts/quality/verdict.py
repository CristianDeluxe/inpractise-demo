ACOUSTIC_MARGIN = 1.0


def verdict(votes):
    """Two independent signals agreeing, and none against, decide an edit; anything else is contested."""
    ai, raw = votes.count('ai'), votes.count('raw')
    if ai >= 2 and raw == 0:
        return 'confirmed'
    if raw >= 2 and ai == 0:
        return 'contradicted'
    return 'contested'
