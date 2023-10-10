import store from '@/stores'
import HomeView from "@/views/HomeView.vue"
import { RouterLinkStub, mount } from "@vue/test-utils"
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { apiBaseURL } from "@/mocks/handlers"
import { formatDate } from '@/helps/format-date'
import router from '@/router'
import { rest } from 'msw'
import { TOP_HEADLINES_SUCCESS_MOCK_RESPONSE, TOP_HEADLINES_ERROR_MOCK_RESPONSE } from './mocks/HomeView.mock'

const wrapperComponent = () =>
    mount(HomeView, {
        global: {
            plugins: [store, router],
            stubs: {
                RouterLink: RouterLinkStub,
            }
        }
    })

const server = setupServer()

beforeAll(() => {
    const requestHandler = () =>
        rest.get(apiBaseURL('top-headlines'), (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(null)
            )
        })

    server.use(requestHandler())
    server.listen()
})

afterAll(() => {
    server.close()
})

describe('HomeView.vue', () => {
    it('mount component', () => {
        const wrapper = wrapperComponent()

        expect(wrapper.exists()).toBe(true)
    })

    it('unmount component', () => {
        const wrapper = wrapperComponent()

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    })

    it('should submit form', async () => {
        const wrapper = wrapperComponent()

        const query = 'race'
        const onSubmitMock = vi.spyOn(wrapper.vm, 'onSubmit')

        await wrapper.find('input').setValue(query)
        await wrapper.find('form').trigger('submit.prevent')


        expect(wrapper.find('input').element.value).toBe(query)
        expect(onSubmitMock).toBeCalledTimes(1)
    })

    it('should make a request when the component is mounted', async () => {
        const requestHandler = () =>
            rest.get(apiBaseURL('top-headlines'), (req, res, ctx) => {
                return (
                    res(ctx.status(200),
                        ctx.json(TOP_HEADLINES_SUCCESS_MOCK_RESPONSE))
                )
            })

        server.use(requestHandler())
        const wrapper = wrapperComponent()

        const { articles } = TOP_HEADLINES_SUCCESS_MOCK_RESPONSE

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

    it('should show error message when request fails', async () => {
        const requestHandler = () =>
            rest.get(apiBaseURL('top-headlines'), (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json(TOP_HEADLINES_ERROR_MOCK_RESPONSE)
                )
            })

        server.use(requestHandler())
        const wrapper = wrapperComponent()

        const [message] = TOP_HEADLINES_ERROR_MOCK_RESPONSE.errors
        const alertComponent = wrapper.find('[role="alert"]')

        await vi.waitFor(() => {
            expect(wrapper.text()).toContain(message);
            expect(alertComponent.isVisible()).toBe(true);
        })
    })

    it.only('should show default error message when request fails', async () => {
        const requestHandler = () =>
            rest.get(apiBaseURL('top-headlines'), (req, res, ctx) => {
                return res(
                    ctx.status(402),
                    ctx.json(null)
                )
            })

        server.use(requestHandler())
        const wrapper = wrapperComponent()

        await vi.waitFor(() => {
            expect(wrapper.text()).toContain('There was an error, please try again later')
        })
    })
})