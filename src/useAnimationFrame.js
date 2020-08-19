import React from "react";
export default (callback) => {
    const requestRef = React.useRef(0);
    const previousTimeRef = React.useRef(0);
    const _loop = (time = 0) => {
        if (previousTimeRef.current) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(_loop);
    };
    const start = () => {
        requestRef.current = requestAnimationFrame(_loop);
    };
    const stop = () => {
        previousTimeRef.current = 0;
        cancelAnimationFrame(requestRef.current);
    };
    React.useEffect(() => {
        return stop;
    }, []); 
    return [start, stop];
  };