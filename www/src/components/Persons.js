import React from 'react';
import { Avatar, Pane, Button, Spinner, SelectField } from 'evergreen-ui'
import DnR from './DnR';
import { WindowsTheme } from './themes'
import PersonCard from './PersonCard'

const paneStyle = {
    width: '300px',
    height: '500px',
    top: '25%',
    left: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
};

class Persons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            person: {},
			other_persons: [],
            selected_field: 'male',
            lobby_state: ''
        };
        this.showOtherPerson = this.showOtherPerson.bind(this);
        this.sendCharacteristicToSocked = this.sendCharacteristicToSocked.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selected_field === nextState.selected_field;
    }

    componentDidMount() {
        this.connection = new WebSocket('ws://' + window.location.host + '/persons');
        this.connection.onmessage = evt => {
            console.log(evt.data);
            if (evt.data === 'update_fields') {
                fetch("/get_all_persons", { method: 'GET' })
                    .then((response) => response.json())
                    .then(
                        (result) => {
                            console.log(result);
                            this.setState({
                                isLoaded: true,
                                lobby_state: result.lobby_state,
                                person: result.current_user,
                                other_persons: result.other_users
                            });
                        });
            }
        };
        fetch("/get_all_persons", { method: 'GET' })
            .then((response) => response.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        lobby_state: result.lobby_state,
                        person: result.current_user,
                        other_persons: result.other_users
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    sendCharacteristicToSocked() {
        if (this.state.selected_field !== '')
            this.connection.send(JSON.stringify({ value: this.state.selected_field }));
    }

    showOtherPerson(e) {
        let other_persons = this.state.other_persons;
        const username = e.currentTarget.title;
 
        other_persons.forEach(function (other) {
            if (other.username === username) {
                other.is_shown = !other.is_shown;
            }
        });

        this.setState({ other_persons: other_persons });
    }

    hideOtherPerson(username) {
        let other_persons = this.state.other_persons;

        other_persons.forEach(function (other) {
            if (other.username === username) {
                other.is_shown = false;
            }
        });

        this.setState({ other_persons: other_persons });
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
        const { error, isLoaded, person, other_persons, lobby_state } = this.state;
        if (error) {
            return <div></div>;
        } else if (!isLoaded) {
            return <Spinner size={32} />;
        } else {
            return (
                <div>
                    <Pane
                        display="flex"
                        height={100}
                        width="100%"
                        float="left"
                        padding={16}
                        borderRadius={5}
                        background="rgba(0, 0, 0, 0.3)">
                        <Pane
                            float="left"
                            display="flex"
                            flex={1}
                            justifyContent="left"
                            alignItems="center"
                            flexDirection="row">
                            {other_persons.map(function (person, index) {
                                return <Avatar
                                    key={index}
                                    name={person.username}
                                    size={80}
                                    marginRight={16}
                                    onClick={(e) => this.showOtherPerson(e)}
                                />
                            }, this)}
                        </Pane>
                    </Pane>
                    <DnR ref='dnr' {...WindowsTheme({title: 'My person card'})}
                        style={paneStyle}>
                        <PersonCard person={person} other={false}/>
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
                                <option disabled={this.checkDisabled(person.shown_fields, 'male')} value='male'>Male</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'age')} value='age'>Age</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'profession')} value='profession'>Profession</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'life')} value='life'>Life</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'phobia')} value='phobia'>Phobia</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'hobbi')} value='hobbi'>Hobbi</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'character')} value='character'>Character</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'skill')} value='skill'>Skill</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'inventar')} value='inventar'>Inventar</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'action_1')} value='action_1'>First action card</option>
                                <option disabled={this.checkDisabled(person.shown_fields, 'action_2')} value='action_2'>Second action card</option>
                            </SelectField>
                            <Button
                                width={70}
                                marginTop={34}
                                marginLeft={10}
                                intent="success"
                                className='black-theme'
                                onClick={() => this.sendCharacteristicToSocked()}>
                                Show
                            </Button>
                        </Pane>
                    </DnR>
                    {other_persons.map(function (other, index) {
                        if (other.is_shown) {
                            return <DnR
                                key={index}
                                ref='dnr' {...WindowsTheme({
                                    title: other.first_name + ' ' + other.last_name,
                                    onClose: () => this.hideOtherPerson(other.username),
                                    onMinimize: () => this.hideOtherPerson(other.username)
                                })}
                                title={other.first_name + ' ' + other.last_name}
                                style={paneStyle}>
                                <PersonCard person={other} other={true} />
                            </DnR>
                        } else {
                            return null;
                        }
                    }, this)}
                </div>
            );
        }
    }
}

export default Persons;