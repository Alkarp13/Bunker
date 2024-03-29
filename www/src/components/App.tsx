import React from 'react';
import {Route, Switch, Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import Spinner from './Primitives/Spinner/Spinner';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Lobby, { UsersArray } from './Lobby/Lobby';

const Persons = React.lazy(() => import('./Persons/Persons'));

interface LobbyState {
    lobby_state: string;
}

interface LobbyUsers extends LobbyState{
    users: UsersArray;
}

interface State extends LobbyUsers {
    isLoaded: boolean;
}

class App extends React.Component<RouteComponentProps, State> {
    state: Readonly<State> = {
        isLoaded: false,
        lobby_state: '',
        users: []
    }

    public connection: ReconnectingWebSocket = {} as ReconnectingWebSocket;

    componentDidMount() {
        this.tryToLobbyConnect();
    }

    tryToLobbyConnect (n: number = 5) {
        if (n > 0) {
            fetch("/lobby_state", { method: 'GET' })
                .then((response) => response.json())
                .then((result: LobbyState) => {
                    this.setupConnection(result);
                },
                (error) => {
                    console.log(error);
                    this.tryToLobbyConnect(n - 1);
                });
        }
    }

    setupConnection (result: LobbyState) {
        if (result.lobby_state === 'S') {
            this.setState({
                isLoaded: true,
                lobby_state: result.lobby_state
            });
        } else {
            this.connection = new ReconnectingWebSocket(
                (((window.location.protocol === "https:") ? "wss://" : "ws://") 
                + window.location.host + '/lobby')
            );
            this.connection.onmessage = (evt) => {
                let result: LobbyUsers = JSON.parse(evt.data);
    
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
    }

    render() {
        const { isLoaded, users, lobby_state } = this.state;

        if (!isLoaded) {
            return <Spinner size={32} />;
        } else if ((lobby_state === 'S') && !(/person/i.test(window.location.href))) {
            //return <Redirect push to={"/person"}/>
            window.location.href = '/person';
        }

        return (
            <Switch>
                <Route path='/lobby'>
                    <Lobby lobby_state={lobby_state} users={users} connection={this.connection} />
                </Route>
                <Route path='/person'>
                    <React.Suspense fallback={<Spinner size={32} />} >
                        <Persons />
                    </React.Suspense>
                </Route>
            </Switch>
        );
    }
}

export default withRouter(App);