def edit_positions(text, edits):
    """(start, edit) pairs in text order: recorded offsets when present, else the next occurrence in reading order."""
    placed, cursor = [], 0
    for edit in edits:
        if edit.get('at'):
            placed.append((edit['at'][0], edit))
            continue
        i = text.find(edit['from'], cursor)
        if i >= 0:
            placed.append((i, edit))
            cursor = i + len(edit['from'])
    placed.sort(key=lambda pair: pair[0])
    return placed
