import router from '@/router'
import store from '@/stores'
import ResultSearchView from "@/views/ResultSearchView.vue"
import { RouterLinkStub, mount } from '@vue/test-utils'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const MOCK_ROUTER_PUSH = vi.fn();

const wrapperComponent = () => {
    return mount(ResultSearchView, {
        global: {
            plugins: [store, router],
            stubs: {
                RouterLink: RouterLinkStub,
            },
        }
    })
}


const server = setupServer()


beforeEach(async () => {
    router.push('/result-search')
})

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

describe('ResultSearchView.vue', () => {
    it('mount component', () => {
        const wrapper = wrapperComponent();

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = wrapperComponent();

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should be the initial value of the input equal to the URL query', async () => {
        const query = 'science';

        router.push(`/result-search?query=${query}`)
        await router.isReady()

        const wrapper = wrapperComponent();

        await vi.waitFor(() => {
            const input = wrapper.find('input');

            expect(input.element.value).toBe(query)
        })
    })

    it('should redirect to home when URL query is undefined', async () => {
        wrapperComponent();

        vi.mock('vue-router', async () => {
            const actual = await vi.importActual("vue-router")
            return {
                ...actual,
                useRouter() {
                    return {
                        push: MOCK_ROUTER_PUSH
                    }
                }
            }
        })

        expect(MOCK_ROUTER_PUSH).toHaveBeenCalledWith('/');
    })
})

