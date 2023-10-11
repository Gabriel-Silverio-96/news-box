import router from '@/router'
import store from '@/stores'
import ResultSearchView from "@/views/ResultSearchView.vue"
import { RouterLinkStub, mount } from '@vue/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiBaseURL } from "@/mocks/handlers"
import { SEARCH_NOT_FOUND_MOCK_RESPONSE, SEARCH_SUCCESS_MOCK_RESPONSE } from './mocks/ResultSearch.mock'
import axios from '@/service/axios'
import { formatDate } from '@/helps/format-date'

const MOCK_ROUTER_PUSH = vi.fn();
const query = 'soccer';

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
    vi.clearAllMocks()
    const requestHandler = () =>
        rest.get(apiBaseURL('search'), (req, res, ctx) => {
            return (
                res(ctx.status(200),
                    ctx.json(null))
            )
        })

    server.use(requestHandler())
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

    it('should submit form', async () => {
        const wrapper = wrapperComponent()

        const onSubmitMock = vi.spyOn(wrapper.vm, 'onSubmit')

        await wrapper.find('input').setValue(query)
        await wrapper.find('form').trigger('submit.prevent')


        expect(wrapper.find('input').element.value).toBe(query)
        expect(onSubmitMock).toBeCalledTimes(1)
    })

    it('should not make a request when the input is empty', async () => {
        const requestHandler = () =>
            rest.get(apiBaseURL('search'), (req, res, ctx) => {
                return (
                    res(ctx.status(200),
                        ctx.json(SEARCH_SUCCESS_MOCK_RESPONSE))
                )
            })

        server.use(requestHandler())

        const axiosMock = vi.spyOn(axios, 'get')

        const wrapper = wrapperComponent()

        await wrapper.find('form').trigger('submit.prevent')

        await vi.waitFor(() => {
            expect(axiosMock).toBeCalledTimes(0)
        })
    })

    it('should make a request when the component is mounted', async () => {
        router.push(`/result-search?query=${query}`)
        await router.isReady()

        const requestHandler = () =>
            rest.get(apiBaseURL('search'), (req, res, ctx) => {
                return (
                    res(ctx.status(200),
                        ctx.json(SEARCH_SUCCESS_MOCK_RESPONSE))
                )
            })

        server.use(requestHandler())
        const wrapper = wrapperComponent()

        const { articles } = SEARCH_SUCCESS_MOCK_RESPONSE

        await vi.waitFor(() => {
            articles.forEach((article, index) => {
                expect(wrapper.text()).toContain(article.title)
                expect(wrapper.text()).toContain(article.source.name)
                expect(wrapper.text()).toContain(article.description)
                expect(wrapper.text()).toContain(formatDate(article.publishedAt))

                const anchor = wrapper.findAll('a')[index]
                expect(anchor.attributes('href')).toBe(article.url)

                const attributesSelectorImageAlt = `[alt="${article.title}"]`
                const image = wrapper.find(attributesSelectorImageAlt)
                expect(image.attributes('src')).toBe(article.image)
            })
        })
    })

    it('should be the initial value of the input equal to the URL query', async () => {
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

    it('should make a search request with URL parameters', async () => {
        let searchParams;

        router.push(`/result-search?query=${query}`)
        await router.isReady()

        const requestHandler = () =>
            rest.get(apiBaseURL('search'), (req, res, ctx) => {
                searchParams = req.url.searchParams.get('q');
                return (
                    res(ctx.status(200),
                        ctx.json(SEARCH_SUCCESS_MOCK_RESPONSE))
                )
            })

        const axiosMock = vi.spyOn(axios, 'get')

        server.use(requestHandler())

        wrapperComponent();
        await vi.waitFor(() => {
            expect(axiosMock).toBeCalledTimes(1)
            expect(searchParams).toBe(query);
        })
    })

    it('should show message when result not found', async () => {
        router.push(`/result-search?query=${query}`)
        await router.isReady()

        const requestHandler = () =>
            rest.get(apiBaseURL('search'), (req, res, ctx) => {
                return (
                    res(
                        ctx.status(200),
                        ctx.json(SEARCH_NOT_FOUND_MOCK_RESPONSE)
                    )
                )
            })

        server.use(requestHandler())

        const wrapper = wrapperComponent();

        await vi.waitFor(() => {
            expect(wrapper.find('p', { text: 'Result not found' }).isVisible()).toBe(true)
        })
    })

    it('should make a search request using the input entered', async () => {
        let searchParams;

        router.push(`/result-search?query=${query}`)
        await router.isReady()

        const requestHandler = () =>
            rest.get(apiBaseURL('search'), (req, res, ctx) => {
                searchParams = req.url.searchParams.get('q');
                return (
                    res(ctx.status(200),
                        ctx.json(SEARCH_SUCCESS_MOCK_RESPONSE))
                )
            })

        server.use(requestHandler())

        const wrapper = wrapperComponent()

        const textEnteredInInput = 'science'

        await wrapper.find('input').setValue(textEnteredInInput)
        await wrapper.find('form').trigger('submit.prevent')

        expect(searchParams).toBe(textEnteredInInput)
    })
})