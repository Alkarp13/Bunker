import React from 'react';
import ReactDOM from 'react-dom';
import { Avatar, Pane } from 'evergreen-ui'

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
        fetch("/lobby_state", { method: 'GET' })
            .then(function (responce) {
                responce.json()
            })
            .then(
                function (result) {
                    this.setState({
                        isLoaded: true,
                        lobby_state: result.lobby_state,
                        users: result.items
                    });
                },
                function (error) {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
               <Pane
                    float="left"
                    height={100}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column">
                    {users.map(function (user) {
                        return <Avatar
                                    name={user.first_name}
                                    size={80}
                                    marginRight={16}
                                />
                    })}
               </Pane>
            );
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);