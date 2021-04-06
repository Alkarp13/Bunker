import React from 'react';
import { Avatar } from 'evergreen-ui';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Button from './Primitives/Button/Button';
import Panel from './Primitives/Panel/Panel';

interface Users {
    username     : string;
    first_name   : string;
    last_name    : string;
    ready_state  : boolean;
}

export type UsersArray = Array<Users>;

interface Props {
    lobby_state : string;
    users       : UsersArray;
    connection  : ReconnectingWebSocket;
}

interface State {
    is_ready    : boolean;
}

export default class Lobby extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            is_ready: false
        };
        this.setReadyState = this.setReadyState.bind(this);
    }

    setReadyState() {
        fetch("/set_ready", { method: 'POST' })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.props.connection.send(JSON.stringify({ update_lobby: true }));
                    if (result.lobby_state === 'S') {
                        window.location.href = '/person/';
                    };

                    this.setState({ is_ready: !this.state.is_ready });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {
        return (
            <Panel
                style={{
                    height: "100px",
                    width: "100%",
                    float:"left",
                    padding: "16px",
                    borderRadius: "5px",
                    background: "rgba(0, 0, 0, 0.3)"
                }}>
                <Panel
                    style={{
                        float: "left",
                        justifyContent: "left",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                    {this.props.users.map(function (user, index) {
                        return <Avatar
                            key={index}
                            name={user.first_name}
                            size={80}
                            marginRight={16}
                            color={(user.ready_state) ? 'green' : 'red'}
                        />
                    })}
                </Panel>
                <Panel
                    style={{
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                    <Button appearance="primary" disabled={this.state.is_ready} onClick={() => this.setReadyState()}>Ready</Button>
                </Panel>
            </Panel>
        );
    }
}