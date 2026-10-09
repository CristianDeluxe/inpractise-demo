export const workflowSteps = [
  {
    kicker: '01 · Interview',
    title: 'An executive talks to an investor.',
    body: 'Here the interviews are two public podcast episodes with the CEOs of Roche and Novartis.',
  },
  {
    kicker: '02 · Machine transcript',
    title: 'Words, timings and speakers.',
    body: 'A local speech model writes the first draft with a confidence per word, and speakers are told apart from the audio.',
  },
  {
    kicker: '03 · AI final',
    title: 'Readable, client-ready text.',
    body: 'A second AI pass removes fillers and stutters, fixes names, figures and terms, and gives every word a reliability score.',
  },
  {
    kicker: '04 · Editor',
    title: 'Review the flagged words, not the hour.',
    body: 'An editor sees each change against the raw transcript, accepts or rejects it, and plays the audio from any word.',
  },
  {
    kicker: '05 · Ask',
    title: 'Answers are literal quotes.',
    body: 'Every answer quotes the interview and links to the excerpt it came from. No quote, no answer.',
  },
] as const
