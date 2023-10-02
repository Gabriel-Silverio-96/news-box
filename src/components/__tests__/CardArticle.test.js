import { mount } from '@vue/test-utils';
import CardArticle from '@/components/CardArticle.vue';
import { describe, expect, it } from 'vitest';

const url = 'https://example.com';
const image = 'https://example.com/image.jpg';
const title = 'Title card';
const description = 'Description card';
const publishedAt = '2022-09-28T08:14:24Z';
const label = 'Label';

describe('CardArticle.vue', () => {
    it('mount component', () => {
        const wrapper = mount(CardArticle, {
            props: {
                url,
                image,
                title,
                description,
                publishedAt,
                label
            },
        });

        expect(wrapper.exists()).toBe(true)
    });

    it('unmount component', () => {
        const wrapper = mount(CardArticle, {
            props: {
                url,
                image,
                title,
                description,
                publishedAt,
                label
            },
        });

        wrapper.unmount()
        expect(wrapper.exists()).toBe(false)
    });


    it('should correctly render component with defined props', () => {
        const wrapper = mount(CardArticle, {
            props: {
                url,
                image,
                title,
                description,
                publishedAt,
                label
            },
        });

        expect(wrapper.find('a').attributes("href")).toBe(url);
        expect(wrapper.html()).toContain(title);
        expect(wrapper.html()).toContain(description);
        expect(wrapper.html()).toContain('9/28/2022');
        expect(wrapper.html()).toContain(label);
    });

    it('should handles image error', () => {
        const wrapper = mount(CardArticle, {
            props: {
                url,
                image: 'https://example.com/non-existent-image.jpg',
                title,
                description,
                publishedAt,
                label,
            },
        });


        const expected = '/src/assets/images/error-image.png';

        wrapper.find('img').trigger('error');
        expect(wrapper.find('img').attributes('src')).toBe(expected);
    });
});
