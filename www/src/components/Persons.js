import React from 'react';
import { Avatar, Pane, Button, Spinner, SelectField, Combobox, CornerDialog, Dialog } from 'evergreen-ui'
import DnR from './DnR';
import { WindowsTheme } from './themes'
import PersonCard from './PersonCard'
import Legend from './Legend'
import CornerAlert from './CornerAlert'
import ReactHintFactory from 'react-hint'
import ReconnectingWebSocket from 'reconnecting-websocket';

const ReactHint = ReactHintFactory(React)
const paneStyle = {
    width: '300px',
    height: '550px',
    top: '30%',
    left: '50%',
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
            lobby_state: '',
            story: '',
            legend: {},
            number_of_seats: 1,
            turn: 1,
            is_round_over: false,
            is_anyperson_shown: false,
            is_anycard_shown: false,
            person_to_kick: '',
            anyone_person: '',
            anyone_card: 'male',
            current_person: 1,
            persons_query: []
        };
        this.passMove = this.passMove.bind(this);
        this.showOtherPerson = this.showOtherPerson.bind(this);
        this.sendCharacteristicToSocked = this.sendCharacteristicToSocked.bind(this);
        this.kickSelectedPlayer = this.kickSelectedPlayer.bind(this);
        this.someoneSelected = this.someoneSelected.bind(this); 
        this.changeNoteHandler = this.changeNoteHandler.bind(this); 
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.selected_field === nextState.selected_field) ||
            (this.state.person_to_kick === nextState.person_to_kick);
    }

    componentDidMount() {
        if (/person/i.test(window.location.href)) {
            if (window.location.protocol == "https:") {
                var ws_scheme = "wss://";
            } else {
                var ws_scheme = "ws://"
            };
            this.connection = new ReconnectingWebSocket(ws_scheme + window.location.host + '/persons');
            this.connection.onmessage = evt => {
                if (evt.data === 'update_fields') {
                    fetch("/get_all_persons", { method: 'GET' })
                        .then((response) => response.json())
                        .then(
                            (result) => {
                                this.setState({
                                    isLoaded: true,
                                    lobby_state: result.lobby_state,
                                    person: result.current_user,
                                    other_persons: result.other_users,
                                    story: result.story,
                                    legend: result.legend,
                                    number_of_seats: result.number_of_seats,
                                    turn: result.turn,
                                    current_person: result.current_person,
                                    persons_query: result.persons_query,
                                    is_round_over: result.is_round_over
                                });
                            });
                } else {
                    let result = JSON.parse(evt.data);
                    if (typeof result.update_turn !== 'undefined') {
                        this.setState({
                            turn: result.update_turn.turn,
                            current_person: result.update_turn.current_person,
                            is_round_over: result.update_turn.is_round_over
                        });
                    }
                }
            };
            fetch("/get_all_persons", { method: 'GET' })
                .then((response) => response.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            lobby_state: result.lobby_state,
                            person: result.current_user,
                            other_persons: result.other_users,
                            story: result.story,
                            legend: result.legend,
                            number_of_seats: result.number_of_seats,
                            turn: result.turn,
                            current_person: result.current_person,
                            persons_query: result.persons_query
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
        } else {
            window.location.href = '/person/';
        }
    }

    sendCharacteristicToSocked() {
        if (this.state.selected_field !== '') {
            if ((this.state.selected_field === 'action_1') || (this.state.selected_field === 'action_2')) {
                let action = this.state.person[this.state.selected_field];

                fetch("/get_fields_action", {
                    method: 'POST',
                    body: JSON.stringify({ field: this.state.selected_field })
                }).then((response) => response.json())
                  .then(
                      (result) => {
                          console.log(result);
                          if (result.is_anyperson_shown || result.is_anycard_shown) {
                              this.setState({
                                  is_anyperson_shown: result.is_anyperson_shown,
                                  is_anycard_shown: result.is_anycard_shown
                              });
                          } else {
                              this.connection.send(JSON.stringify({ value: this.state.selected_field }));
                          }
                      }
                    )
            } else {
                if (this.state.selected_field === 'imt') {
                    this.connection.send(JSON.stringify({ value: ['growth', 'weight'] }));
                } else {
                    this.connection.send(JSON.stringify({ value: this.state.selected_field }));
                }
            }
        }
    }

    someoneSelected() {
        if (this.state.is_anycard_shown) {
            this.connection.send(JSON.stringify({ value: this.state.selected_field, someone: this.state.anyone_person, card: this.state.anyone_card }));
            this.setState({ is_anyperson_shown: false, is_anycard_shown: false });
        } else {
            this.connection.send(JSON.stringify({ value: this.state.selected_field, someone: this.state.anyone_person }));
            this.setState({ is_anyperson_shown: false });
        }
    }

    showOtherPerson(e) {
        let other_persons = this.state.other_persons;
        const username = e.currentTarget.title;
 
        other_persons.forEach(function (other) {
            if (other.username === username) {
                let is_shown = other.is_shown;
                other.is_shown = !is_shown;
                
            }
        });

        this.sendOtherState()
        this.setState({ other_persons: other_persons });
    }

    hideOtherPerson(username) {
        let other_persons = this.state.other_persons;

        other_persons.forEach(function (other) {
            if (other.username === username) {
                other.is_shown = false;
            }
        });

        this.sendOtherState()
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

    passMove() {
        this.connection.send(JSON.stringify({ current_person: this.state.current_person }));
    }

    kickSelectedPlayer() {
        this.connection.send(JSON.stringify({ kick_person: this.state.person_to_kick, username: this.state.person.username}));
    }

    changeNoteHandler(text, username) {
        let other_persons = this.state.other_persons;

        other_persons.forEach(function (other) {
            if (other.username === username) {
                other.note = text;
            }
        });

        this.sendOtherState()
        this.setState({ other_persons: other_persons });
    }

    sendOtherState() {
        let other_persons = this.state.other_persons;

        other_persons.map(function (other) {
            return {
                username: other.username,
                is_shown: other.is_shown,
                note: other.note
            }
        });

        this.connection.send(JSON.stringify({ change_card_state: other_persons, username: this.state.person.username }));
    }

    render() {
        const { error, isLoaded, person, other_persons, number_of_seats, legend, story, turn, current_person, persons_query, is_round_over, is_anyperson_shown, is_anycard_shown } = this.state;
        if (error) {
            return <div></div>;
        } else if (!isLoaded) {
            return <Spinner size={32} />;
        } else {
            return (
                <div width="100%" height="100%">
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
                                return <div key={index}>
                                        <ReactHint autoPosition events/>
                                        <Avatar
                                            name={person.username}
                                            size={80}
                                            data-rh={person.username + ", " + person.first_name}
                                            marginRight={16}
                                            isSolid={(persons_query[current_person - 1].username === person.username) ? true : false}
                                            onClick={(e) => this.showOtherPerson(e)}
                                        />
                                    </div>
                            }, this)}
                        </Pane>
                    </Pane>
                    <Legend story={story} legend={legend} number_of_seats={number_of_seats} turn={turn} />
                    <CornerAlert
                        username={person.username}
                        duration={person.speak_time}
                        isShown={((persons_query[current_person - 1].username === person.username) && !is_round_over) ? true : false}
                        passMove={() => this.passMove()}
                    />
                    <CornerDialog
                        title="Time to kick someone"
                        isShown={is_round_over}
                        width={320}
                        hasFooter={false}
                        hasClose={false}>
                        <Combobox
                            openOnFocus
                            height={40}
                            items={persons_query.map((item) => { return item.username })}
                            onChange={selected => this.setState({ person_to_kick: selected })}
                            placeholder="Usernames"
                        />
                        <div className='bottom-alert-footer'>
                            <Button intent="success" onClick={() => this.kickSelectedPlayer()}>Kick now</Button>
                        </div>
                    </CornerDialog>
                    <Dialog
                        isShown={is_anyperson_shown}
                        title="Choose anyone"
                        hasFooter={false}
                        hasClose={false}
                        shouldCloseOnOverlayClick={false}>
                        <Combobox
                            openOnFocus
                            height={40}
                            disabled={!is_anycard_shown}
                            items={['male', 'age', 'IMT', 'profession', 'life', 'phobia', 'hobbi', 'character', 'skill', 'inventar']}
                            onChange={selected => this.setState({ anyone_card: selected })}
                            placeholder="Cards"
                        />
                        <Combobox
                            openOnFocus
                            height={40}
                            items={persons_query.map((item) => { return item.username })}
                            onChange={selected => this.setState({ anyone_person: selected })}
                            placeholder="Usernames"
                        />
                        <div className='bottom-alert-footer'>
                            <Button intent="success" onClick={() => this.someoneSelected()}>Send</Button>
                        </div>
                    </Dialog>
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
                                <option disabled={this.checkDisabled(person.shown_fields, 'growth')} value='imt'>IMT</option>
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
                                <PersonCard person={other} other={true} changeNoteHandler={this.changeNoteHandler} />
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