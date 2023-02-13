import { mount } from '@vue/test-utils'
import ImageGrid from '../src/components/ImageGrid.vue'
import { describe, it, expect } from 'vitest'
import { Image } from '../src/gql/graphql'

describe('ImageGrid', () => {
  it('should render a grid with images', () => {
    expect(ImageGrid).toBeTruthy()

    const images: Image[] = []
    for (let i = 0; i < 100; i++) {
      images.push({
        filename: `image-${i}.png`,
        url: `https://some-url/image-${i}.png`,
      })
    }

    const wrapper = mount(ImageGrid, {
      props: { images, onImageClick: () => {} },
    })

    const imgComponents = wrapper.findAll('img')
    const spanComponents = wrapper.findAll('span')
    expect(imgComponents).toHaveLength(100)
    expect(spanComponents).toHaveLength(100)

    images.forEach((image, i) => {
      expect(imgComponents[i].attributes()).toHaveProperty('src', image.url)
      expect(spanComponents[i].text()).toBe(image.filename)
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should fire an event to the onImageClick prop when the image container is clicked', () => {
    const images: Image[] = [
      {
        filename: 'image-1.png',
        url: 'https://some-url/image-1.png',
      },
      {
        filename: 'image-2.png',
        url: 'https://some-url/image-2.png',
        captions: ['some', 'captions'],
      },
    ]

    let clicked = false
    const onImageClick = (_: MouseEvent, image: Image) => {
      expect(image).toMatchObject(images[1])
      clicked = true
    }

    const wrapper = mount(ImageGrid, {
      props: { images, onImageClick },
    })

    const cmp = wrapper.findAll('.tm-ig-image').at(1)
    cmp?.trigger('click')

    expect(clicked).toBeTruthy()
  })
})
