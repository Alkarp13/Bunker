import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import SelectField from './SelectField';

afterEach(cleanup);

describe('Primitives-SelectField компонент', () => {

    it('рендер по-умолчанию', () => {
        const {getByLabelText, getByRole} = render(
            <SelectField label={'Anything'} defaultValue={'some'}>
                <option id={'val1'} value={'some'}>something</option>
                <option id={'val2'} value={'xxx'}>xxx</option>
                <option id={'val3'} value={'yy'}>yyyyy</option>
            </SelectField>
        );

        const select = getByLabelText(/anything/i);
        expect(select.tagName).toBe('SELECT');

        fireEvent.change(select, { target: { value: 'xxx' } });
    });
});