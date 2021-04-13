import React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {Redirect} from "react-router-dom";
import Button from '../Primitives/Button/Button';
import Panel from '../Primitives/Panel/Panel';
import Avatar from '../Primitives/Avatar/Avatar';

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
    lobby_state : string;
}

export default class Lobby extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            is_ready: false,
            lobby_state: props.lobby_state
        };
        this.setReadyState = this.setReadyState.bind(this);
    }

    setReadyState() {
        fetch("/set_ready", { method: 'POST' })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.props.connection.send(JSON.stringify({ update_lobby: true }));
                    this.setState({ 
                        is_ready: !this.state.is_ready, 
                        lobby_state: result.lobby_state 
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {
        if (this.state.lobby_state === 'S') {
            return (<Redirect to={'/person'} />);
        } else {
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
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}>
                        <Button appearance="primary" disabled={this.state.is_ready} onClick={() => this.setReadyState()}>Ready</Button>
                    </Panel>
                </Panel>
            );
        }
    }
}