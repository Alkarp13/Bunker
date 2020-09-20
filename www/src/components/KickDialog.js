import React from 'react';
import PropTypes from 'prop-types';
import { CornerDialog, Combobox, Button } from 'evergreen-ui';

class KickDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person_to_kick: ''
        };
    }

    render() {
        return (
            <CornerDialog
                title="Time to kick someone"
                isShown={this.props.is_round_over}
                width={320}
                hasFooter={false}
                hasClose={false}>
                <Combobox
                    openOnFocus
                    height={40}
                    items={this.props.persons_query.map((item) => { return item.username })}
                    onChange={selected => this.setState({ person_to_kick: selected })}
                    placeholder="Usernames"
                />
                <div className='bottom-alert-footer'>
                    <Button intent="success" onClick={() => this.props.kickSelectedPlayer(this.state.person_to_kick)}>Kick now</Button>
                </div>
            </CornerDialog>
        );
    }
}

KickDialog.propTypes = {
    persons_query: PropTypes.array.isRequired,
    is_round_over: PropTypes.bool.isRequired,
    kickSelectedPlayer: PropTypes.func.isRequired
}

export default KickDialog;