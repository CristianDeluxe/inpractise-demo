export function readCredential(form: FormData, name: string) {
  const value = form.get(name)
  return typeof value === 'string' ? value : ''
}
