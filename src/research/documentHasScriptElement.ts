/**
 * A rendered `<script>` element means untrusted text was inserted as markup
 * rather than escaped as text. Tests assert this is false for hostile quotes.
 */
export function documentHasScriptElement(): boolean {
  return document.querySelector('script') !== null
}
