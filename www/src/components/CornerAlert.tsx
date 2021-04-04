import React from 'react';
import { Button, CornerDialog } from 'evergreen-ui'

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

    render() {
        const { isPlaying } = this.state;
        return (
            <CornerDialog
                title="Your time to talk"
                isShown={this.props.isShown}
                width={270}
                hasFooter={false}
                hasClose={false}>
                <React.Suspense fallback="Loading..." >
                    <Timer isPlaying={isPlaying} duration={this.props.duration} />
                </React.Suspense>
                <div className='bottom-alert-footer'>
                    <Button intent="success" disabled={isPlaying} onClick={() => this.setState({ isPlaying: true})}>Start speech</Button>
                    <Button appearance="primary" intent="danger" onClick={() => this.props.passMove()}>Stop speech</Button>
                </div>
            </CornerDialog>
        );
    }
}