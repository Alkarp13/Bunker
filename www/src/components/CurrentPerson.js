import React from 'react';
import PropTypes from 'prop-types';
import { Pane, SelectField, Button } from 'evergreen-ui';
import DnR from './DnR';
import { WindowsTheme } from './themes';
import PersonCard from './PersonCard';

const paneStyle = {
    width: '300px',
    height: '550px',
    top: '30%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
};

class CurrentPerson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_field: 'male'
        };
    }

    checkDisabled(shown_fields, field) {
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
            <DnR ref='dnr' {...WindowsTheme({ title: 'My person card' })}
                style={paneStyle}>
                <PersonCard person={this.props.person} other={false} />
                <Pane
                    display="flex"
                    width="100%"
                    float="left">
                    <SelectField
                        width={200}
                        className='black-theme'
                        marginTop={10}
                        marginLeft={5}
                        defaultValue='male'
                        label='Choose field to show: '
                        onChange={e => this.setState({ selected_field: e.target.value })}>
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
                        width={70}
                        marginTop={34}
                        marginLeft={10}
                        intent="success"
                        className='black-theme'
                        onClick={() => this.props.sendCharacteristicToSocked(this.state.selected_field)}>
                        Show
                    </Button>
                </Pane>
            </DnR>
        );
    }
}

CurrentPerson.propTypes = {
    person: PropTypes.object.isRequired,
    sendCharacteristicToSocked: PropTypes.func.isRequired
}

export default CurrentPerson;