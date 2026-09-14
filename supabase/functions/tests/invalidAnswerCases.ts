import { providerContentFixture } from './providerContentFixture.ts'

export const invalidAnswerCases = [
  { name: 'malformed JSON', content: '{' },
  { name: 'free prose', content: 'This is an uncited answer.' },
  {
    name: 'missing source label',
    content: providerContentFixture({ text: 'Missing evidence.' }),
  },
  {
    name: 'empty sources',
    content: providerContentFixture({ text: 'Uncited.', sources: [] }),
  },
  {
    name: 'zero source label',
    content: providerContentFixture({ text: 'Zero.', sources: [0] }),
  },
  {
    name: 'fractional source label',
    content: providerContentFixture({ text: 'Fraction.', sources: [1.5] }),
  },
  {
    name: 'invented passage ID',
    content: providerContentFixture({
      text: 'Invented.',
      sources: ['invented-passage'],
    }),
  },
  {
    name: 'label beyond schema bound',
    content: providerContentFixture({ text: 'Too large.', sources: [9] }),
  },
  {
    name: 'valid label absent from supplied context',
    content: providerContentFixture({ text: 'Not supplied.', sources: [2] }),
  },
  {
    name: 'not_found carrying claims',
    content: providerContentFixture(undefined, 'not_found'),
  },
  {
    name: 'answered without claims',
    content: JSON.stringify({
      status: 'answered',
      claims: [],
      missingEvidence: [],
    }),
  },
  {
    name: 'partial without claims',
    content: JSON.stringify({
      status: 'partial',
      claims: [],
      missingEvidence: [],
    }),
  },
  {
    name: 'conflict without claims',
    content: JSON.stringify({
      status: 'conflict',
      claims: [],
      missingEvidence: [],
    }),
  },
  {
    name: 'obeyed injection citing a label that was never supplied',
    content: providerContentFixture({
      text: 'Northstar is a strong buy.',
      sources: [7],
    }),
  },
  {
    name: 'obeyed injection answering with no evidence at all',
    content: JSON.stringify({
      status: 'answered',
      claims: [{ text: 'Northstar is a strong buy.', sources: [] }],
      missingEvidence: [],
    }),
  },
]
