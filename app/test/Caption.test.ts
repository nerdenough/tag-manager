import { mount } from '@vue/test-utils'
import Caption from '../src/components/Caption.vue'
import { describe, it, expect } from 'vitest'

describe('Caption', () => {
  it('should render with the specified caption text', () => {
    expect(Caption).toBeTruthy()

    const caption = 'Some caption'
    const wrapper = mount(Caption, { props: { caption, remove: () => {} } })

    expect(wrapper.get('span').text()).toBe(caption)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should fire the remove function prop when remove button is pressed', () => {
    const caption = 'Some caption'

    let clicked = false
    const remove = (val: string) => {
      expect(val).toBe(caption)
      clicked = true
    }

    const wrapper = mount(Caption, { props: { caption, remove } })

    wrapper.get('button').trigger('click')
    expect(clicked).toBeTruthy()
  })
})
