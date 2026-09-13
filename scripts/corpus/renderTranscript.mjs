export function renderTranscript(document, turns) {
  return `${document.title}\n${document.disclosure}. Generated for testing; not investment evidence.\nsynthetic: true\nFictional company: ${document.company}\nFictional interview date: ${document.interviewDate}\n\n${turns.map((turn) => `[${turn.paragraphId}] ${turn.speaker === 'Moderator' ? document.moderatorName : document.operatorName} — ${turn.speakerRole}\n${turn.text}`).join('\n\n')}\n`
}
