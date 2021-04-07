import React from 'react';
import { PersonInfo } from './PersonCard';
import Panel from './Primitives/Panel/Panel';
import Avatar from './Primitives/Avatar/Avatar';
import ReactTooltip from 'react-tooltip';
// const ReactHintFactory = require('react-hint');
// const ReactHint = ReactHintFactory(React);

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
            {['aaaa', 'bbbbb', 'ccccc', 'dddd', 'eeeeeeee', 'fffffff'].map((person: string, index: number) => {
                return (
                    <Avatar
                        key={index}
                        dataFor='avatar_hint'
                        dataTip={person + ", " + person}
                        name={person}
                        size={80}
                        marginRight={16}
                        isSolid={false}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {console.log(person)}}
                    />
                )})}
        </Panel>
    );
}

// {props.other_persons.map((person: PersonInfo, index: number) => {
//     return <Panel key={index}
//         style={{
//             float: "left",
//             justifyContent: "left",
//             alignItems: "center",
//             width: "80px"
//     }}>
//         <ReactHint autoPosition events />
//         <Avatar
//             name={person.username}
//             size={80}
//             data-rh={person.username + ", " + person.first_name}
//             marginRight={16}
//             isSolid={(props.persons_query[props.current_person - 1].username === person.username) ? true : false}
//             onClick={(e: React.MouseEvent<HTMLElement>) => {props.showOtherPerson(e)}}
//         />
//     </Panel>
// })}