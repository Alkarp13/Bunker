import React from 'react';
import Panel from './Primitives/Panel/Panel';
import Text from './Primitives/Text/Text';

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
            <Panel style={{width: "100%", backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <Panel style={{width: "100%"}}>
                    <Text color='#FBE6A2' size={400} strong={true}>Current turn: </Text>
                    <Text color='#DDEBF7'>{props.turn}</Text>
                </Panel>
                <Panel style={{width: "100%"}}>
                    <Text color='#FBE6A2' size={400} strong={true}>Number of seats in bunker: </Text>
                    <Text color='#DDEBF7'>{props.number_of_seats}</Text>
                </Panel>
            </Panel>
            <Panel style={{width: "100%", backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <Text color='#FBE6A2' size={400} strong={true}>Story: </Text>
                <Text color='#DDEBF7'>{props.story}</Text>
            </Panel>
            <Panel style={{width: "100%", backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <Panel style={{width: "100%"}}>
                    <Text color='#FBE6A2' size={400} strong={true}>Bunker square: </Text>
                    <Text color='#DDEBF7'>{props.legend.square} m<sup>2</sup></Text>
                </Panel>
                <Panel style={{width: "100%"}}>
                    <Text color='#FBE6A2' size={400} strong={true}>Awaiting time in bunker: </Text>
                    <Text color='#DDEBF7'>{props.legend.await_time} days</Text>
                </Panel>
                {(props.legend.medicines) ?
                    <Panel style={{width: "100%"}}>
                        <Text color='#FBE6A2' size={400} strong={true}>First aid kits: </Text>
                        <Text color='#DDEBF7'>{props.legend.medicines}</Text>
                    </Panel> : null}
                {(props.legend.armor) ?
                    <Panel style={{width: "100%"}}>
                        <Text color='#FBE6A2' size={400} strong={true}>Pistols: </Text>
                        <Text color='#DDEBF7'>{props.legend.armor}</Text>
                    </Panel> : null}
                {(props.legend.additional_info) ?
                    <Panel style={{width: "100%"}}>
                        <Text color='#FBE6A2' size={400} strong={true}>Additional info: </Text>
                        <Text color='#DDEBF7'>{props.legend.additional_info}</Text>
                    </Panel> : null}
            </Panel>
        </Panel>
    );
}