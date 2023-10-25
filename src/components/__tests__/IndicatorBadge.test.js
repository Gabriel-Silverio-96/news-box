import IndicatorBadge from '@/components/IndicatorBadge.vue';
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

const label = "label badge"

describe('IndicatorBadge.vue', () => {
    it('mount component', () => {
        const wrapper = shallowMount(IndicatorBadge, { props: { label } })

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = shallowMount(IndicatorBadge, { props: { label } })

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should correctly render component with defined props', () => {
        const wrapper = shallowMount(IndicatorBadge, { props: { label } })

        expect(wrapper.text()).toBe(label)
    })
})