import React from 'react';
import {cleanup, render} from '@testing-library/react';
import TextArea from './TextArea';

afterEach(cleanup);

describe('Primitives-TextArea компонент', () => {

    it('рендер по-умолчанию', () => {
        const {getByLabelText} = render(
            <TextArea label={'Anything'} value={'666'}/>,
        );
        
        const element = getByLabelText(/anything/i);
        expect(element.textContent).toBe('666');

        const label = document.getElementsByClassName('Primitives-TextArea__label')[0];
        expect(label.textContent).toBe('Anything');
    });
});