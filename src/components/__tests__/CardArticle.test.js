import { mount } from '@vue/test-utils';
import CardArticle from '@/components/CardArticle.vue';
import { describe, expect, it } from 'vitest';

const url = 'https://example.com';
const image = 'https://example.com/image.jpg';
const title = 'Title card';
const description = 'Description card';
const publishedAt = '2022-09-28T08:14:24Z';
const label = 'Label';

const wrapperComponent = (props) =>
    mount(CardArticle, {
        props: {
            url,
            image,
            title,
            description,
            publishedAt,
            label,
            ...props
        },
    });

describe('CardArticle.vue', () => {
    it('mount component', () => {
        const wrapper = wrapperComponent()

        expect(wrapper.exists()).toBe(true)
    });

    it('unmount component', () => {
        const wrapper = wrapperComponent()

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    });


    it('should correctly render component with defined props', () => {
        const wrapper = wrapperComponent()

        expect(wrapper.find('a').attributes("href")).toBe(url);
        expect(wrapper.text()).toContain(title);
        expect(wrapper.text()).toContain(description);
        expect(wrapper.text()).toContain('9/28/2022');
        expect(wrapper.text()).toContain(label);
    });

    it('should handles image error', async () => {
        const wrapper = wrapperComponent({ image: 'https://example.com/non-existent-image.jpg' })

        const expected = '/src/assets/images/error-image.png';

        await wrapper.find('img').trigger('error');

        expect(wrapper.find('img').attributes('src')).toBe(expected);
    });
});
