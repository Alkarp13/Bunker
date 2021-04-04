import React, { useRef, useState } from 'react';
import { CountdownCircleTimer, Colors } from "react-countdown-circle-timer";

interface TimerProps {
    duration : number;
    isPlaying: boolean;
}

interface TimeProps {
    remainingTime: number;
}

const timerColors: Colors = [["#004777", 0.33], ["#F7B801", 0.33], ["#A30000", 1]];

const renderTime = (props: TimeProps) => {
    const remainingTime = props.remainingTime;
    const currentTime: React.MutableRefObject<number> = useRef(remainingTime);
    const prevTime: React.MutableRefObject<number | null> = useRef(null);
    const isNewTimeFirstTick: React.MutableRefObject<boolean> = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender(val => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div
                    key={prevTime.current}
                    className={`time ${!isTimeUp ? "down" : ""}`}
                >
                    {prevTime.current}
                </div>
            )}
        </div>
    );
};

export default function Timer(props: TimerProps) {
    return (
        <div className="timer-wrapper">
            <CountdownCircleTimer
                isPlaying={props.isPlaying}
                duration={props.duration}
                colors={timerColors}>
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
}