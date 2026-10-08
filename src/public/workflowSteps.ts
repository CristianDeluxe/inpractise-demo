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
    kicker: '03 · Human cleanup',
    title: 'A person corrects the text.',
    body: 'Sign in to review a transcript, keep the corrections for reuse, and see what the cleanup costs per audio hour.',
  },
  {
    kicker: '04 · Ask',
    title: 'Answers are literal quotes.',
    body: 'Every answer quotes the interview and links to the transcript excerpt it came from. No quote, no answer.',
  },
] as const
