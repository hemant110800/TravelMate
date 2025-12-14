import { useState, useEffect } from 'react';

interface ProgressProps{
   timer:number;
   stop:boolean;
}

export default function ProgressBar({ timer, stop }:ProgressProps) {

const [remainingTime, setRemainingTime] = useState<number>(timer);

  // console.log(timer,remainingTime);

  useEffect(() => {

    setRemainingTime(timer);
    
    if(stop) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) =>{
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 10
      } 
    );
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [timer, stop]);

  return <progress value={remainingTime} max={timer} />;
}
