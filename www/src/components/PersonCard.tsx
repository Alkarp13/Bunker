import React from 'react';
import Panel from './Primitives/Panel/Panel';
import Text from './Primitives/Text/Text';
import TextArea from './Primitives/TextArea/TextArea';

type Male = 'M' | 'F';

export interface UserInfoInterface {
    username     : string;
    first_name   : string;
    last_name    : string;
    speak_time   : number;
}

export interface PersonInfoInterface {
    male?        : Male;
    age?         : number;
    growth?      : number;
    weight?      : number;
    profession?  : string;
    life?        : string;
    phobia?      : string;
    hobbi?       : string;
    character?   : string;
    skill?       : string;
    inventar?    : string;
    action_1?    : string;
    action_2?    : string;
}

export interface PersonInfo extends UserInfoInterface, PersonInfoInterface {
    note?         : string;
    is_shown?     : boolean;
    shown_fields? : Array<string>;
}

interface Props {
    person: PersonInfo;
    other: boolean;
    changeNoteHandler(text: string, username: string): void;
}

export default function PersonCard(props: Props) {
    function getIMTString(weight: number = 0, growth: number = 0): string {
        let IMT: number = weight / ((growth / 100) * (growth / 100));
        let comment: string = '';

        if (IMT > 35) {
            comment = ' (you are very obese so you cannot have children)';
        } else if ((IMT > 25) && (IMT <= 35)) {
            comment = ' (you are obese in the first degree)';
        } else if ((IMT > 18) && (IMT <= 25)) {
            comment = ' (you have a normal physique)';
        } else if ((IMT > 15) && (IMT <= 18)) {
            comment = ' (you have underweight)';
        } else if (IMT <= 15) {
            comment = ' (you are very underweight so you cannot have children)';
        }

        return 'weight - ' + weight + 'kg, growth - ' + growth + 'cm, imt - ' + IMT.toFixed(1) + comment;
    }

    const username: string = props.person.username;

    return (
        <Panel 
            style={{
                paddingLeft: '5px',
                paddingRight: '5px', 
                paddingBottom: '5px'
            }}>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Male: </Text>
                <Text color='#DDEBF7'>{props.person.male}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Age: </Text>
                <Text color='#DDEBF7'>{props.person.age}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>IMT: </Text>
                <Text color='#DDEBF7'>{ getIMTString(props.person.weight, props.person.growth) }</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Profession: </Text>
                <Text color='#DDEBF7'>{props.person.profession}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Life: </Text>
                <Text color='#DDEBF7'>{props.person.life}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Phobia: </Text>
                <Text color='#DDEBF7'>{props.person.phobia}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Hobbi: </Text>
                <Text color='#DDEBF7'>{props.person.hobbi}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Character: </Text>
                <Text color='#DDEBF7'>{props.person.character}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Skill: </Text>
                <Text color='#DDEBF7'>{props.person.skill}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Inventar: </Text>
                <Text color='#DDEBF7'>{props.person.inventar}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>First action card: </Text>
                <Text color='#DDEBF7'>{props.person.action_1}</Text>
            </Panel>
            <Panel>
                <Text color='#FBE6A2' size={400} strong={true}>Second action card: </Text>
                <Text color='#DDEBF7'>{props.person.action_2}</Text>
            </Panel>
            {(props.other) ? <TextArea label="Notes" value={props.person.note} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.changeNoteHandler(e.currentTarget.value, username)}/> : null}
        </Panel>
    );
}