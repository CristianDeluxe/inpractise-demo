import { PublicLayout } from '@/components/PublicLayout'
import { methodSections } from './methodSections'

export function MethodPage() {
  return (
    <PublicLayout>
      <main id="main-content" className="page-shell py-16">
        <p className="eyebrow text-muted-foreground">Standards</p>
        <h1 className="mt-3 text-4xl">How we handle evidence</h1>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          What an answer can establish, who can read its sources, and what
          remains unavailable.
        </p>
        <div className="mt-12 space-y-12">
          {methodSections.map((section) => (
            <section key={section.title} className="rule-top pt-6">
              <h2 className="text-2xl">{section.title}</h2>
              <p className="prose-measure mt-4 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>
    </PublicLayout>
  )
}
