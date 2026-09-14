import { evidenceSteps } from './evidenceStepContent'

export function EvidenceSteps() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {evidenceSteps.map((step, index) => (
        <div
          key={step.number}
          className={`border-l-2 p-4 ${index === 0 ? 'border-steel bg-secondary' : 'border-border text-muted-foreground'}`}
        >
          <p className="flex gap-4 text-[15px]">
            <span className={`font-bold ${index === 0 ? 'text-steel' : ''}`}>
              {step.number}
            </span>
            {step.text}
          </p>
        </div>
      ))}
    </div>
  )
}
