from collections import Counter


def tally(rows, applied):
    return dict(Counter(r['verdict'] for r in rows if r['applied'] == applied))
