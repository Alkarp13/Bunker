import React, { useMemo } from "react";
import CSS from 'csstype';
import { string } from "prop-types";

const css = require('./Avatar.css');
let classNames = require('classnames');
type BaseColor = 'random' | 'red' | 'green' | 'blue' | 'yellow' | 'orange';

const hueOfBaseColor = {
    red: 0,
    green: 135,
    blue: 240,
    yellow: 45,
    orange: 15
}

interface Props {
    size        : number;
    src?        : string;
    color?      : BaseColor;
    name?       : string;
    isSolid?    : boolean;
    'data-rh'?    : string;
    style?      : CSS.Properties;
    marginRight?: number;

    getInitials?(name: string): string;
    onClick?(e?: React.MouseEvent<HTMLElement>): void;
}

function getDefaultInitials(name: string): string {
    let result: string = "";

    name = name.toUpperCase();
    if (name) {
        const space_index: number = name.indexOf(' ', 0);

        result += name[0];
        if (space_index !== -1) {
            result += name[space_index];
        }
    }

    return result;
}

const defaultProps: Props = {
    size: 16,
    'data-rh': "",
    isSolid: false,
    color: 'random',
    name: "",
    src: 'none',
    marginRight: 5,
    getInitials: getDefaultInitials,
    onClick: () => {}
}

interface Color {
    bg_color    : string;
    text_color  : string;
}

export default function Avatar(props: Props) {
    const {size, src, name, isSolid, style, color, marginRight, getInitials, onClick} = props;
    const dimentions = {
        height: size + 'px',
        width: size + 'px'
    }

    const avatar_color: Color = useMemo(() => getRandomColor(color), [color]);

	let avatarClass = classNames({
		'Primitives-Avatar'        : true,
        'Primitives-Avatar__solid' : isSolid
	});

    function getRandomColor(color?: BaseColor): Color {
        const start: string = 'hsl(';
        const end: string = ',50%,40%)';

        let bg_color: number = 0;
        let text_color: number = 0;

        if (color && color === 'random') {
            bg_color = Math.floor(Math.floor(Math.random() * 350) / 20) * 20;
        } else {
            bg_color = hueOfBaseColor[color!];
        }
            
        text_color = (bg_color < 180) ? bg_color + 180 : bg_color - 180;

        return {
            bg_color: start + bg_color + end, 
            text_color: (!isSolid) ? start + text_color + end : 'white'
        };
    }

	return (
		<div className={avatarClass} 
             data-rh={props['data-rh']}
             style={{
                 backgroundImage: src,
                 marginRight: marginRight,
                 backgroundColor: avatar_color.bg_color, 
                 ...dimentions, 
                 ...style 
            }}>
            <span className={'Primitives-Avatar__inner'} 
                style={{
                    fontSize: Math.ceil((size * 37) / 96) + 'px',
                    ...dimentions,
                    color: avatar_color.text_color
                }}
                onClick={onClick}
            >
                {getDefaultInitials(name!)}
            </span>
        </div>
	)
}

Avatar.defaultProps = defaultProps;