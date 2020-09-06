import React from 'react';
import PropTypes from 'prop-types';
import { Button, CornerDialog } from 'evergreen-ui'
import Timer from "./Timer";

class CornerAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        };
    }
    render() {
        const { isPlaying } = this.state;
        return (
            <CornerDialog
                title="Your time to talk"
                isShown={this.props.isShown}
                width={270}
                hasFooter={false}
                hasClose={false}>
                <Timer isPlaying={isPlaying} duration={this.props.duration} />
                <div className='bottom-alert-footer'>
                    <Button intent="success" disabled={isPlaying} onClick={() => this.setState({ isPlaying: true})}>Start speech</Button>
                    <Button appearance="primary" intent="danger" onClick={() => this.props.passMove()}>Stop speech</Button>
                </div>
            </CornerDialog>
        );
    }
}

CornerAlert.propTypes = {
    username: PropTypes.string,
    duration: PropTypes.number.isRequired,
    isShown:  PropTypes.bool,
    passMove: PropTypes.func.isRequired
}

export default CornerAlert;