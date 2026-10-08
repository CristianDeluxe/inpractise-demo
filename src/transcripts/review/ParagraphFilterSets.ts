/** Which paragraphs each review filter keeps. */
export type ParagraphFilterSets = {
  readonly attention: ReadonlySet<string>
  readonly deferred: ReadonlySet<string>
  readonly spotcheck: ReadonlySet<string>
}
