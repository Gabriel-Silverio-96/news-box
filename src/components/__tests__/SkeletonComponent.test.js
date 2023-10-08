import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SkeletonComponent from "@/components/SkeletonComponent.vue";

describe('SkeletonComponent.vue', () => {
    it('mount component', () => {
        const wrapper = mount(SkeletonComponent)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = mount(SkeletonComponent)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should not show the component when prop show is false', () => {
        const wrapper = mount(SkeletonComponent, { props: { show: false } })

        expect(wrapper.isVisible()).toBe(false)
    })

    it('should define the height of the component', () => {
        const wrapper = mount(SkeletonComponent, { props: { height: '60' } })

        expect(wrapper.attributes('style')).toEqual('height: 60rem;')
    })
})