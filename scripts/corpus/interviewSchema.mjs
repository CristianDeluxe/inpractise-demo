export const interviewSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['sourceId', 'title', 'origin', 'disclosure', 'turns'],
  properties: {
    sourceId: { type: 'string' },
    title: { type: 'string' },
    origin: { type: 'string', enum: ['synthetic'] },
    disclosure: {
      type: 'string',
      enum: ['Synthetic interview — fictional company and speaker'],
    },
    turns: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['paragraphId', 'speaker', 'speakerRole', 'section', 'text'],
        properties: {
          paragraphId: { type: 'string' },
          speaker: {
            type: 'string',
            enum: ['Moderator', 'Fictional operator'],
          },
          speakerRole: { type: 'string' },
          section: { type: 'string' },
          text: { type: 'string' },
        },
      },
    },
  },
}
