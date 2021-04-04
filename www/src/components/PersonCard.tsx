import React from 'react';
import { Pane, Strong, Text, TextareaField } from 'evergreen-ui'

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
        <Pane paddingLeft={5} paddingRight={5} paddingBottom={5}>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Male: </Strong>
                <Text color='#DDEBF7'>{props.person.male}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Age: </Strong>
                <Text color='#DDEBF7'>{props.person.age}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>IMT: </Strong>
                <Text color='#DDEBF7'>{ getIMTString(props.person.weight, props.person.growth) }</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Profession: </Strong>
                <Text color='#DDEBF7'>{props.person.profession}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Life: </Strong>
                <Text color='#DDEBF7'>{props.person.life}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Phobia: </Strong>
                <Text color='#DDEBF7'>{props.person.phobia}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Hobbi: </Strong>
                <Text color='#DDEBF7'>{props.person.hobbi}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Character: </Strong>
                <Text color='#DDEBF7'>{props.person.character}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Skill: </Strong>
                <Text color='#DDEBF7'>{props.person.skill}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Inventar: </Strong>
                <Text color='#DDEBF7'>{props.person.inventar}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>First action card: </Strong>
                <Text color='#DDEBF7'>{props.person.action_1}</Text>
            </Pane>
            <Pane>
                <Strong color='#FBE6A2' size={400}>Second action card: </Strong>
                <Text color='#DDEBF7'>{props.person.action_2}</Text>
            </Pane>
            {(props.other) ? <TextareaField label="Notes" value={props.person.note} className='black-theme' onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.changeNoteHandler(e.currentTarget.value, username)}/> : null}
        </Pane>
    );
}