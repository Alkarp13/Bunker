import React from 'react';
import { Dialog, Combobox } from 'evergreen-ui';
import { PersonsQueryArray } from './PersonsRow';
import { PersonInfo } from './PersonCard';
import Button from './Button/Button'

interface State {
    anyone_person   : PersonInfo;
    anyone_card     : string;
}

interface Props {
    persons_query       : PersonsQueryArray;
    is_anyperson_shown  : boolean;
    is_anycard_shown    : boolean;
    someoneSelected(anyone_person: PersonInfo, anyone_card: string): void;
}

export default class ActionDialog extends React.Component<Props, State> {
    state: Readonly<State> = {
        anyone_person: {} as PersonInfo,
        anyone_card: 'male'
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