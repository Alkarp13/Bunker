import React from 'react';
import ReactDOM from 'react-dom';
import CSS from 'csstype';
import './DialogPortal.css';

const portal = document.getElementById('portal-for-dialog');
let classNames = require('classnames');

type Positions = 'center' | 'bottom-right'
interface DialogPortalProps {
    children: React.ReactNode;
}

export interface DialogProps {
    title?        : string;
    modalPosition?: Positions;
    isShown?      : boolean;
    width?        : number;
    height?       : number;
    footer?       : React.ReactNode;
    children?     : React.ReactNode;
    style?        : CSS.Properties;
    onClose?(): void;
    onShow?(): void;
}

export default class DialogPortal extends React.Component<DialogPortalProps, {}> {
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

export function Dialog(props: DialogProps) {

    const {title, modalPosition, isShown, width, height, footer, children, style, onClose, onShow} = props;

    let dialogClass = classNames({
        'ModalWindow-Dialog'          : true,
        'ModalWindow-Dialog__hidden'  : !isShown
    });

    const position = (modalPosition === 'bottom-right') ? {right: '50px', bottom: '50px'} : {top: '50%', left: '50%'};

    const Title = (props: {}) => {
        return (
            <div className={'ModalWindow-Dialog__title_container'}>
                <h4 className={'ModalWindow-Dialog__title'}>
                    {title}
                </h4>
            </div>
        );
    };

    return (
        <div className={dialogClass} 
             style={{ 
                 ...style, 
                 ...position, 
                 width: width + 'px', 
                 height: height + 'px'
        }}>
            {(title) ? <Title/> : null}
            <div className={'ModalWindow-Dialog__content'}>
                {children}
            </div>
            <div className={'ModalWindow-Dialog__footer'}>
                {footer}
            </div>
        </div>
    )
}