import React from 'react';
import PersonCard, { PersonInfo } from './PersonCard';
import Button from './Primitives/Button/Button';
import Spinner from './Primitives/Spinner/Spinner';
import Panel from './Primitives/Panel/Panel';
import SelectField from './Primitives/SelectField/SelectField';

const DraggableWindow = React.lazy(() => import('./DraggableWindow/DraggableWindow'));

interface Props {
    person: PersonInfo;
    sendCharacteristicToSocked(selected_field: string): void;
}

interface State {
    selected_field: string;
}

export default class CurrentPerson extends React.Component<Props, State> {

    state: Readonly<State> = {
        selected_field: 'male'
    }

    checkDisabled(shown_fields: Array<string> = [], field: string): boolean {
        if (shown_fields.length > 0) {
            let result = false;
            shown_fields.forEach(function (s_field) {
                if (s_field === field) result = true;
            });

            return result;
        } else {
            return false;
        }
    }

    render() {
        return (
            <React.Suspense fallback={<Spinner size={32} />} >
                <DraggableWindow title={ 'My person card' } >
                    <PersonCard person={this.props.person} other={false} changeNoteHandler={(text: string, username: string) => {}}/>
                    <Panel style={{
                        display: "flex",
                        width: "100%", 
                        float: "left"
                    }}>
                        <SelectField
                            style={{
                                width: '200px',
                                marginTop: '10px',
                                marginLeft: '5px'
                            }}
                            dark={true}
                            defaultValue='male'
                            label='Choose field to show: '
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selected_field: e.currentTarget.value })}>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'male')} value='male'>Male</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'age')} value='age'>Age</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'growth')} value='imt'>IMT</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'profession')} value='profession'>Profession</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'life')} value='life'>Life</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'phobia')} value='phobia'>Phobia</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'hobbi')} value='hobbi'>Hobbi</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'character')} value='character'>Character</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'skill')} value='skill'>Skill</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'inventar')} value='inventar'>Inventar</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'action_1')} value='action_1'>First action card</option>
                            <option disabled={this.checkDisabled(this.props.person.shown_fields, 'action_2')} value='action_2'>Second action card</option>
                        </SelectField>
                        <Button
                            style={{
                                width: "70px", 
                                marginTop: '10px', 
                                marginLeft: '10px'
                            }}
                            intent="success"
                            appearance="dark"
                            onClick={() => this.props.sendCharacteristicToSocked(this.state.selected_field)}>
                            Show
                        </Button>
                    </Panel>
                </DraggableWindow>
            </React.Suspense>
        );
    }
}