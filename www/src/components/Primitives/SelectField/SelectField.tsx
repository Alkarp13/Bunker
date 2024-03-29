import React, { useMemo, useState } from "react";
import CSS from 'csstype';
import './SelectField.css';

let classNames = require('classnames');

interface Props {
    label       : string;
    defaultValue: string;
    style?      : CSS.Properties;
    children?   : React.ReactNode;
    onChange?(value: string): void;
}

const defaultProps: Props = {
    label: '',
    defaultValue: '',
    onChange: (v: string) => {}
}

export default function SelectField(props: Props) {
    const {label, defaultValue, style, children, onChange} = props;
	let selectClass = classNames({
		'Primitives-SelectField': true
	});

    const [value, setValue] = useState(defaultValue);
    const select_id: string = useMemo(() => getRandomId(label), [label]);

    function getRandomId(label: string): string {
        return 'SelectField-' + label.length + Math.floor(Math.random() * 100);
    }

	return (
		<div className={'Primitives-SelectField__container'} style={{ ...style }}>
            <label className={'Primitives-SelectField__label'} htmlFor={select_id}>{label}</label>
            <div className={'Primitives-SelectField__inner_box'}>
                <select id={select_id} 
                    value={value} 
                    className={selectClass} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setValue(e.currentTarget.value); return onChange!(e.currentTarget.value); }
                }>
                    {children}
                </select>
                <svg className={'Primitives-SelectField__svg_arrow'} viewBox={'0 0 16 16'}>
                    <path d={'M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z'}
                        fillRule={'evenodd'}
                    />
                </svg>
            </div>
        </div>
	)
}

SelectField.defaultProps = defaultProps;