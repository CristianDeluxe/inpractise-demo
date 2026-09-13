export function ConfigurationNotice() {
  return (
    <main id="main-content" className="page-shell py-16">
      <h1 className="text-3xl">Workspace configuration required</h1>
      <p className="mt-5">
        Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the ignored
        local build environment. Use the project’s publishable key.
      </p>
    </main>
  )
}
