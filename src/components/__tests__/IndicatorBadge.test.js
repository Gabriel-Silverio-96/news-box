import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest"
import IndicatorBadge from '@/components/IndicatorBadge.vue'

const label = "label badge"

describe('IndicatorBadge.vue', () => {
    it('mount component', () => {
        const wrapper = mount(IndicatorBadge, { props: { label } })

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = mount(IndicatorBadge, { props: { label } })

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should correctly render component with defined props', () => {
        const wrapper = mount(IndicatorBadge, { props: { label } })

        expect(wrapper.text()).toBe(label)
    })
})