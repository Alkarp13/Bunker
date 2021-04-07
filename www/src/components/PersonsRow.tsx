import React from 'react';
import { PersonInfo } from './PersonCard';
import Panel from './Primitives/Panel/Panel';
import Avatar from './Primitives/Avatar/Avatar';

const ReactHintFactory = require('react-hint');
const ReactHint = ReactHintFactory(React);

interface PersonsQuery {
    id      : number;
    username: string;
}

export type PersonsQueryArray = Array<PersonsQuery>;
export type PersonInfoArray = Array<PersonInfo>;

interface Props{
    other_persons   : PersonInfoArray;
    persons_query   : PersonsQueryArray;
    current_person  : number;
    showOtherPerson(e: React.MouseEvent<HTMLElement>): void;
}

export default function PersonsRow(props: Props) {
    return (
        <Panel
            style={{
                height: "100px",
                width: "100%",
                float: "left",
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
                {props.other_persons.map((person: PersonInfo, index: number) => {
                    return <div key={index}>
                        <ReactHint autoPosition events />
                        <Avatar
                            name={person.username}
                            size={80}
                            data-rh={person.username + ", " + person.first_name}
                            marginRight={16}
                            isSolid={(props.persons_query[props.current_person - 1].username === person.username) ? true : false}
                            onClick={(e: React.MouseEvent<HTMLElement>) => props.showOtherPerson(e)}
                        />
                    </div>
                })}
            </Panel>
        </Panel>
    );
}