import React from 'react';
import { Avatar, Pane, Strong, Text, TextareaField } from 'evergreen-ui'

function PersonCard(props) {
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
            {(props.other) ? <TextareaField label="Notes" className='black-theme'/> : null}
        </Pane>
    );
}

export default PersonCard;