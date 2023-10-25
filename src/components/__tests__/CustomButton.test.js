import CustomButton from '@/components/CustomButton.vue';
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('CustomButton.vue', () => {
    it('mount component', () => {
        const wrapper = shallowMount(CustomButton)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = shallowMount(CustomButton)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should render the content of the slot', () => {
        const slot = 'Click'
        const wrapper = shallowMount(CustomButton, {
            slots: {
                default: slot
            },
        });

        expect(wrapper.text()).toBe(slot)
    })

    it('should disable the button when the disabled prop is true', () => {
        const wrapper = shallowMount(CustomButton, { props: { disabled: true } })

        // Thread check button disabled: https://stackoverflow.com/questions/70207571/using-vue-test-utils-how-can-i-check-if-a-button-is-disabled
        expect(wrapper.element.disabled).toBe(true)
    })

    it('should emits a click event when clicked', async () => {
        const wrapper = shallowMount(CustomButton)

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})