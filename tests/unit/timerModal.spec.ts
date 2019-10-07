import { shallowMount } from '@vue/test-utils'
import TimerModal from '@/components/TimerModal.vue'
import flushPromises from 'flush-promises'
import Vue from 'vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)

describe('TimerModal.vue', () => {
  it('renders props.value when passed', async () => {
    const value = '12'
    const wrapper = shallowMount(TimerModal, {
      propsData: { value },
    })

    const input = wrapper.find('input').element as HTMLInputElement

    await flushPromises()

    expect(input.value).toMatch(value)

    expect(wrapper).toMatchSnapshot()
  })
})
