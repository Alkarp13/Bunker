import React from 'react';
import { PersonInfo } from './PersonCard';
import Panel from './Primitives/Panel/Panel';
import Avatar from './Primitives/Avatar/Avatar';
import ReactTooltip from 'react-tooltip';

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
            <ReactTooltip id='avatar_hint' getContent={(dataTip) => `${dataTip}`}/>
            {props.other_persons.map((person: PersonInfo, index: number) => {
                return (
                    <Avatar
                        key={index}
                        dataFor='avatar_hint'
                        dataTip={person.username + ", " + person.first_name}
                        name={person.username}
                        size={80}
                        marginRight={16}
                        isSolid={(props.persons_query[props.current_person - 1].username === person.username) ? true : false}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {props.showOtherPerson(e)}}
                    />
                )})}
        </Panel>
    );
}