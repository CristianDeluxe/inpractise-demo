export const workflowSteps = [
  {
    kicker: '01 · Expert call',
    title: 'A conversation with an operator.',
    body: 'In this demo the calls are two public podcast interviews with the CEOs of Roche and Novartis.',
  },
  {
    kicker: '02 · Transcript',
    title: 'Transcribed automatically.',
    body: 'The first pass is a machine transcript. Speaker labels are inferred from the audio and nobody has reviewed them.',
  },
  {
    kicker: '03 · AI cleanup',
    title: 'The AI corrects it and scores its own reliability.',
    body: 'A second AI pass fixes names and terms, and each transcript gets a reliability score. A person spot-checks only the uncertain words, and can sign in to see them.',
  },
  {
    kicker: '04 · Ask',
    title: 'Answers are literal quotes.',
    body: 'Every answer quotes the interview and links to the transcript excerpt it came from. No quote, no answer.',
  },
] as const
