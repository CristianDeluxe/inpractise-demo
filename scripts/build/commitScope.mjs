// The conventional scope of a subject, or its type when it has no scope:
// "feat(research): ..." reads research, "docs: ..." reads docs.
export function commitScope(subject) {
  const match = /^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?!?:/.exec(subject)
  return match?.groups?.['scope'] ?? match?.groups?.['type'] ?? 'other'
}
