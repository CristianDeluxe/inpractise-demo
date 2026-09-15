import type { QuestionFormProps } from './QuestionFormProps'

export function QuestionMode({ research }: QuestionFormProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="operation"
          checked={research.mode === 'ask'}
          onChange={() => {
            research.setMode('ask')
          }}
        />
        Standalone Ask
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="operation"
          checked={research.mode === 'investigate'}
          onChange={() => {
            research.setMode('investigate')
          }}
        />
        Investigate
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="operation"
          checked={research.mode === 'search'}
          onChange={() => {
            research.setMode('search')
          }}
        />
        Passage search
      </label>
    </div>
  )
}
