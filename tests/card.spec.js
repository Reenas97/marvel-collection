/**
 * @vitest-environment happy-dom
 */
import {describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import card from '../src/components/card.vue'

describe('card.vue', () => {
  it('renders correctly with props', () => {
    const props = {
      link: 'https://example.com',
      image: 'https://via.placeholder.com/350',
      name: 'Test Card'
    }

    const wrapper = mount(card, {
      props
    })

    expect(wrapper.text()).toContain(props.name)

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(props.image)

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe(props.link)
  })

  it('emits an event when the button is clicked', async () => {
    const props = {
      link: 'https://example.com',
      image: 'https://via.placeholder.com/350',
      name: 'Card'
    }
    const wrapper = mount(card, {
      props
    })

    const button = wrapper.find('.btn')
    await button.trigger('click')

  })
})
