import React from 'react';
import ReactDOM from 'react-dom';
import CSS from 'csstype';
import ListItem from './ListItem/ListItem';

const css = require('./ListPortal.css');
const portal = document.getElementById('portal-for-combo');
let classNames = require('classnames');

interface ListPortalProps {
    children?   : React.ReactNode;
}

interface ListBoxProps {
    style?      : CSS.Properties;
    items       : Array<string>;
    isShown?    : boolean;
    top?        : number;
    left?       : number;
    width?      : number;
    dark?       : boolean;
    children?   : React.ReactNode;
    onChange?(selected: string): void;
}

const defaultProps: ListBoxProps = {
    top: 9999,
    left: 9999,
    isShown: false,
    items: [],
    width: 240,
    dark: false
}

export default class ListPortal extends React.Component<ListPortalProps, {}> {
    private el: HTMLDivElement = document.createElement('div');

    componentDidMount() {
        portal!.appendChild(this.el);
    }

    componentWillUnmount() {
        portal!.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

export function ListBox(props: ListBoxProps) {

    const {isShown, dark, top, left, width, items, style, onChange} = props;

    let listClass = classNames({
        'ComboBox-ListBox'          : true,
        'ComboBox-ListBox__dark'    : isShown && dark,
        'ComboBox-ListBox__hidden'  : !isShown
    });

    const height = items.length * 32 + 'px';

    return (
        <div className={listClass} style={{ ...style, top: top + 'px', left: left + 'px'}}>
            <div style={{width: width + 'px'}}>
                <div className={'ComboBox-ListBox__items_container'} style={{height: height}}>
                    <div className={'ComboBox-ListBox__items'} style={{height: height}}>
                        {items.map(function (item, index) {
                            return (
                                <ListItem 
                                    dark={dark} 
                                    title={item} 
                                    style={{top: index * 32 + 'px'}}
                                    onChange={onChange}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

ListBox.defaultProps = defaultProps;