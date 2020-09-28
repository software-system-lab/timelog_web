import React, { useCallback, useState , useEffect } from "react";
import { readableCounter } from "../utils";
import useAnimationFrame from "../useAnimationFrame";
import "./Stopwatch.css";
import { connect } from 'react-redux';
import { updateTime } from 'actions/StopWatch';
import CloseIcon from '@material-ui/icons/Close';
import {
  Dialog,
  DialogContent,
  DialogActions, 
  Button,
  CircularProgress
} from '@material-ui/core';

function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isStartClicked,setStartClicked] = useState(true);
  const [isStopClicked,setStopClicked] = useState(false);
  
  const [startTimer, stopTimer] = useAnimationFrame(delta => 
    setTime(prevTime => prevTime + delta / 1000)
  );

  const handleStopwatchClose = () => {
    props.handleClose();
    props.openAddLogDialog(time);
  };
  
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
  };

  const start = () => {
    if(isStartClicked){
      startTimer();
    }
  };

  const UpdateTime = useCallback(() => {
    props.updateTime(time.toFixed(1)) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]) 

  useEffect(() => {
    setProgress(props.stopWatchTime%60*5/3)
  }, [props.stopWatchTime])

  useEffect(() => {
    UpdateTime()
  }, [UpdateTime])

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth='md'>
      <DialogActions>
        <Button onClick={props.handleClose} color="secondary">
          <CloseIcon style={{ fontSize: 35 }}/>
        </Button>
      </DialogActions>
      <DialogContent>
        <center>
          <div className="clock-inner">
            <CircularProgress className="clock-animation" thickness={0.5} variant="static" size='25rem' value={progress}/>
            <h1 className="timer">{readableCounter(props.stopWatchTime)}</h1>
            <svg width="400" height="400">
              <circle cx="200" cy="200" r="197" />
              <circle cx="200" cy="200" r="187" />
            </svg>
          </div>
          <div className="buttons">
            <div className =  {isStartClicked ? 'circle-button-primary' : 'circle-button-grey'}>
              <svg 
              width="5em" 
              height="5em" 
              viewBox="0 0 14 14"
              onClick={() => { start(); handleStartClick(); }}>
                <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path>
              </svg>
            </div>
            <div className = {isStopClicked ? 'circle-button-red' : 'circle-button-grey'}>
              <svg 
              width="5em" 
              height="5em" 
              viewBox="0 0 24 21"
              onClick={() => { stopAndReset(); handleStopClick(); handleStopwatchClose(); }}>
                <path d="M16 8v8H8V8h8m0-2H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
              </svg>
            </div>
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    stopWatchTime: state.stopWatchTime
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTime: (time) => {
      dispatch(updateTime(time))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);