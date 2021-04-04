import React, { useState } from "react";

const css = require('./HeaderButton.css');
let classNames = require('classnames');

export interface ButtonInterface {
	type 		: string;
	children	: React.ReactNode;
	cursor		: string;
	onAction()	: any;
}

export default function HeaderButton(props: ButtonInterface) {

	const [ hover, setHover ] = useState(false);
	const [ down, setDown ] = useState(false);

	const { type, children, cursor, onAction } = props;
	const dragging = /resize$/.test(cursor);

	var btnClass = classNames({
		'TitleBar-HeaderButton'				: true,
		'TitleBar-HeaderButton__close'		: type === 'close',
		'TitleBar-HeaderButton__minimize'	: type === 'minimize',
		'TitleBar-HeaderButton__maximize'	: type === 'maximize',
		'HeaderButton_state_hover'			: hover && !dragging,
		'HeaderButton_state_down'			: down && !dragging
	});

	return (
		<button 
			className={btnClass}
			onMouseEnter={ () => setHover(true) }
			onMouseLeave={ () => { setHover(false); setDown(false); }}
			onMouseDown={ () => setDown(true) }
			onMouseUp={ () => setDown(false) }
			onClick={ (typeof onAction === "function") ? onAction : () => {} }
			style={ {cursor: cursor} }>
			{children}
		</button>
	)
}