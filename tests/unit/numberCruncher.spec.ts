import { shallowMount } from '@vue/test-utils'
import NumberCruncher from '@/components/NumberCruncher.vue'
import flushPromises from 'flush-promises'

describe('NumberCruncher.vue', () => {
  it('renders body when frequency selected', async () => {
    const wrapper = shallowMount(NumberCruncher)
    const vm = wrapper.vm as any

    // Body should not be rendered until frequency selected is true
    expect(wrapper.find('.number__cruncher-body').element).toBeUndefined()

    vm.frequencySelected = true

    await flushPromises()

    // Body should now be rendered
    expect(wrapper.find('.number__cruncher-body').element).toBeInstanceOf(
      HTMLElement,
    )

    expect(wrapper).toMatchSnapshot()
  })
})
