import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
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

function Timer(props) {
    return (
        <div className="timer-wrapper">
            <CountdownCircleTimer
                isPlaying={props.isPlaying}
                duration={props.duration}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}>
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
}

Timer.propTypes = {
    duration: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired
}

export default Timer;