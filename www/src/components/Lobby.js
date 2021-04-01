import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Pane, Button } from 'evergreen-ui';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_ready: false
        };
        this.setReadyState = this.setReadyState.bind(this);
    }

    setReadyState(e) {
        fetch("/set_ready", { method: 'POST' })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.props.connection.send(JSON.stringify({ update_lobby: true }));
                    if (result.lobby_state === 'S') {
                        window.location.href = '/person/';
                    };

                    this.setState({ is_ready: !this.is_ready });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {
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
                    {this.props.users.map(function (user, index) {
                        return <Avatar
                            key={index}
                            name={user.first_name}
                            size={80}
                            marginRight={16}
                            color={(user.ready_state) ? 'green' : 'red'}
                        />
                    })}
                </Pane>
                <Pane>
                    <Button appearance="primary" disabled={this.state.is_ready} onClick={() => this.setReadyState()}>Ready</Button>
                </Pane>
            </Pane>
        );
    }
}

Lobby.propTypes = {
    lobby_state: PropTypes.string,
    users: PropTypes.array.isRequired
}

export default Lobby;