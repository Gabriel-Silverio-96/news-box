import LoadingIcon from '@/components/LoadingIcon.vue';
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('LoadingIcon.vue', () => {
    it('mmont component', () => {
        const wrapper = shallowMount(LoadingIcon)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmmont component', () => {
        const wrapper = shallowMount(LoadingIcon)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should not be visible when isLoading is false', () => {
        const wrapper = shallowMount(LoadingIcon, { props: { isLoading: false } })

        expect(wrapper.isVisible()).toBe(false)
    })

    it('should correctly render component with defined props', () => {
        const message = 'message loading'
        const width = '50'
        const height = '45'

        const wrapper = shallowMount(LoadingIcon, { props: { message, width, height } })

        expect(wrapper.text()).toBe(message)
        expect(wrapper.find('img').attributes('width')).toBe(width)
        expect(wrapper.find('img').attributes('height')).toBe(height)
    })
})