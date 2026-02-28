import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const numericPart = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[\d]/g, '');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const duration = 2000;
      const step = Math.ceil(numericPart / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= numericPart) {
          setCount(numericPart);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, numericPart]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-black text-[#001E42] italic mb-2 tracking-tighter">
        {count}{suffix}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
