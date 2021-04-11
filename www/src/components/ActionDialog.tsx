import React from 'react';
import { PersonsQueryArray } from './PersonsRow';
import Button from './Primitives/Button/Button';
import ComboBox from './Primitives/ComboBox/ComboBox';
import ModalWindow from './Primitives/ModalWindow/ModalWindow';

interface State {
    anyone_person   : string;
    anyone_card     : string;
}

interface Props {
    persons_query       : PersonsQueryArray;
    is_anyperson_shown  : boolean;
    is_anycard_shown    : boolean;
    someoneSelected(anyone_person: string, anyone_card: string): void;
}

const card_property = ['male', 'age', 'IMT', 'profession', 'life', 'phobia', 'hobbi', 'character', 'skill', 'inventar'];

export default class ActionDialog extends React.Component<Props, State> {
    state: Readonly<State> = {
        anyone_person: '',
        anyone_card: 'male'
    }

    private footer: React.ReactNode = (
        <Button 
            intent="success"
            appearance="dark"
            onClick={
                () => {
                    this.props.someoneSelected(this.state.anyone_person, this.state.anyone_card)
                }
            }>
            Send
        </Button>
    );

    render() {
        return (
            <ModalWindow
                modalPosition={'center'}
                isShown={this.props.is_anyperson_shown}
                width={300}
                height={190}
                title="Choose anyone"
                footer={this.footer}>
                <ComboBox
                    height={40}
                    disabled={!this.props.is_anycard_shown}
                    items={card_property}
                    onChange={selected => this.setState({ anyone_card: selected })}
                    placeholder="Cards"
                />
                <ComboBox
                    height={40}
                    items={this.props.persons_query.map((item) => { return item.username })}
                    onChange={selected => this.setState({ anyone_person: selected })}
                    placeholder="Usernames"
                />
            </ModalWindow>
        );
    }
}