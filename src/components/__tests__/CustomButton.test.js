import { describe, expect, it } from "vitest";
import CustomButton from '@/components/CustomButton.vue';
import { mount } from "@vue/test-utils";

describe('CustomButton.vue', () => {
    it('mount component', () => {
        const wrapper = mount(CustomButton)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = mount(CustomButton)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should render the content of the slot', () => {
        const slot = 'Click'
        const wrapper = mount(CustomButton, {
            slots: {
                default: slot
            },
        });

        expect(wrapper.text()).toBe(slot)
    })

    it('should disable the button when the disabled prop is true', () => {
        const wrapper = mount(CustomButton, { props: { disabled: true } })

        // Thread check button disabled: https://stackoverflow.com/questions/70207571/using-vue-test-utils-how-can-i-check-if-a-button-is-disabled
        expect(wrapper.element.disabled).toBe(true)
    })

    it('should emits a click event when clicked', async () => {
        const wrapper = mount(CustomButton)

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})