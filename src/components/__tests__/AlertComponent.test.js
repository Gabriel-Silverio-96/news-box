import AlertComponent from "@/components/AlertComponent.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

const TESTS_CASES = [
    {
        message: 'This is an error message',
        severity: 'error',
        expectedClass: 'alert-error',
    },
    {
        message: 'This is a warning message',
        severity: 'warning',
        expectedClass: 'alert-warning',
    },
    {
        message: 'This is a info message',
        severity: 'info',
        expectedClass: 'alert-info',
    },
    {
        message: 'This is a success message',
        severity: 'success',
        expectedClass: 'alert-success',
    }
]


describe("AlertComponent.vue", () => {
    it("mount component", () => {
        const wrapper = shallowMount(AlertComponent, {
            props: {
                message: 'This is an alert message',
                severity: 'error',
                show: true,
            },
        });

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = shallowMount(AlertComponent, {
            props: {
                message: 'This is an alert message',
                severity: 'error',
                show: true,
            },
        });

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    });

    it.each(TESTS_CASES)(
        'should show the alert with the defined message, severity and show properties',
        ({ message, severity, expectedClass }) => {
            const wrapper = shallowMount(AlertComponent, {
                props: {
                    message,
                    severity,
                    show: true,
                },
            });

            expect(wrapper.exists()).toBeTruthy()
            expect(wrapper.text()).toContain(message);
            expect(wrapper.classes()).toContain(expectedClass);
        }
    );
})