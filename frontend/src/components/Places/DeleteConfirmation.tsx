import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

interface DeleteConfirmationProp{
  onConfirm:()=>void;
  onCancel:()=>void;
  open:boolean;
}



const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel, open }:DeleteConfirmationProp) {
  
  const [stop,setStopFlag] = useState<boolean>(false);


  useEffect(()=>{
    if(open){
      setStopFlag(false);
    }
  },[open])

  useEffect(() => {
    
    if(!open) return;
    console.log(TIMER,stop);

    const timer = setTimeout(() => {
      if(!stop){
        onConfirm();
      }

    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm, stop, open]);

  const handleConfirm = ()=>{
      setStopFlag(true);
      onConfirm();
  }
  const handleCancel = ()=>{
      setStopFlag(true);
      onCancel();
  }

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={handleCancel} className="button-text">
          No
        </button>
        <button onClick={handleConfirm} className="button">
          Yes
        </button>
      </div>
      {/* 👇 key forces ProgressBar to remount each time DeleteConfirmation is mounted,props just re-render not remount */}
      <ProgressBar key={Date.now()} timer={TIMER} stop={stop} />
    </div>
  );
}
