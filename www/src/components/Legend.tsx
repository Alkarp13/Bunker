import React from 'react';
import { Strong, Text } from 'evergreen-ui';
import Panel from './Primitives/Panel/Panel';

export interface LegendInfo {
    square          : number;
    await_time      : number;
    medicines       : number;
    armor           : number;
    additional_info : string;
}

export interface LegendInterface {
    story           : string;
    legend          : LegendInfo;
    number_of_seats : number;
    turn            : number;
}

export default function Legend(props: LegendInterface) {
    return (
        <Panel style={{
            width: "400px", 
            position: 'absolute',
            top: '150px',
            left: '0px'
        }}>
            <Panel style={{width: "100%"}}>
                <Panel style={{width: "100%"}}>
                    <Strong color='#FBE6A2' size={400}>Current turn: </Strong>
                    <Text color='#DDEBF7'>{props.turn}</Text>
                </Panel>
                <Panel style={{width: "100%"}}>
                    <Strong color='#FBE6A2' size={400}>Number of seats in bunker: </Strong>
                    <Text color='#DDEBF7'>{props.number_of_seats}</Text>
                </Panel>
            </Panel>
            <Panel style={{width: "100%"}}>
                <Strong color='#FBE6A2' size={400}>Story: </Strong>
                <Text color='#DDEBF7'>{props.story}</Text>
            </Panel>
            <Panel style={{width: "100%"}}>
                <Panel style={{width: "100%"}}>
                    <Strong color='#FBE6A2' size={400}>Bunker square: </Strong>
                    <Text color='#DDEBF7'>{props.legend.square} m<sup>2</sup></Text>
                </Panel>
                <Panel style={{width: "100%"}}>
                    <Strong color='#FBE6A2' size={400}>Awaiting time in bunker: </Strong>
                    <Text color='#DDEBF7'>{props.legend.await_time} days</Text>
                </Panel>
                {(props.legend.medicines) ?
                    <Panel style={{width: "100%"}}>
                        <Strong color='#FBE6A2' size={400}>First aid kits: </Strong>
                        <Text color='#DDEBF7'>{props.legend.medicines}</Text>
                    </Panel> : null}
                {(props.legend.armor) ?
                    <Panel style={{width: "100%"}}>
                        <Strong color='#FBE6A2' size={400}>Pistols: </Strong>
                        <Text color='#DDEBF7'>{props.legend.armor}</Text>
                    </Panel> : null}
                {(props.legend.additional_info) ?
                    <Panel style={{width: "100%"}}>
                        <Strong color='#FBE6A2' size={400}>Additional info: </Strong>
                        <Text color='#DDEBF7'>{props.legend.additional_info}</Text>
                    </Panel> : null}
            </Panel>
        </Panel>
    );
}