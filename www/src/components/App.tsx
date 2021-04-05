import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'evergreen-ui';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Lobby, { UsersArray } from './Lobby'

const Persons = React.lazy(() => import('./Persons'));

interface Props {}

interface State {
    isLoaded    : boolean;
    lobby_state : string;
    users       : UsersArray;
}

class App extends React.Component<Props, State> {
    state: Readonly<State> = {
        isLoaded: false,
        lobby_state: '',
        users: []
    }

    public connection: ReconnectingWebSocket = new ReconnectingWebSocket(
        (((window.location.protocol == "https:") ? "ws://" : "ws://") 
        + window.location.host + '/lobby/'), undefined, {debug: true}
    );

    componentDidMount() {
        this.connection.onmessage = (evt) => {
            let result = JSON.parse(evt.data);

            if (result.lobby_state) {
                this.setState({
                    isLoaded: true,
                    lobby_state: result.lobby_state,
                    users: result.users
                });
            }
        };
        this.connection.send(JSON.stringify({ update_lobby: true }));
    }

    render() {
        const { isLoaded, users, lobby_state } = this.state;
        if (!isLoaded) {
            return <Spinner size={32} />;
        } else if (lobby_state === 'S') {
            return (
                <React.Suspense fallback={<Spinner size={32} />} >
                    <Persons />
                </React.Suspense>
            );
        } else if (lobby_state === 'R') {
            return (
                <Lobby lobby_state={lobby_state} users={users} connection={this.connection} />
            );
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);