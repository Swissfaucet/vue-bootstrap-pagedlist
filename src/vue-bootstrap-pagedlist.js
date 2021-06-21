import { shallowMount } from '@vue/test-utils'
import VuePagedList from './vue-bootstrap-pagedlist.vue'

test('Renders', () => {
  const wrapper = shallowMount(VuePagedList)
  expect(wrapper.exists()).toBe(true)
})