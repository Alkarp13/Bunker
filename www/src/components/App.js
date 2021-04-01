import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'evergreen-ui';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Lobby from './Lobby'
import Persons from './Persons'
//import BunkerAPI from './API';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            lobby_state: '',
            users: []
        };
    }

    componentDidMount() {
        var ws_scheme, ws_location;
        if (window.location.protocol == "https:") {
            ws_scheme = "wss://";
        } else {
            ws_scheme = "ws://"
        };

        console.log(window.location.pathname);
        if (window.location.pathname == '/lobby/') {
            ws_location = '/lobby'
        } else {
            ws_location = '/persons'
        }

        this.connection = new ReconnectingWebSocket(ws_scheme + window.location.host + ws_location);
        this.connection.onmessage = evt => {
            let result = JSON.parse(evt.data);

            console.log(result);

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
                <Persons />
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