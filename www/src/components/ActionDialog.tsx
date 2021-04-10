import React from 'react';
import { Dialog } from 'evergreen-ui';
import { PersonsQueryArray } from './PersonsRow';
import Button from './Primitives/Button/Button';
import ComboBox from './Primitives/ComboBox/ComboBox';

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

    render() {
        return (
            <Dialog
                isShown={this.props.is_anyperson_shown}
                title="Choose anyone"
                hasFooter={false}
                hasClose={false}
                shouldCloseOnOverlayClick={false}>
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
                <div className='bottom-alert-footer'>
                    <Button intent="success" onClick={() => this.props.someoneSelected(this.state.anyone_person, this.state.anyone_card)}>Send</Button>
                </div>
            </Dialog>
        );
    }
}