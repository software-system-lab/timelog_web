import React from "react";
import { useState } from "react";
import { readableCounter } from "../utils";
import useAnimationFrame from "../useAnimationFrame";
import "./Stopwatch.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [startTimer, stopTimer] = useAnimationFrame(delta =>
    setTime(prevTime => prevTime + delta / 1000)
  );

  return (
    <div className="stopwatch">
    <center>
    <div className="clock-inner">
      <h1 className="timer">{readableCounter(time)}</h1>
      <svg width="400" height="400">
        <circle cx="200" cy="200" r="200" />
        <circle cx="200" cy="200" r="190" />
      </svg>
    </div>
      <div className="buttons">
        <div className = "circle-button">
          <svg 
          width="5em" 
          height="5em" 
          viewBox="0 0 14 14"
          onClick={() => startTimer()}>
            <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path>
          </svg>
        </div>
        <div className = "circle-button">
          <svg 
          width="5em" 
          height="5em" 
          viewBox="0 0 24 21"
          onClick={() => stopTimer()}>
            <path d="M16 8v8H8V8h8m0-2H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
      </center>
    </div>
  );
};

