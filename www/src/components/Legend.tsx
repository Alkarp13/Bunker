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
        <div className='legend'>
            <Panel style={{width: "100%"}}>
                <div className='black-background'>
                    <Strong color='#FBE6A2' size={400}>Current turn: </Strong>
                    <Text color='#DDEBF7'>{props.turn}</Text>
                </div>
                <div className='black-background'>
                    <Strong color='#FBE6A2' size={400}>Number of seats in bunker: </Strong>
                    <Text color='#DDEBF7'>{props.number_of_seats}</Text>
                </div>
            </Panel>
            <Panel dark={true} style={{width: "100%"}}>
                <Strong color='#FBE6A2' size={400}>Story: </Strong>
                <Text color='#DDEBF7'>{props.story}</Text>
            </Panel>
            <Panel style={{width: "100%"}}>
                <div className='black-background'>
                    <Strong color='#FBE6A2' size={400}>Bunker square: </Strong>
                    <Text color='#DDEBF7'>{props.legend.square} m<sup>2</sup></Text>
                </div>
                <div className='black-background'>
                    <Strong color='#FBE6A2' size={400}>Awaiting time in bunker: </Strong>
                    <Text color='#DDEBF7'>{props.legend.await_time} days</Text>
                </div>
                {(props.legend.medicines) ?
                    <div className='black-background'>
                        <Strong color='#FBE6A2' size={400}>First aid kits: </Strong>
                        <Text color='#DDEBF7'>{props.legend.medicines}</Text>
                    </div> : null}
                {(props.legend.armor) ?
                    <div className='black-background'>
                        <Strong color='#FBE6A2' size={400}>Pistols: </Strong>
                        <Text color='#DDEBF7'>{props.legend.armor}</Text>
                    </div> : null}
                {(props.legend.additional_info) ?
                    <div className='black-background'>
                        <Strong color='#FBE6A2' size={400}>Additional info: </Strong>
                        <Text color='#DDEBF7'>{props.legend.additional_info}</Text>
                    </div> : null}
            </Panel>
        </div>
    );
}