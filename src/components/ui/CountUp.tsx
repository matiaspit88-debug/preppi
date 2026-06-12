"use client";

import { useState, useEffect, useRef } from "react";

export function useCountUp(target: number, duration = 850) {
  const [val, setVal] = useState(target);
  const raf = useRef<number>(0);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVal(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(e * target);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setVal(target);
    };
    setVal(0);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return val;
}

interface CountUpProps {
  value: number;
  decimals?: number;
  className?: string;
}

export default function CountUp({ value, decimals = 0, className }: CountUpProps) {
  const v = useCountUp(value);
  return <span className={className}>{v.toFixed(decimals)}</span>;
}
