import React, {useRef, useState} from 'react';
import CSS from 'csstype';
import ListPortal, { ListBox } from './ListPortal/ListPortal';

const css = require('./ComboBox.css');
let classNames = require('classnames');

interface Props {
    items       : Array<string>;
    style?      : CSS.Properties;
    placeholder?: string;
    dark?       : boolean;
    disabled    : boolean;
    height?     : number;
    width?      : number;
    onChange?(selected: string): void;
}

const defaultProps: Props = {
    items: [],
    disabled: false,
    dark: false,
    height: 40,
    width: 240
}

export default function ComboBox(props: Props) {
    const {items, dark, disabled, placeholder, height, width, style, onChange} = props;

    const [isShown, setIsShown] = useState(false);
    const combo_el: React.RefObject<HTMLDivElement> = useRef(null);

    let comboboxClass = classNames({
        'Primitives-ComboBox'           : true,
        'Primitives-ComboBox__dark'     : dark,
        'Primitives-ComboBox__disabled' : disabled
    });

    let buttonClass = classNames({
        'Primitives-ComboBox__button': true,
        'Primitives-ComboBox__dark'  : dark
    });

    function handleClick() {
        setIsShown(!isShown);
    }

    function handleChange(selected: string): void {
        setIsShown(false);
        if (typeof onChange === 'function') { 
            onChange!(selected)
        }
    }

    return (
        <div ref={combo_el} className={'Primitives-ComboBox__main_container'} style={{ ...style, height: height + 'px' }}>
            <div className={'Primitives-ComboBox__container'}>
                <input className={comboboxClass} type="text" placeholder={placeholder}/>
                <button 
                    className={buttonClass} 
                    type={'button'} 
                    role={'button'}
                    onClick={handleClick}
                >
                    <div className={'Primitives-ComboBox__inner_box'}>
                        <svg className={'Primitives-ComboBox__svg_arrow'} viewBox={'0 0 16 16'}>
                            <path d={'M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z'}
                                  fillRule={'evenodd'}
                            />
                        </svg>
                    </div>
                </button>
            </div>
            <ListPortal>
                <ListBox 
                    items={items} 
                    dark={dark}
                    isShown={isShown}
                    width={width} 
                    top={(combo_el.current) ? combo_el.current!.offsetTop + width! : 9999} 
                    left={(combo_el.current) ? combo_el.current!.offsetLeft : 9999}
                    onChange={handleChange}
                />
            </ListPortal>
        </div>
    )
}

ComboBox.defaultProps = defaultProps;