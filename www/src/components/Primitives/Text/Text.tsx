import React from 'react';
import './Text.css';

let classNames = require('classnames');

type Size = 300 | 400 | 500 | 600;

interface Props {
    size?       : Size;
    strong?     : boolean;
    color?      : string;
    children?   : React.ReactNode;
}

const defaultProps: Props = {
    size: 400,
    strong: false,
    color: 'white'
}

export default function Text(props: Props) {
    const {strong, size, color, children} = props;
    let style = {
        color: color,
        lineHeight: '24px',
        fontSize: '20px'
    };
    let textClass = classNames({
        'Primitives-Text'        : true,
        'Primitives-Text__strong': strong
    });

    switch (size) {
        case 300:
            style.lineHeight = '16px';
            style.fontSize = '12px';
            break;
        case 400:
            style.lineHeight = '20px';
            style.fontSize = '14px';
            break;
        case 500:
            style.lineHeight = '20px';
            style.fontSize = '16px';
            break;
        case 600:
            style.lineHeight = '24px';
            style.fontSize = '20px';
            break;
        default:
            style.lineHeight = '20px';
            style.fontSize = '14px';
            break;
    }

    if (strong) {
        return (
            <strong className={textClass} style={{...style}}>
                {children}
            </strong>
        );
    } else {
        return (
            <span className={textClass} style={{...style}}>
                {children}
            </span>
        );
    }
}

Text.defaultProps = defaultProps;