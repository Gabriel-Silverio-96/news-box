import TextField from "@/components/TextField.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('TextField.vue', () => {
    it('mount component', () => {
        const wrapper = shallowMount(TextField)

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = shallowMount(TextField)

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should correctly render component with defined props', () => {
        const label = 'Textfield label'
        const id = 'id-textfiel'
        const placeholder = 'Ex: Placeholder'
        const value = 'Value Textfield'
        const type = 'text'

        const wrapper = shallowMount(TextField, { props: { label, id, placeholder, value, type } })

        const input = wrapper.find('input')

        expect(wrapper.text()).toContain(label)
        expect(input.attributes('id')).toBe(id)
        expect(input.attributes('placeholder')).toBe(placeholder)
        expect(input.element.value).toBe(value)
        expect(input.attributes('type')).toBe(type)
    })

    it('should update the input value', async () => {
        const wrapper = shallowMount(TextField)

        const input = wrapper.find('input')
        const newValue = 'new value'

        await input.setValue(newValue)

        const [emittedValue] = wrapper.emitted('update:modelValue').flat()

        expect(input.element.value).toBe(newValue)
        expect(emittedValue).toBe(newValue)
    })
})