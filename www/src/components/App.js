import React from 'react';
import ReactDOM from 'react-dom';
import { Avatar, Pane, Button } from 'evergreen-ui'

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

    setReadyState() {
        console.log(this);
    }

    componentDidMount() {
        fetch("/lobby_state", { method: 'GET' })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
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

    render() {
        const { error, isLoaded, users, lobby_state } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else if (lobby_state === 'S') {
            //
        } else if (lobby_state === 'R') {
            return (
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
                        {users.map(function (user, index) {
                           return <Avatar
                               key={index}
                               name={user.first_name}
                               size={80}
                               marginRight={16}
                           />
                       })}
                    </Pane>
                    <Pane>
                        <Button appearance="primary" onClick={() => this.setReadyState()}>Ready</Button>
                    </Pane>
                </Pane>
            );
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);