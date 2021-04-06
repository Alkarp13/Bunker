import React from 'react';
import { CornerDialog, Combobox } from 'evergreen-ui';
import { PersonsQueryArray } from './PersonsRow';
import Button from './Primitives/Button/Button';

interface State {
    person_to_kick: string;
}

interface Props {
    is_round_over       : boolean;
    persons_query       : PersonsQueryArray;
    kickSelectedPlayer(person_to_kick: string): void;
}

export default class KickDialog extends React.Component<Props, State> {
    state: Readonly<State> = {
        person_to_kick: ''
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