import json

from edit_positions import edit_positions


def locate_edits(transcript_dir, threshold):
    """Raw and AI-final paragraph texts, plus every edit with its audio span and whether it is applied."""
    transcript = json.load(open(f'{transcript_dir}/transcript.json'))
    correction = json.load(open(f'{transcript_dir}/correction.json'))
    edits_by_paragraph = {p['paragraphId']: p['edits'] for p in correction['paragraphs']}
    raw_parts, final_parts, edits = [], [], []
    for paragraph in transcript['paragraphs']:
        words = paragraph['words']
        text = ' '.join(w['text'] for w in words)
        starts, pos = [], 0
        for word in words:
            starts.append(pos)
            pos += len(word['text']) + 1
        out, cursor = [], 0
        for i, edit in edit_positions(text, edits_by_paragraph.get(paragraph['id'], [])):
            if i < cursor or not text.startswith(edit['from'], i):
                continue
            j = i + len(edit['from'])
            covered = [k for k, s in enumerate(starts) if s < j and s + len(words[k]['text']) > i]
            applied = edit['confidence'] >= threshold
            out += [text[cursor:i], edit['to'] if applied else edit['from']]
            cursor = j
            edits.append({'id': edit['id'], 'from': edit['from'], 'to': edit['to'],
                          'confidence': edit['confidence'], 'category': edit.get('category'),
                          'applied': applied, 'paragraph': paragraph['id'], 'words': covered,
                          'start': words[covered[0]]['start'], 'end': words[covered[-1]]['end']})
        out.append(text[cursor:])
        raw_parts.append(text)
        final_parts.append(''.join(out))
    return ' '.join(raw_parts), ' '.join(final_parts), edits
