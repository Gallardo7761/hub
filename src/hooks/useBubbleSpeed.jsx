import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function useBubbleSpeed() {
  const rawSpeed = useMotionValue(20);
  const smoothSpeed = useSpring(rawSpeed, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    return smoothSpeed.on("change", (value) => {
      const clamped = Math.max(2, Math.min(40, value));
      document.documentElement.style.setProperty('--bubble-speed', `${clamped}s`);
    });
  }, [smoothSpeed]);

  return {
    setSpeed: (s) => rawSpeed.set(s)
  };
}
