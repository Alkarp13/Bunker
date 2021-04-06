import * as React from "react";

const css = require('./Spinner.css');
let classNames = require('classnames');

interface Props {
    size: number;
}

export default function Spinner(props: Props) {

	let spinnerClass = classNames({
		'Primitives-Spinner'           : true,
		'Primitives-Spinner__default'  : true
	});

    const dimentions = {
        height: props.size + 'px',
        width: props.size + 'px'
    }

	return (
		<span className={spinnerClass} style={{ ...dimentions }}/>
	)
}