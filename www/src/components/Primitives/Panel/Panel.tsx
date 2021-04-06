import * as React from "react";
import CSS from 'csstype';

const css = require('./Panel.css');
let classNames = require('classnames');

interface Props {
    style? : CSS.Properties;
    dark?  : boolean;
    children?   : React.ReactNode;
}

const defaultProps: Props = {
    dark: false
}

export default function Panel(props: Props) {

	let panelClass = classNames({
		'Primitives-Panel'        : true,
        'Primitives-Panel__dark'  : props.dark
	});

	return (
		<div className={panelClass} style={{ ...props.style }}>
            {props.children}
        </div>
	)
}

Panel.defaultProps = defaultProps;