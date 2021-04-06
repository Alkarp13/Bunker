import React, { useState } from "react";

const css = require('./Button.css');
let classNames = require('classnames');

interface VisualProps {
    appearance?	: 'default' | 'primary';
    intent?     : 'none' | 'success' | 'danger';
    disabled?   : boolean;
    width?      : number;
    marginTop?  : number;
    marginLeft? : number;
}

interface Props extends VisualProps {
    children?   : React.ReactNode;
    className?  : string;
	onClick()	: any;
}

const defaultProps: VisualProps = {
    appearance : 'default',
    intent     : 'none',
    disabled   : false
}

export default function Button(props: Props) {
    const { appearance, intent, disabled, children, onClick } = props;

	let btnClass = classNames({
		'Button'                : true,
        'Button__disabled'		: disabled,
		'Button__default'		: !disabled && (appearance === 'default'),
        'Button__primary'		: !disabled && (appearance === 'primary'),
        'Button__intent_none'	: !disabled && (intent === 'none'),
        'Button__intent_success': !disabled && (intent === 'success'),
        'Button__intent_danger'	: !disabled && (intent === 'danger')
	});

	return (
		<button 
			className={btnClass}
			onClick={ onClick }>
            {children}
		</button>
	)
}

Button.defaultProps = defaultProps;