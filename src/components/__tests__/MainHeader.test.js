import MainHeader from "@/components/MainHeader.vue";
import { RouterLinkStub, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import store from '@/stores'

describe('MainHeader.vue', () => {
    it('mount component', () => {
        const wrapper = mount(MainHeader, {
            global: {
                plugins: [store],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = mount(MainHeader, {
            global: {
                plugins: [store],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })


    it('should open the aside when clicked on menu button', async () => {
        const wrapper = mount(MainHeader, {
            global: {
                plugins: [store],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.find('aside').isVisible()).toBe(true)
    })

    it('should show message no queries when array queries are empty', async () => {
        const wrapper = mount(MainHeader, {
            global: {
                plugins: [store],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await wrapper.find('button').trigger('click')
        const messageNoQueries = wrapper.find('[data-test="message-no-queries-searched"]')

        expect(messageNoQueries.isVisible()).toBe(true)
    })

    it('should show the query searched and does not show the message of no search performed', async () => {
        const newQuery = 'new query';
        store.commit('addQuery', newQuery)

        const wrapper = mount(MainHeader, {
            global: {
                plugins: [store],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        const messageNoQueries = wrapper.find('[data-test="message-no-queries-searched"]')

        expect(messageNoQueries.isVisible()).toBe(false)
        expect(wrapper.text()).toContain(newQuery)
    })
})