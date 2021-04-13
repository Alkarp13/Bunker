import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Text from './Text';

afterEach(cleanup);

describe('Primitives-Text компонент', () => {

    it('рендер по-умолчанию', () => {
        const { getByText } = render(
            <Text>Anything</Text>,
        );

        const element = getByText(/anything/i);

        expect(element.textContent).toBe('Anything');
        expect(element.tagName).toBe('SPAN');
        expect(element.style.fontSize).toBe("14px");
        expect(element.style.color).toBe("white");
    });

    it('должен корректно отрендериться в strong', () => {
        const { getByText } = render(
            <Text color='rgb(251, 230, 162)' size={400} strong={true}>Something</Text>,
        );

        const element = getByText(/something/i);
        
        expect(element.textContent).toBe('Something');
        expect(element.tagName).toBe('STRONG');
        expect(element.style.fontSize).toBe("14px");
        expect(element.style.color).toBe("rgb(251, 230, 162)");
    });

    it('корректная обработка props', () => {
        const { getByText } = render(
            <Text color='rgb(111, 111, 111)' size={600} strong={false}>Control</Text>,
        );

        const element = getByText(/control/i);
        
        expect(element.textContent).toBe('Control');
        expect(element.tagName).toBe('SPAN');
        expect(element.style.fontSize).toBe("20px");
        expect(element.style.color).toBe("rgb(111, 111, 111)");
    });
});