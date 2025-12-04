import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "blur";
  delay?: number;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-12`;
        case "fade-left":
          return `${baseClasses} opacity-0 translate-x-12`;
        case "fade-right":
          return `${baseClasses} opacity-0 -translate-x-12`;
        case "scale":
          return `${baseClasses} opacity-0 scale-90`;
        case "blur":
          return `${baseClasses} opacity-0 blur-sm`;
        default:
          return `${baseClasses} opacity-0 translate-y-12`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 blur-0`;
  };

  return (
    <div ref={sectionRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
