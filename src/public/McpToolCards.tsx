import { mcpTools } from './mcpTools'

export function McpToolCards() {
  return (
    <section className="page-shell py-16">
      <h2>Tools</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {mcpTools.map((tool) => (
          <article key={tool.name} className="border border-border bg-card p-6">
            <h3 className="break-all font-mono text-base text-primary">
              {tool.name}
            </h3>
            <p className="meta-text mt-2">{tool.input}</p>
            <p className="mt-4 text-sm text-muted-foreground">{tool.output}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
