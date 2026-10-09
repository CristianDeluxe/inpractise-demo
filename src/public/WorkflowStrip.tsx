import { workflowSteps } from './workflowSteps'

export function WorkflowStrip() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="page-shell mb-24 pt-20"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 id="workflow-heading">How the workflow runs</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          From a recorded conversation to a transcript you can send and an
          answer you can check.
        </p>
      </div>
      <ol className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
        {workflowSteps.map((step) => (
          <li key={step.kicker} className="bg-background p-7">
            <p className="eyebrow text-primary">{step.kicker}</p>
            <h3 className="mt-5 text-xl">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
