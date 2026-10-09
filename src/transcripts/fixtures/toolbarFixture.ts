/** A toolbar element whose bottom edge sits at the given viewport line. */
export function toolbarFixture(bottom: number) {
  const toolbar = document.createElement('div')
  toolbar.getBoundingClientRect = () => ({ bottom }) as DOMRect
  return toolbar
}
