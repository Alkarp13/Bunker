import React from 'react';
import Button from './Primitives/Button/Button';
import ModalWindow from './Primitives/ModalWindow/ModalWindow';

const Timer = React.lazy(() => import('./Timer'));

interface Props {
    username    : string;
    duration    : number;
    isShown     : boolean;
    passMove()  : void;
}

interface State {
    isPlaying: boolean;
}

export default class CornerAlert extends React.Component<Props, State> {
    state: Readonly<State> = {
        isPlaying: false
    };

    private footer: React.ReactNode = (
        <>
            <Button 
                intent="success"
                appearance="dark"
                disabled={this.state.isPlaying} 
                onClick={
                    () => this.setState({ isPlaying: true})
                }>
                Start speech
            </Button>
            <Button 
                appearance="primary" 
                intent="danger" 
                onClick={
                    () => this.props.passMove()
                }>
                Stop speech
            </Button>
        </>
    );

    render() {
        return (
            <ModalWindow
                title="Your time to talk"
                modalPosition={'bottom-right'}
                isShown={this.props.isShown}
                width={270}
                height={300}
                footer={this.footer}>
                <React.Suspense fallback="Loading..." >
                    <Timer isPlaying={this.state.isPlaying} duration={this.props.duration} />
                </React.Suspense>
            </ModalWindow>
        );
    }
}