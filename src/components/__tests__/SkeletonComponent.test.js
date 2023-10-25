import SkeletonComponent from "@/components/SkeletonComponent.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('SkeletonComponent.vue', () => {
    it('mount component', () => {
        const wrapper = shallowMount(SkeletonComponent)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = shallowMount(SkeletonComponent)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should not show the component when prop show is false', () => {
        const wrapper = shallowMount(SkeletonComponent, { props: { show: false } })

        expect(wrapper.isVisible()).toBe(false)
    })

    it('should define the height of the component', () => {
        const wrapper = shallowMount(SkeletonComponent, { props: { height: '60' } })

        expect(wrapper.attributes('style')).toEqual('height: 60rem;')
    })
})