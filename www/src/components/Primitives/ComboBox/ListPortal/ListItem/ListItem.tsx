import React, {useState} from 'react';
import CSS from 'csstype';
import './ListItem.css';

let classNames = require('classnames');

interface Props {
    title       : string;
    style       : CSS.Properties;
    onChange?(selected: string): void;
}

const defaultProps: Props = {
    title: '',
    style: {
        top: '0px'
    }
}

export default function ListItem(props: Props) {
    const [hover, setHover] = useState(false);

    let itemClass = classNames({
        'ListBox-ListItem'        : true,
        'ListBox-ListItem__hover'  : hover
    });

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (typeof props.onChange === 'function') { 
            props.onChange!(props.title)
        }
    }

    function handleMouseOver() {
        setHover(true);
    }

    function handleMouseLeave() {
        setHover(false);
    }

    return (
        <div 
            className={itemClass} 
            style={props.style} 
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}>
            <div className={'ListBox-ListItem__item'}>
                <span className={'ListBox-ListItem__title_container'}>
                    <div className={'ListBox-ListItem__title'} >
                        {props.title}
                    </div>
                </span>
            </div>
        </div>
    )
}

ListItem.defaultProps = defaultProps;