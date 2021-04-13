import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Spinner from './Spinner';

afterEach(cleanup);

describe('Primitives-Spinner компонент', () => {

    it('рендер по-умолчанию', () => {
        render(
            <Spinner size={66}/>,
        );
        
        const element = document.getElementsByClassName('Primitives-Spinner')[0];

        expect(element.tagName).toBe('SPAN');
    });
});