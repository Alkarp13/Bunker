import React from 'react';
import { PersonsQueryArray } from './PersonsRow';
import Button from './Primitives/Button/Button';
import ComboBox from './Primitives/ComboBox/ComboBox';
import ModalWindow from './Primitives/ModalWindow/ModalWindow';

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

    private footer: React.ReactNode = (
        <Button 
            intent="success" 
            onClick={
                () => this.props.kickSelectedPlayer(this.state.person_to_kick)
            }>
            Kick now
        </Button>
    );

    render() {
        return (
            <ModalWindow
                title="Time to kick someone"
                modalPosition={'bottom-right'}
                isShown={this.props.is_round_over}
                width={320}
                footer={this.footer}>
                <ComboBox
                    height={40}
                    items={this.props.persons_query.map((item) => { return item.username })}
                    onChange={selected => this.setState({ person_to_kick: selected })}
                    placeholder="Usernames"
                />
            </ModalWindow>
        );
    }
}