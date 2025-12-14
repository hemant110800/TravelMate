import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Error = {
  message:string;
}

interface ModalProps{
  open:Error|boolean|null;
  children:React.ReactNode;
  onClose:()=>void;
}

function Modal({ open, children, onClose }:ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
 
    if(!dialog.current) return;//null case

    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  // console.log(children);
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLElement 
  );
}

export default Modal;
