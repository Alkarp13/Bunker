import React from 'react';
import DialogPortal, {Dialog, DialogProps} from './DialogPortal/DialogPortal';

const defaultProps: DialogProps = {
    modalPosition: 'bottom-right',
    isShown: false,
    width: 240,
    height: 240,
    title: ''
}

export default function ModalWindow(props: DialogProps) {
    return (
        <DialogPortal>
            <Dialog {...props}/>
        </DialogPortal>
    )
}

ModalWindow.defaultProps = defaultProps;