import { useEffect, useState } from "react";

interface TypewriterTitleProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursorColor?: string;
}

const TypewriterTitle = ({ 
  text, 
  className = "", 
  speed = 80, 
  delay = 300,
  cursorColor = "text-primary"
}: TypewriterTitleProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;
    
    // Initial delay before starting
    timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          // Keep cursor blinking for a bit then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      };
      
      typeNextChar();
    }, delay);
    
    // Cursor blink effect
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span 
        className={`inline-block w-[3px] h-[1em] ml-1 align-middle transition-opacity duration-100 ${cursorColor} ${
          showCursor && !isComplete ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'currentColor' }}
      />
    </span>
  );
};

export default TypewriterTitle;
