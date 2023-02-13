import { mount } from '@vue/test-utils'
import Caption from '../src/components/Caption.vue'
import CaptionManager from '../src/components/CaptionManager.vue'
import { describe, it, expect } from 'vitest'
import { Image } from '../src/gql/graphql'

describe('Caption', () => {
  it('should render the component with captions for the selected image', () => {
    expect(CaptionManager).toBeTruthy()

    const selectedImage: Image = {
      filename: 'image.png',
      url: 'https://some-url/image.png',
      captions: ['some', 'captions'],
    }

    const caption = 'Some caption'
    const wrapper = mount(CaptionManager, {
      props: {
        caption,
        selectedImage,
        modelValue: 'model value',
        addCaption: () => {},
        removeCaption: () => {},
      },
    })

    expect(wrapper.find('input').element.value).toBe('model value')
    expect(wrapper.findAllComponents(Caption)).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
