import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby'
import Persons from './Persons'
import { Spinner } from 'evergreen-ui';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lobby_state: '',
            users: []
        };
    }

    componentDidMount() {
        setInterval(_ => {
            if (this.state.lobby_state !== 'S') {
                fetch("/lobby_state", { method: 'GET' })
                    .then((response) => response.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                lobby_state: result.lobby_state,
                                users: result.users
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
            }
        }, 2000)
    }

    render() {
        const { error, isLoaded, users, lobby_state } = this.state;
        if (error) {
            return <div></div>;
        } else if (!isLoaded) {
            return <Spinner size={32} />;
        } else if (lobby_state === 'S') {
            return (
                <Persons />
            );
        } else if (lobby_state === 'R') {
            return (
                <Lobby lobby_state={lobby_state} users={users} />
            );
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);