import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Combobox, Button } from 'evergreen-ui';

class ActionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anyone_person: '',
            anyone_card: 'male'
        };
    }

    render() {
        return (
            <Dialog
                isShown={this.props.is_anyperson_shown}
                title="Choose anyone"
                hasFooter={false}
                hasClose={false}
                shouldCloseOnOverlayClick={false}>
                <Combobox
                    openOnFocus
                    height={40}
                    disabled={!this.props.is_anycard_shown}
                    items={['male', 'age', 'IMT', 'profession', 'life', 'phobia', 'hobbi', 'character', 'skill', 'inventar']}
                    onChange={selected => this.setState({ anyone_card: selected })}
                    placeholder="Cards"
                />
                <Combobox
                    openOnFocus
                    height={40}
                    items={this.props.persons_query.map((item) => { return item.username })}
                    onChange={selected => this.setState({ anyone_person: selected })}
                    placeholder="Usernames"
                />
                <div className='bottom-alert-footer'>
                    <Button intent="success" onClick={() => this.props.someoneSelected(this.state.anyone_person, this.state.anyone_card)}>Send</Button>
                </div>
            </Dialog>
        );
    }
}

ActionDialog.propTypes = {
    persons_query: PropTypes.array.isRequired,
    is_anyperson_shown: PropTypes.bool.isRequired,
    is_anycard_shown: PropTypes.bool.isRequired,
    someoneSelected: PropTypes.func.isRequired
}

export default ActionDialog;