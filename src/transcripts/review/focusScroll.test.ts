// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { editMarkQuery } from './editMarkQuery'
import { readMarkRect } from './readMarkRect'
import { scrollFocusIntoView } from './scrollFocusIntoView'

describe('focus scrolling', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('scrolls the focused mark, else the paragraph, else nothing', () => {
    document.body.innerHTML =
      '<section id="paragraph-p0001"><span data-edit-id="p0001-e1">x</span></section>'
    const scroll = vi.fn()
    Element.prototype.scrollIntoView = scroll
    scrollFocusIntoView({ paragraphId: 'p0001', editId: 'p0001-e1' })
    expect(scroll).toHaveBeenLastCalledWith({ block: 'nearest' })
    scrollFocusIntoView({ paragraphId: 'p0001', editId: 'missing' })
    expect(scroll).toHaveBeenLastCalledWith({ block: 'center' })
    scrollFocusIntoView({ paragraphId: null, editId: null })
    expect(scroll).toHaveBeenCalledTimes(2)
  })

  it('reads the rect of a rendered mark and escapes the id', () => {
    document.body.innerHTML = '<span data-edit-id="p0001-e1">x</span>'
    expect(readMarkRect('p0001-e1')).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      columnRight: 0,
    })
    expect(readMarkRect('absent')).toBeNull()
    expect(editMarkQuery('a"b')).toBe('[data-edit-id="a\\"b"]')
  })
})
