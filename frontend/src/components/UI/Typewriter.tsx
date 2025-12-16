import { useState, useEffect } from 'react';

interface typeWriterProp{
    text:string,
    speed:number
}

const Typewriter = ({ text, speed = 100 }:typeWriterProp) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + text.charAt(currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout); // Cleanup on unmount or re-render
    }
  }, [currentIndex, text, speed]);

  return <div>{displayedText}</div>;
};

export default Typewriter;