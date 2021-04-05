import React from 'react';
import { Spinner } from 'evergreen-ui'
import ReconnectingWebSocket from 'reconnecting-websocket';
import Legend, { LegendInterface, LegendInfo } from './Legend';
import PersonsRow, { PersonsQueryArray } from './PersonsRow';
import { PersonInfo } from './PersonCard';

const CurrentPerson = React.lazy(() => import('./CurrentPerson'));
const OtherPersons = React.lazy(() => import('./OtherPersons'));
const CornerAlert = React.lazy(() => import('./CornerAlert'));
const ActionDialog = React.lazy(() => import('./ActionDialog'));
const KickDialog = React.lazy(() => import('./KickDialog'));

interface Props {}
interface State extends LegendInterface {
    error: any;
    isLoaded: boolean;
    person: PersonInfo;
    other_persons: Array<PersonInfo>;
    lobby_state: string;
    is_round_over: boolean;
    is_anyperson_shown: boolean;
    is_anycard_shown: boolean;
    current_person: number;
    persons_query: PersonsQueryArray;
}

export default class Persons extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            person: {} as PersonInfo,
			other_persons: [],
            lobby_state: '',
            story: '',
            legend: {} as LegendInfo,
            number_of_seats: 1,
            turn: 1,
            is_round_over: false,
            is_anyperson_shown: false,
            is_anycard_shown: false,
            current_person: 1,
            persons_query: []
        };

        this.passMove = this.passMove.bind(this);
        this.showOtherPerson = this.showOtherPerson.bind(this);
        this.hideOtherPerson = this.hideOtherPerson.bind(this);
        this.sendCharacteristicToSocked = this.sendCharacteristicToSocked.bind(this);
        this.kickSelectedPlayer = this.kickSelectedPlayer.bind(this);
        this.someoneSelected = this.someoneSelected.bind(this); 
        this.changeNoteHandler = this.changeNoteHandler.bind(this); 
    }

    selected_field: string = '';
    private connection: ReconnectingWebSocket = {} as ReconnectingWebSocket;

    componentDidMount() {
        if (/person/i.test(window.location.href)) {
            this.connection = new ReconnectingWebSocket(((window.location.protocol == "https:") ? "wss://" : "ws://") + window.location.host + '/persons');
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

    sendCharacteristicToSocked(selected_field: string) {
        if (selected_field !== '') {
            this.selected_field = selected_field;
            if ((selected_field === 'action_1') || (selected_field === 'action_2')) {
                fetch("/get_fields_action", {
                    method: 'POST',
                    body: JSON.stringify({ field: selected_field })
                }).then((response) => response.json())
                  .then(
                      (result) => {
                          if (result.is_anyperson_shown || result.is_anycard_shown) {
                              this.setState({
                                  is_anyperson_shown: result.is_anyperson_shown,
                                  is_anycard_shown: result.is_anycard_shown
                              });
                          } else {
                              this.connection.send(JSON.stringify({ value: selected_field }));
                          }
                      }
                    )
            } else {
                if (selected_field === 'imt') {
                    this.connection.send(JSON.stringify({ value: ['growth', 'weight'] }));
                } else {
                    this.connection.send(JSON.stringify({ value: selected_field }));
                }
            }
        }
    }

    someoneSelected(anyone_person: PersonInfo, anyone_card: string) {
        if (this.state.is_anycard_shown) {
            this.connection.send(JSON.stringify({ value: this.selected_field, someone: anyone_person, card: anyone_card }));
            this.setState({ is_anyperson_shown: false, is_anycard_shown: false });
        } else {
            this.connection.send(JSON.stringify({ value: this.selected_field, someone: anyone_person }));
            this.setState({ is_anyperson_shown: false });
        }
    }

    showOtherPerson(e: React.MouseEvent<HTMLElement>) {
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

    hideOtherPerson(username: string) {
        let other_persons = this.state.other_persons;
        other_persons.forEach(function (other) {
            if (other.username === username) {
                other.is_shown = false;
            }
        });

        this.sendOtherState()
        this.setState({ other_persons: other_persons });
    }

    passMove() {
        this.connection.send(JSON.stringify({ current_person: this.state.current_person }));
    }

    kickSelectedPlayer(person_to_kick: string) {
        this.connection.send(JSON.stringify({ kick_person: person_to_kick, username: this.state.person.username}));
    }

    changeNoteHandler(text: string, username: string) {
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
        const {
            error, isLoaded, person,
            other_persons, number_of_seats,
            legend, story, turn,
            current_person, persons_query,
            is_round_over, is_anyperson_shown,
            is_anycard_shown
        } = this.state;

        if (error) {
            return <div></div>;
        } else if (!isLoaded) {
            return <Spinner size={32} />;
        } else {
            return (
                <div data-width="100%" data-height="100%">
                    <PersonsRow other_persons={other_persons} persons_query={persons_query} current_person={current_person} showOtherPerson={this.showOtherPerson} />
                    <Legend story={story} legend={legend} number_of_seats={number_of_seats} turn={turn} />
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <CornerAlert
                            username={person.username}
                            duration={person.speak_time}
                            isShown={((persons_query[current_person - 1].username === person.username) && !is_round_over) ? true : false}
                            passMove={() => this.passMove()}
                        />
                    </React.Suspense>
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <KickDialog persons_query={persons_query} is_round_over={is_round_over} kickSelectedPlayer={this.kickSelectedPlayer} />
                    </React.Suspense>
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <ActionDialog persons_query={persons_query} is_anyperson_shown={is_anyperson_shown} is_anycard_shown={is_anycard_shown} someoneSelected={this.someoneSelected} />
                    </React.Suspense>
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <CurrentPerson person={person} sendCharacteristicToSocked={this.sendCharacteristicToSocked} />
                    </React.Suspense>
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <OtherPersons other_persons={other_persons} changeNoteHandler={this.changeNoteHandler} hideOtherPerson={this.hideOtherPerson} />
                    </React.Suspense>
                </div>
            );
        }
    }
}