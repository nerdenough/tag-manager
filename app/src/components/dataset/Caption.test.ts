import { mount } from '@vue/test-utils'
import Caption from './Caption.vue'
import { describe, it, expect } from 'vitest'

describe('Caption', () => {
  it('should render with the specified caption text', () => {
    const caption = 'Some caption'
    const wrapper = mount(Caption, { props: { caption, remove: () => {} } })

    expect(wrapper.get('span').text()).toBe(caption)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should fire the remove function prop when remove button is pressed', () => {
    const caption = 'Some caption'
    const remove = (val: string) => {
      expect(val).toBe(caption)
    }
    const wrapper = mount(Caption, { props: { caption, remove } })

    wrapper.get('button').trigger('click')
  })
})
