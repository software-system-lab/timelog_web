import React from "react";
import { useState , useEffect} from "react";
import { readableCounter } from "../utils";
import useAnimationFrame from "../useAnimationFrame";
import "./Stopwatch.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import { indigo } from "@material-ui/core/colors";


export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isStartClicked,setStartClicked] = useState(true);
  const [isStopClicked,setStopClicked] = useState(false);
  const [startTimer, stopTimer] = useAnimationFrame(delta =>
    setTime(prevTime => prevTime + delta / 1000)
  );
  const [progress, setProgress] = useState(0);

  const handleStartClick = () => {
    if(isStartClicked){
      setProgress(0);
      setStartClicked(false);
    }
    setStopClicked(true);
  };

  const handleStopClick = () => {
    if(isStopClicked){
      setStopClicked(false);
    }
    setStartClicked(true);
  };

  const stopAndReset = () => {
    stopTimer();
    setTime(0);
  }

  const startTime = () => {
    if(isStartClicked){
      startTimer();
    }
    
  } 
  
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 0.17));
    // }, 6000);

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 0.167));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="stopwatch">
    <center>
      <div className="clock-inner">
        <CircularProgress className="clock-animation" thickness="0.5" variant="static" size='25rem' value={isStartClicked? 0: progress}/>
        <h1 className="timer">{readableCounter(time)}</h1>
        <svg width="400" height="400">
          <circle cx="200" cy="200" r="197" />
          <circle cx="200" cy="200" r="187" />
        </svg>
      </div>
      <div className="buttons">
        <div className =  {isStartClicked ? 'circle-button-primary':'circle-button-red'}>
          <svg 
          width="5em" 
          height="5em" 
          viewBox="0 0 14 14"
          onClick={() => {startTime(); handleStartClick();}}>
            <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path>
          </svg>
        </div>
        <div className = {isStopClicked ? 'circle-button-primary':'circle-button-red'}>
          <svg 
          width="5em" 
          height="5em" 
          viewBox="0 0 24 21"
          onClick={() => {stopAndReset(); handleStopClick();}}>
            <path d="M16 8v8H8V8h8m0-2H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
      </center>
    </div>
  );
};

