import { methodSections } from './methodSections'

export function MethodSectionList() {
  return (
    <div className="space-y-12">
      {methodSections.map((section) => (
        <section key={section.title} className="rule-top pt-6">
          <h2 className="text-2xl">{section.title}</h2>
          <p className="prose-measure mt-4 text-muted-foreground">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  )
}
