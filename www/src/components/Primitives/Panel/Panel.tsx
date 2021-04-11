import * as React from "react";
import CSS from 'csstype';
import './Panel.css';

let classNames = require('classnames');

interface Props {
    style?      : CSS.Properties;
    children?   : React.ReactNode;
}

export default function Panel(props: Props) {

	let panelClass = classNames({
		'Primitives-Panel'        : true
	});

	return (
		<div className={panelClass} style={{ ...props.style }}>
            {props.children}
        </div>
	)
}