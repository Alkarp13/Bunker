import React from "react";
import HeaderButton, { ButtonInterface } from "../HeaderButton/HeaderButton";

const css = require('./TitleBar.css');
let classNames = require('classnames/bind');

export interface ButtonFunctions {
    onClose?(): any;
    onMinimize?(): any;
    onMaximize?(): any;
}

interface Props extends ButtonFunctions {
    ref    : React.RefObject<HTMLInputElement>;
    title  : string;
	cursor : string;
}

export default function TitleBar(props: Props) {
    const styles = {
        main            : 'TitleBar',
        buttons_group   : 'TitleBar_buttons_group',
        title           : 'TitleBar_title'
    }
    let titleClass = classNames.bind(styles);

	return (
        <div className={titleClass('main')}>
            <div className={titleClass('buttons_group')}>
                <HeaderButton type={'minimize'} cursor={props.cursor} onAction={props.onMinimize!} >
                    {'‒'}
                </HeaderButton>
                <HeaderButton type={'maximize'} cursor={props.cursor} onAction={props.onMaximize!} >
                    {'□'}
                </HeaderButton>
                <HeaderButton type={'close'} cursor={props.cursor} onAction={props.onClose!} >
                    {'˟'}
                </HeaderButton>
            </div>
            <div className={titleClass('title')}>
				{props.title}
			</div>
        </div>
	)
}